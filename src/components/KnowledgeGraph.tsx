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
  strong:   0.8,
  moderate: 0.6,
  mixed:    0.5,
  limited:  0.4,
};
const EDGE_DIM = 0x1E2026;

function nodeRadius(ec: number): number {
  return 1.2 + Math.min(ec * 0.4, 2.8);
}

// ── Physics relaxation ────────────────────────────────────────────────────────

function relax(pos: THREE.Vector3[], links: GraphLink[], ids: string[]): void {
  const idx = new Map(ids.map((id, i) => [id, i]));

  for (let iter = 0; iter < 60; iter++) {
    // Repulsion: push all pairs apart if too close
    for (let i = 0; i < pos.length; i++) {
      for (let j = i + 1; j < pos.length; j++) {
        const dx = pos[j].x - pos[i].x;
        const dy = pos[j].y - pos[i].y;
        const dz = pos[j].z - pos[i].z;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
        if (d < 18) {
          const f = (18 - d) / d * 0.5;
          pos[i].x -= dx * f; pos[i].y -= dy * f; pos[i].z -= dz * f;
          pos[j].x += dx * f; pos[j].y += dy * f; pos[j].z += dz * f;
        }
      }
    }

    // Attraction: pull linked nodes together if too far apart
    for (const { source, target } of links) {
      const si = idx.get(source);
      const ti = idx.get(target);
      if (si == null || ti == null) continue;
      const dx = pos[ti].x - pos[si].x;
      const dy = pos[ti].y - pos[si].y;
      const dz = pos[ti].z - pos[si].z;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
      if (d > 35) {
        const f = (d - 35) / d * 0.3;
        pos[si].x += dx * f; pos[si].y += dy * f; pos[si].z += dz * f;
        pos[ti].x -= dx * f; pos[ti].y -= dy * f; pos[ti].z -= dz * f;
      }
    }

    // Centering: gentle pull toward origin
    for (const p of pos) { p.x *= 0.98; p.y *= 0.98; p.z *= 0.98; }
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function KnowledgeGraph() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const frameRef     = useRef<number>(0);
  const searchRef    = useRef('');

  const [graphData,   setGraphData]   = useState<GraphData | null>(null);
  const [hoverLabel,  setHoverLabel]  = useState<{ name: string; x: number; y: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hintVisible, setHintVisible] = useState(true);
  const [statsText,   setStatsText]   = useState('— compounds · — relationships · live evidence graph');

  // Keep search ref in sync for the animation loop to read without stale closure
  searchRef.current = searchQuery;

  // ── Fetch graph data ────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    fetch('/api/graph')
      .then(r => r.json())
      .then((data: GraphData) => {
        if (cancelled) return;
        setGraphData(data);
        setStatsText(
          `${data.nodes.length} compounds · ${data.links.length} relationships · live evidence graph`
        );
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  // ── Three.js scene ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!graphData || !canvasRef.current || !containerRef.current) return;
    if (graphData.nodes.length === 0) return;

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

    // Scene
    const scene = new THREE.Scene();
    scene.fog   = new THREE.Fog(0x08090A, 50, 400);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.set(0, 0, reduced ? 220 : 400);
    camera.lookAt(0, 0, 0);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const ptLight = new THREE.PointLight(0xffffff, 1.2, 500);
    scene.add(ptLight);

    // Group — all graph content rotates inside this
    const group = new THREE.Group();
    scene.add(group);

    // ── Positions: random on sphere surface, then physics-relaxed ────────────
    const positions = graphData.nodes.map(() => {
      const r     = 80 + Math.random() * 60; // 80–140
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

    // Distance from origin — used to stagger entrance animation (closer = earlier)
    const dists  = positions.map(p => p.length());
    const maxDist = Math.max(...dists, 1);

    // ── Node meshes ───────────────────────────────────────────────────────────
    const nodeMeshes: THREE.Mesh[]                   = [];
    const nodeMats:   THREE.MeshStandardMaterial[]   = [];

    for (let i = 0; i < graphData.nodes.length; i++) {
      const nd  = graphData.nodes[i];
      const col = RATING_HEX[nd.rating] ?? 0x8888ff;
      const geo = new THREE.SphereGeometry(nodeRadius(nd.evidenceCount), 16, 16);
      const mat = new THREE.MeshStandardMaterial({
        color:             col,
        emissive:          new THREE.Color(col),
        emissiveIntensity: RATING_INTENSITY[nd.rating] ?? 0.3,
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

    // ── Edge lines ────────────────────────────────────────────────────────────
    const edgeLines:     THREE.Line[]                 = [];
    const edgeMats:      THREE.LineBasicMaterial[]    = [];
    const nodeEdgeMap:   Map<number, number[]>        = new Map();
    const idToIdx        = new Map(nodeIds.map((id, i) => [id, i]));

    for (let e = 0; e < graphData.links.length; e++) {
      const { source, target } = graphData.links[e];
      const si = idToIdx.get(source);
      const ti = idToIdx.get(target);
      if (si == null || ti == null) continue;

      const geo = new THREE.BufferGeometry().setFromPoints([
        positions[si].clone(),
        positions[ti].clone(),
      ]);
      const mat = new THREE.LineBasicMaterial({
        color:       EDGE_DIM,
        transparent: true,
        opacity:     reduced ? 0.25 : 0,
      });
      const line = new THREE.Line(geo, mat);
      group.add(line);

      const ei = edgeLines.length;
      edgeLines.push(line);
      edgeMats.push(mat);

      if (!nodeEdgeMap.has(si)) nodeEdgeMap.set(si, []);
      if (!nodeEdgeMap.has(ti)) nodeEdgeMap.set(ti, []);
      nodeEdgeMap.get(si)!.push(ei);
      nodeEdgeMap.get(ti)!.push(ei);
    }

    // ── Mutable interaction state (closure vars, not React state) ─────────────
    let hoveredIndex  = -1;
    let isDragging    = false;
    let dragStartX    = 0, dragStartY = 0;
    let rotStartX     = 0, rotStartY  = 0;
    let autoRotating  = true;
    let resumeTimer:  ReturnType<typeof setTimeout> | null = null;
    let cameraTargetZ = 220;
    let entranceDone  = reduced;

    function dimAllEdges() {
      for (const m of edgeMats) { m.color.setHex(EDGE_DIM); m.opacity = 0.25; }
    }

    function highlightEdgesFor(ni: number) {
      const col = RATING_HEX[graphData!.nodes[ni]?.rating] ?? 0x888888;
      for (const ei of nodeEdgeMap.get(ni) ?? []) {
        edgeMats[ei].color.setHex(col);
        edgeMats[ei].opacity = 0.6;
      }
    }

    // ── Event handlers ────────────────────────────────────────────────────────
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
      isDragging  = true;
      dragStartX  = e.clientX; dragStartY = e.clientY;
      rotStartX   = group.rotation.x;
      rotStartY   = group.rotation.y;
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

          // Project 3-D position → screen coords relative to canvas
          const wp = hits[0].object.position.clone().applyMatrix4(group.matrixWorld);
          wp.project(camera);
          const rect = canvas.getBoundingClientRect();
          setHoverLabel({
            name: graphData!.nodes[ni].name,
            x:   (wp.x *  0.5 + 0.5) * rect.width,
            y:   (wp.y * -0.5 + 0.5) * rect.height,
          });
        }
      } else {
        hoveredIndex        = -1;
        canvas.style.cursor = '';
        setHoverLabel(null);
      }

      if (entranceDone && prev !== hoveredIndex) {
        dimAllEdges();
        if (hoveredIndex !== -1) highlightEdgesFor(hoveredIndex);
      }
    }

    function onMouseUp() {
      if (!isDragging) return;
      isDragging   = false;
      resumeTimer  = setTimeout(() => { autoRotating = true; }, 3000);
    }

    function onClick(e: MouseEvent) {
      // Ignore if the mouse moved significantly (drag vs click)
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
      cameraTargetZ = Math.max(60, Math.min(350, cameraTargetZ + e.deltaY * 0.3));
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

    // Hint fades after 4 s
    const hintTimer = setTimeout(() => setHintVisible(false), 4000);

    // ── Animation loop ────────────────────────────────────────────────────────
    const t0 = performance.now();

    function animate() {
      frameRef.current = requestAnimationFrame(animate);
      const elapsed = performance.now() - t0;

      // Entrance animation
      if (!entranceDone) {
        const cp = Math.min(elapsed / 2000, 1);
        camera.position.z = 400 - 180 * (1 - Math.pow(1 - cp, 3)); // cubic ease-out

        if (elapsed >= 1500) {
          const ep = Math.min((elapsed - 1500) / 800, 1);
          for (const m of edgeMats) m.opacity = ep * 0.25;
        }

        if (elapsed >= 2300) {
          entranceDone      = true;
          camera.position.z = 220;
          dimAllEdges();
        }
      } else {
        // Smooth zoom after entrance
        camera.position.z += (cameraTargetZ - camera.position.z) * 0.1;
      }

      // Node scale — entrance stagger then interactive override
      const sq = searchRef.current;
      for (let i = 0; i < nodeMeshes.length; i++) {
        let target: number;

        if (!entranceDone && !reduced) {
          // Stagger: closer nodes appear first (delay 500ms–1500ms)
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

        // Lerp toward target scale
        const curr = nodeMeshes[i].scale.x;
        nodeMeshes[i].scale.setScalar(curr + (target - curr) * 0.15);
      }

      // Auto-rotation
      if (!reduced && autoRotating && !isDragging) {
        group.rotation.y += 0.0008;
      }

      // Point light tracks camera for per-frame highlight pop
      ptLight.position.copy(camera.position);

      renderer.render(scene, camera);
    }

    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup',   onMouseUp);
      canvas.removeEventListener('click',     onClick);
      canvas.removeEventListener('wheel',     onWheel);
      window.removeEventListener('resize',    onResize);
      clearTimeout(hintTimer);
      if (resumeTimer) clearTimeout(resumeTimer);

      for (const m of nodeMeshes) {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      }
      for (const l of edgeLines) {
        l.geometry.dispose();
        (l.material as THREE.Material).dispose();
      }
      renderer.dispose();
    };
  }, [graphData, router]);

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div ref={containerRef} className="kg-root">
      <canvas ref={canvasRef} className="kg-canvas" />

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

      {/* Hover label — positioned via projected 3-D coords */}
      {hoverLabel && (
        <div
          className="kg-label"
          style={{
            left:      hoverLabel.x,
            top:       hoverLabel.y - 40,
            transform: 'translateX(-50%)',
          }}
        >
          {hoverLabel.name}
        </div>
      )}

      {/* Bottom-centre: interaction hint */}
      <div className={`kg-hint${hintVisible ? '' : ' kg-hint--hidden'}`}>
        Drag to explore · scroll to zoom · click any node
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
