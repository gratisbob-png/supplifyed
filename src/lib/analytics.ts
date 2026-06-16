// Behaviour capture — anonymised, no PII anywhere in the system
// GDPR compliant by design: aggregate and anonymised only

import type { BehaviourEvent, BehaviourEventType, ProductTier, SourceBadge } from '@/types';

// Session ID generated client-side per visit — no cross-session tracking, no user ID
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  let id = sessionStorage.getItem('_sid');
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem('_sid', id);
  }
  return id;
}

function buildEvent(
  type: BehaviourEventType,
  payload: Partial<Omit<BehaviourEvent, 'type' | 'timestamp' | 'session_id'>>
): BehaviourEvent {
  return {
    type,
    ...payload,
    timestamp: Date.now(),
    session_id: getSessionId(),
  };
}

// Send to GA4 if configured; also batch-collects for internal anonymised data
function send(event: BehaviourEvent): void {
  if (typeof window === 'undefined') return;

  // GA4
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;
  type GtagFn = (cmd: string, name: string, params: Record<string, unknown>) => void;
  if (gaId && (window as unknown as Record<string, unknown>).gtag) {
    const gtag = (window as unknown as Record<string, GtagFn>).gtag;
    gtag('event', event.type, {
      ingredient_id: event.ingredient_id,
      product_id: event.product_id,
      tier: event.tier,
      section: event.section,
      link_type: event.link_type,
    });
  }

  // Internal batch (queued for server-side aggregation)
  queueEvent(event);
}

const _queue: BehaviourEvent[] = [];

function queueEvent(event: BehaviourEvent): void {
  _queue.push(event);
  // Flush every 10 events or on page unload
  if (_queue.length >= 10) flush();
}

async function flush(): Promise<void> {
  if (_queue.length === 0) return;
  const batch = _queue.splice(0);
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: batch }),
      keepalive: true,
    });
  } catch {
    // Non-blocking — analytics failure never impacts user experience
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush();
  });
}

// ─── Public API ────────────────────────────────────────────────────────────────

export const analytics = {
  pageView(ingredientId?: string, productId?: string) {
    send(buildEvent('page_view', { ingredient_id: ingredientId, product_id: productId }));
  },
  tierView(ingredientId: string, tier: ProductTier) {
    send(buildEvent('tier_view', { ingredient_id: ingredientId, tier }));
  },
  linkClick(
    productId: string,
    linkType: 'official' | 'amazon' | 'generic',
    tier: ProductTier
  ) {
    send(buildEvent('link_click', { product_id: productId, link_type: linkType, tier }));
  },
  compareAdd(productId: string) {
    send(buildEvent('compare_add', { product_id: productId }));
  },
  builderSelect(ingredientId: string) {
    send(buildEvent('builder_select', { ingredient_id: ingredientId }));
  },
  sectionExpand(productId: string, section: SourceBadge) {
    send(buildEvent('section_expand', { product_id: productId, section }));
  },
};
