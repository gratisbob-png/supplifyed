'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';

// ── Types ─────────────────────────────────────────────────────────────────────

interface GraphNode {
  id: string;
  name: string;
  slug: string;
  rating: string;
  category: string;
  evidenceCount: number;
}
interface GraphLink { source: string; target: string; }
interface GraphData { nodes: GraphNode[]; links: GraphLink[]; }

// ── Constants ─────────────────────────────────────────────────────────────────

const RATING_HEX: Record<string, number> = {
  strong:   0x00C48C,
  moderate: 0xF5A623,
  mixed:    0xFF6B35,
  limited:  0xE53935,
};
const RATING_CSS: Record<string, string> = {
  strong:   '#00C48C',
  moderate: '#F5A623',
  mixed:    '#FF6B35',
  limited:  '#E53935',
};
const RATING_INTENSITY: Record<string, number> = {
  strong:   1.5,
  moderate: 1.1,
  mixed:    0.9,
  limited:  0.8,
};
const EDGE_DIM = 0x2A3040;

// 6c — Category ring colours
const CATEGORY_RING_HEX: Record<string, number> = {
  'Sleep':        0x6366F1,
  'Performance':  0x10B981,
  'Recovery':     0x3B82F6,
  'Gut Health':   0x84CC16,
  'Longevity':    0x8B5CF6,
  'Vitamins':     0xF97316,
  'Minerals':     0x06B6D4,
  'Herbal':       0xEC4899,
  'Omega Oils':   0xF59E0B,
  'Protein':      0x10B981,
  'Amino Acids':  0x10B981,
  'Nootropics':   0xF59E0B,
};

function nodeRadius(ec: number): number {
  return 3.0 + Math.min(ec * 0.4, 4.0);
}

// ── Physics relaxation — 6a: 120 iterations, threshold 35 ───────────────────

