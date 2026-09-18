import type { Attachment } from 'svelte/attachments';

/**
 * Reveals an element once as it scrolls into view.
 *
 * Marketing surfaces only — functional UI a visitor uses daily should not
 * wait on an observer. The hidden starting state lives in `layer components`
 * of layout.css and is gated on `html.js`, which an inline script in app.html
 * sets before first paint. That means:
 *
 *   - JS on  → the pending state applies before paint, so nothing flashes.
 *   - JS off → the pending state never applies, so nothing is ever hidden.
 *
 * `prefers-reduced-motion` is handled in CSS: the fade stays (it aids
 * comprehension), the positional move is dropped.
 *
 * @param delay Stagger offset in ms. Keep groups within 30–80ms per step.
 */
export function reveal(delay = 0): Attachment<HTMLElement> {
	return (node) => {
		if (delay) node.style.setProperty('--reveal-delay', `${delay}ms`);

		// No observer (very old browser, or a test env) — show it and move on.
		if (typeof IntersectionObserver === 'undefined') {
			node.dataset.reveal = 'shown';
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					node.dataset.reveal = 'shown';
					observer.disconnect(); // fire once; re-animating on every scroll-by fights the reader
				}
			},
			{ rootMargin: '0px 0px -10% 0px', threshold: 0.01 }
		);

		observer.observe(node);
		return () => observer.disconnect();
	};
}