function relax(pos: THREE.Vector3[], links: GraphLink[], ids: string[]): void {
  const idx = new Map(ids.map((id, i) => [id, i]));

  for (let iter = 0; iter < 120; iter++) {
    // Repulsion — threshold 35
    for (let i = 0; i < pos.length; i++) {
      for (let j = i + 1; j < pos.length; j++) {
        const dx = pos[j].x - pos[i].x;
        const dy = pos[j].y - pos[i].y;
        const dz = pos[j].z - pos[i].z;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
        if (d < 35) {
          const f = (35 - d) / d * 0.5;
          pos[i].x -= dx * f; pos[i].y -= dy * f; pos[i].z -= dz * f;
          pos[j].x += dx * f; pos[j].y += dy * f; pos[j].z += dz * f;
        }
      }
    }

    // Attraction
    for (const { source, target } of links) {
      const si = idx.get(source);
      const ti = idx.get(target);
      if (si == null || ti == null) continue;
      const dx = pos[ti].x - pos[si].x;
      const dy = pos[ti].y - pos[si].y;
      const dz = pos[ti].z - pos[si].z;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
      if (d > 60) {
        const f = (d - 60) / d * 0.3;
        pos[si].x += dx * f; pos[si].y += dy * f; pos[si].z += dz * f;
        pos[ti].x -= dx * f; pos[ti].y -= dy * f; pos[ti].z -= dz * f;
      }
    }

    // Centering
    for (const p of pos) { p.x *= 0.98; p.y *= 0.98; p.z *= 0.98; }
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function KnowledgeGraph() {
  const router = useRouter();
  const containerRef       = useRef<HTMLDivElement>(null);
  const canvasRef          = useRef<HTMLCanvasElement>(null);
  const labelsContainerRef = useRef<HTMLDivElement>(null);
  const frameRef           = useRef<number>(0);
  const searchRef          = useRef('');

  const [graphData,   setGraphData]   = useState<GraphData | null>(null);
  const [loadError,   setLoadError]   = useState(false);
  const [fetchError,  setFetchError]  = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statsText,   setStatsText]   = useState('— compounds · — relationships · live evidence graph');

  searchRef.current = searchQuery;

  // ── Fetch graph data ────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    fetch('/api/graph')
      .then(r => r.json())
      .then((data: GraphData) => {
        if (cancelled) return;
        if (!data?.nodes) { setFetchError(true); return; }
        setGraphData(data);
        setStatsText(
          `${data.nodes.length} compounds · ${data.links.length} relationships · live evidence graph`
        );
      })
      .catch(() => { if (!cancelled) setFetchError(true); });
    return () => { cancelled = true; };
  }, []);

  // ── Three.js scene ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!graphData || !canvasRef.current || !containerRef.current) return;
    if (graphData.nodes.length === 0) return;

    try {
      const canvas    = canvasRef.current;
      const container = containerRef.current;
      const reduced   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      let W = container.clientWidth;
      let H = container.clientHeight;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setSize(W, H, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x08090A, 1);
      canvas.style.background = '#08090A';

      // Scene
      const scene = new THREE.Scene();
      scene.fog   = new THREE.Fog(0x08090A, 50, 450);

      // Camera — fov 65, z=280 (closer = graph fills screen)
      const camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 1000);
      camera.position.set(0, 0, reduced ? 280 : 380);
      camera.lookAt(0, 0, 0);

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.3));
      const ptLight = new THREE.PointLight(0xffffff, 1.2, 500);
      scene.add(ptLight);
      const frontLight = new THREE.PointLight(0xffffff, 1.2, 500);
      frontLight.position.set(0, 0, 100);
      scene.add(frontLight);

      // Group — all graph content rotates inside this
      const group = new THREE.Group();
      scene.add(group);

      // ── Positions: random on sphere surface, then physics-relaxed ──────────
      // tighter cluster (100-150) so graph fills the viewport at z=280
      const positions = graphData.nodes.map(() => {
        const r     = 100 + Math.random() * 50;
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        return new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        );
      });

      const nodeIds = graphData.nodes.map(n => n.id);
      relax(positions, graphData.links, nodeIds);

      const dists   = positions.map(p => p.length());
      const maxDist = Math.max(...dists, 1);

      // ── Node meshes ─────────────────────────────────────────────────────────
      const nodeMeshes: THREE.Mesh[]                 = [];
      const nodeMats:   THREE.MeshStandardMaterial[] = [];

      for (let i = 0; i < graphData.nodes.length; i++) {
        const nd  = graphData.nodes[i];
        const col = RATING_HEX[nd.rating] ?? 0x8888ff;
        const geo = new THREE.SphereGeometry(nodeRadius(nd.evidenceCount), 16, 16);
        const mat = new THREE.MeshStandardMaterial({
          color:             col,
          emissive:          new THREE.Color(col),
          emissiveIntensity: RATING_INTENSITY[nd.rating] ?? 0.8,
          metalness:         0.3,
          roughness:         0.4,
          transparent:       true,
          opacity:           1.0,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(positions[i]);
        if (!reduced) mesh.scale.setScalar(0);
        group.add(mesh);
        nodeMeshes.push(mesh);
        nodeMats.push(mat);
      }

      // ── 6c: Category colour ring meshes ────────────────────────────────────
      const ringMeshes: THREE.Mesh[] = [];

      for (let i = 0; i < graphData.nodes.length; i++) {
        const nd        = graphData.nodes[i];
        const ringColor = CATEGORY_RING_HEX[nd.category] ?? 0x556678;
        const ringRad   = nodeRadius(nd.evidenceCount) + 1.8;
        const ringGeo   = new THREE.SphereGeometry(ringRad, 8, 8);
        const ringMat   = new THREE.MeshBasicMaterial({
          color:       ringColor,
          transparent: true,
          opacity:     0.12,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.copy(positions[i]);
        if (!reduced) ringMesh.scale.setScalar(0);
        group.add(ringMesh);
        ringMeshes.push(ringMesh);
      }

      // ── Permanent node labels (DOM, updated per-frame) ──────────────────────
      // 6b: 10px, #6B7280, text-shadow
      const labelEls: HTMLDivElement[] = [];
      if (labelsContainerRef.current) {
        const cont = labelsContainerRef.current;
        cont.innerHTML = '';
        for (let i = 0; i < graphData.nodes.length; i++) {
          const el = document.createElement('div');
          el.style.cssText =
            'position:absolute;pointer-events:none;' +
            'font-family:"JetBrains Mono",monospace;font-size:10px;' +
            'color:#6B7280;transform:translateX(-50%);white-space:nowrap;' +
            'text-shadow:0 1px 4px rgba(0,0,0,0.8);transition:color 0.12s,font-size 0.08s;';
          el.textContent = graphData.nodes[i].name;
          cont.appendChild(el);
          labelEls.push(el);
        }
      }

      // ── Edge tubes ──────────────────────────────────────────────────────────
      const edgeMeshes:  THREE.Mesh[]              = [];
      const edgeMats:    THREE.MeshBasicMaterial[] = [];
      const nodeEdgeMap: Map<number, number[]>     = new Map();
      const idToIdx      = new Map(nodeIds.map((id, i) => [id, i]));

      for (let e = 0; e < graphData.links.length; e++) {
        const { source, target } = graphData.links[e];
        const si = idToIdx.get(source);
        const ti = idToIdx.get(target);
        if (si == null || ti == null) continue;

        const edgeGeom = new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3([positions[si].clone(), positions[ti].clone()]),
          1, 0.12, 4, false
        );
        const edgeMat = new THREE.MeshBasicMaterial({
          color:       EDGE_DIM,
          transparent: true,
          opacity:     reduced ? 0.4 : 0,
        });
        const edgeMesh = new THREE.Mesh(edgeGeom, edgeMat);
        group.add(edgeMesh);

        const ei = edgeMeshes.length;
        edgeMeshes.push(edgeMesh);
        edgeMats.push(edgeMat);

        if (!nodeEdgeMap.has(si)) nodeEdgeMap.set(si, []);
        if (!nodeEdgeMap.has(ti)) nodeEdgeMap.set(ti, []);
        nodeEdgeMap.get(si)!.push(ei);
        nodeEdgeMap.get(ti)!.push(ei);
      }

      // ── Mutable interaction state ───────────────────────────────────────────
      let hoveredIndex  = -1;
      let isDragging    = false;
      let dragStartX    = 0, dragStartY = 0;
      let rotStartX     = 0, rotStartY  = 0;
      let autoRotating  = true;
      let resumeTimer:  ReturnType<typeof setTimeout> | null = null;
      let cameraTargetZ = 280;
      let entranceDone  = reduced;

      function dimAllEdges() {
        for (const m of edgeMats) { m.color.setHex(EDGE_DIM); m.opacity = 0.4; }
      }

      function highlightEdgesFor(ni: number) {
        const col = RATING_HEX[graphData!.nodes[ni]?.rating] ?? 0x888888;
        for (const ei of nodeEdgeMap.get(ni) ?? []) {
          edgeMats[ei].color.setHex(col);
          edgeMats[ei].opacity = 0.8;
        }
      }

      // ── Event handlers ──────────────────────────────────────────────────────
      const raycaster = new THREE.Raycaster();
      const mouse     = new THREE.Vector2();

      function toNDC(e: MouseEvent) {
        const r = canvas.getBoundingClientRect();
        mouse.set(
          ((e.clientX - r.left) / r.width)  *  2 - 1,
          ((e.clientY - r.top)  / r.height) * -2 + 1,
        );
      }

      function onMouseDown(e: MouseEvent) {
        isDragging   = true;
        dragStartX   = e.clientX; dragStartY = e.clientY;
        rotStartX    = group.rotation.x;
        rotStartY    = group.rotation.y;
        autoRotating = false;
        if (resumeTimer) clearTimeout(resumeTimer);
      }

      function onMouseMove(e: MouseEvent) {
        if (isDragging) {
          const dx = (e.clientX - dragStartX) * 0.005;
          const dy = (e.clientY - dragStartY) * 0.005;
          group.rotation.y = rotStartY + dx;
          group.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotStartX + dy));
          return;
        }

        toNDC(e);
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(nodeMeshes);

        const prev = hoveredIndex;

        if (hits.length > 0 && entranceDone) {
          const ni = nodeMeshes.indexOf(hits[0].object as THREE.Mesh);
          if (ni !== -1) {
            hoveredIndex        = ni;
            canvas.style.cursor = 'pointer';
          }
        } else {
          hoveredIndex        = -1;
          canvas.style.cursor = '';
        }

        if (entranceDone && prev !== hoveredIndex) {
          dimAllEdges();
          if (hoveredIndex !== -1) highlightEdgesFor(hoveredIndex);
        }
      }

      function onMouseUp() {
        if (!isDragging) return;
        isDragging  = false;
        resumeTimer = setTimeout(() => { autoRotating = true; }, 3000);
      }

      function onClick(e: MouseEvent) {
        if (Math.abs(e.clientX - dragStartX) > 4 || Math.abs(e.clientY - dragStartY) > 4) return;
        toNDC(e);
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(nodeMeshes);
        if (hits.length > 0) {
          const ni = nodeMeshes.indexOf(hits[0].object as THREE.Mesh);
          if (ni !== -1) router.push(`/ingredient/${graphData!.nodes[ni].slug}`);
        }
      }

      function onWheel(e: WheelEvent) {
        e.preventDefault();
        cameraTargetZ = Math.max(60, Math.min(380, cameraTargetZ + e.deltaY * 0.3));
      }

      function onResize() {
        W = container.clientWidth;
        H = container.clientHeight;
        renderer.setSize(W, H, false);
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
      }

      canvas.addEventListener('mousedown', onMouseDown);
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mouseup',   onMouseUp);
      canvas.addEventListener('click',     onClick);
      canvas.addEventListener('wheel',     onWheel, { passive: false });
      window.addEventListener('resize',    onResize);

      // ── Animation loop ────────────────────────────────────────────────────
      const t0 = performance.now();

      function animate() {
        frameRef.current = requestAnimationFrame(animate);
        const elapsed = performance.now() - t0;

        // Entrance animation
        if (!entranceDone) {
          const cp = Math.min(elapsed / 2000, 1);
          camera.position.z = 380 - 100 * (1 - Math.pow(1 - cp, 3));

          if (elapsed >= 1500) {
            const ep = Math.min((elapsed - 1500) / 800, 1);
            for (const m of edgeMats) m.opacity = ep * 0.4;
          }

          if (elapsed >= 2300) {
            entranceDone      = true;
            camera.position.z = 280;
            dimAllEdges();
          }
        } else {
          camera.position.z += (cameraTargetZ - camera.position.z) * 0.1;
        }

        // Node scale — entrance stagger then interactive override
        const sq = searchRef.current;
        for (let i = 0; i < nodeMeshes.length; i++) {
          let target: number;

          if (!entranceDone && !reduced) {
            const delay = 500 + (dists[i] / maxDist) * 1000;
            const ne    = elapsed - delay;
            target = ne > 0 ? 1 - Math.pow(1 - Math.min(ne / 400, 1), 2) : 0;
            nodeMats[i].opacity = 1;
          } else {
            if (sq) {
              const match    = graphData!.nodes[i].name.toLowerCase().includes(sq.toLowerCase());
              target         = match ? 1.6 : 1.0;
              nodeMats[i].opacity = match ? 1.0 : 0.15;
            } else {
              target         = i === hoveredIndex ? 1.4 : 1.0;
              nodeMats[i].opacity = 1.0;
            }
          }

          const curr = nodeMeshes[i].scale.x;
          nodeMeshes[i].scale.setScalar(curr + (target - curr) * 0.15);

          // Sync ring scale with node scale
          if (i < ringMeshes.length) {
            ringMeshes[i].scale.setScalar(nodeMeshes[i].scale.x);
          }
        }

        // Permanent label positions — 6b: updated per-frame with improved styling
        for (let i = 0; i < labelEls.length; i++) {
          const wp = nodeMeshes[i].position.clone().applyMatrix4(group.matrixWorld);
          wp.project(camera);
          const x = (wp.x *  0.5 + 0.5) * W;
          const y = (wp.y * -0.5 + 0.5) * H;
          labelEls[i].style.left = `${x}px`;
          labelEls[i].style.top  = `${y + 14}px`;
          if (i === hoveredIndex) {
            labelEls[i].style.color      = '#F2F2F0';
            labelEls[i].style.fontSize   = '12px';
            labelEls[i].style.fontWeight = '500';
          } else {
            labelEls[i].style.color      = '#6B7280';
            labelEls[i].style.fontSize   = '10px';
            labelEls[i].style.fontWeight = '400';
          }
        }

        // Auto-rotation
        if (!reduced && autoRotating && !isDragging) {
          group.rotation.y += 0.0005;
        }

        ptLight.position.copy(camera.position);
        renderer.render(scene, camera);
      }

      animate();

      // ── Cleanup ─────────────────────────────────────────────────────────────
      return () => {
        cancelAnimationFrame(frameRef.current);
        canvas.removeEventListener('mousedown', onMouseDown);
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseup',   onMouseUp);
        canvas.removeEventListener('click',     onClick);
        canvas.removeEventListener('wheel',     onWheel);
        window.removeEventListener('resize',    onResize);
        if (resumeTimer) clearTimeout(resumeTimer);

        if (labelsContainerRef.current) labelsContainerRef.current.innerHTML = '';

        for (const m of nodeMeshes) {
          m.geometry.dispose();
          (m.material as THREE.Material).dispose();
        }
        for (const m of ringMeshes) {
          m.geometry.dispose();
          (m.material as THREE.Material).dispose();
        }
        for (const m of edgeMeshes) {
          m.geometry.dispose();
          (m.material as THREE.Material).dispose();
        }
        renderer.dispose();
      };
    } catch (err) {
      console.error('KnowledgeGraph init error:', err);
      setLoadError(true);
    }
  }, [graphData, router]);

  // ── Error fallbacks ───────────────────────────────────────────────────────────
  if (fetchError) {
    return (
      <div style={{
        height: '100%', background: '#08090A',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#E53935', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
        letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>
        API ERROR — /api/graph returned no data
      </div>
    );
  }

  if (loadError) {
    return (
      <div style={{
        height: '100%', background: '#08090A',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#E53935', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
        letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>
        GRAPH ERROR — CHECK CONSOLE
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div ref={containerRef} className="kg-root">
      <canvas ref={canvasRef} className="kg-canvas" />
      <div ref={labelsContainerRef} className="kg-labels" />

      {/* Top-left: logo + live stats */}
      <div className="kg-topleft">
        <div className="kg-brand">
          <span className="kg-brand-dot" />
          <span className="kg-brand-text">Supplifyed</span>
        </div>
        <p className="kg-stats">{statsText}</p>
      </div>

      {/* Top-right: evidence rating legend */}
      <div className="kg-legend">
        {(['strong', 'moderate', 'mixed', 'limited'] as const).map(r => (
          <div key={r} className="kg-legend-row">
            <span className="kg-legend-dot" style={{ background: RATING_CSS[r] }} />
            <span className="kg-legend-label">{r}</span>
          </div>
        ))}
      </div>

      {/* 6d: Permanent instruction strip — bottom-left */}
      <div className="kg-instructions">
        ← drag &nbsp;·&nbsp; ↕ scroll &nbsp;·&nbsp; click node →
      </div>

      {/* Bottom-right: compound filter */}
      <div className="kg-search-wrap">
        <input
          className="kg-search"
          type="text"
          placeholder="Filter compounds…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
