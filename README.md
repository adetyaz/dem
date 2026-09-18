# DEM Surveying, P.C.

Marketing site for a licensed Pennsylvania land surveying firm in Brookville.
SvelteKit 2 · Svelte 5 (runes) · Tailwind 4 · TypeScript · `adapter-vercel`.

Built to design direction **2A**: near-black ground (`#1b1917`), warm taupe
accent (`#b39b7d`), bone page (`#f6f3ee`), Poppins for voice and IBM Plex Mono
for plat marginalia — the vertical edge labels carrying tract names and
coordinates are the recurring signature.

## Running it

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # production build
npm run preview    # preview that build
npm run check      # svelte-check
npm run lint       # prettier --check && eslint
npm run format     # prettier --write
```

## Environment

Nothing is required to run the site. Two things are optional:

| Variable            | Purpose                                                                  |
| ------------------- | ------------------------------------------------------------------------ |
| `GROQ_API_KEY`      | LLM-backed survey assistant. Without it, a deterministic lookup answers. |
| `QUOTE_WEBHOOK_URL` | Where quote requests get POSTed. Without it, submissions just log.       |

`QUOTE_WEBHOOK_URL` takes any endpoint that accepts a JSON POST — a Slack or
Discord incoming webhook, a Zapier/Make/n8n trigger, or your own. No vendor
SDK, no account to set up first. Transport lives in one place —
[`src/lib/server/quote.ts`](src/lib/server/quote.ts) — swap it for SMTP or a
CRM and nothing else changes.

## Layout

```
src/lib/
  site.ts              firm constants + nav (single source of truth)
  quote.ts             types shared by the form and the server action
  styles.ts            shared layout strings
  content/             page data: services, capabilities, projects, team, stats
  content/assistant.ts the survey assistant's knowledge + answer lookup
  attachments/reveal.ts scroll-reveal (Svelte 5 attachment)
  components/          UI
  server/quote.ts      validation + delivery (server-only)
src/routes/
  layout.css           design tokens (@theme), base layer, motion primitives
  +page.svelte         home — direction 2A
  about/               about + #capabilities
  contact/             contact + #quote (hosts the shared form action)
  api/assistant/       assistant endpoint
```

Both quote forms post to the one action at `/contact?/request`; the home form
targets it across routes, so there is a single validator and a single transport.

## Photographs

Every image is in `src/lib/assets/images/` and imported through
`src/lib/content/photos.ts`, so Vite hashes and fingerprints them.

`PhotoGallery` renders a grid of `PhotoTile`s and owns one `Lightbox`:

- Each tile shows a short title always, and reveals the firm's full caption on
  hover **and** on keyboard focus. The caption is a real `<figcaption>`, so
  assistive tech gets it whether or not it is painted.
- Clicking a tile opens a native `<dialog>` via `showModal()` — that is where
  the focus trap, Escape handling, inert background and top-layer painting come
  from, rather than being re-implemented. The backdrop is blurred with
  `backdrop-filter`, and arrow keys move between photos.
- **Source resolution is the ceiling: the largest original is 450×300.** The
  lightbox caps the frame instead of upscaling into softness, and the home hero
  deliberately uses the 450px-wide originals because it renders largest. Higher
  resolution scans would visibly improve the hero and the collage.

## The survey assistant

`answerQuestion` in [`src/lib/content/assistant.ts`](src/lib/content/assistant.ts)
is a deterministic lookup over the firm's own facts, not a language model. That
is deliberate: the page copy promises that boundary disputes, anything legal,
and firm price commitments go to a licensed surveyor, and a lookup keeps that
promise by construction. The cost answer explains what drives a fee and never
quotes a number.

To put a model behind it, replace the `answerQuestion` call in
[`src/routes/api/assistant/+server.ts`](src/routes/api/assistant/+server.ts).
The request and response shapes are what the UI depends on. Give it the same
refusal boundaries first.

## Conventions worth knowing

- **Design tokens** live in the `@theme` block in `src/routes/layout.css`.
  `--ease-out` intentionally overrides Tailwind's default with a stronger curve,
  so every `ease-out` in the project uses it.
- **`hover:` is redefined** as `(hover: hover) and (pointer: fine)` via
  `@custom-variant`, so no hover state can stick after a tap on touch.
- **Internal links use `resolve()`** from `$app/paths`; `tel:`/`mailto:`/external
  hrefs carry a scoped eslint disable with a reason.
- **`PhotoPlate` is always `position: relative`.** To place one absolutely, wrap
  it — an `absolute` passed through `class` loses to the component's own rule.
- **Scroll reveals** start hidden only under `html.js`, which an inline script in
  `app.html` sets before first paint. Nothing is ever hidden without JavaScript,
  and nothing flashes with it.
- **Photographs and captions** live in `src/lib/content/photos.ts`. Captions are
  transcribed verbatim from the firm's own about page; two plain typos in the
  source are corrected and nothing else is reworded.
- **`PhotoPlate` falls back to a hatch pattern** when given no `photo`, so a
  section still composes before its picture is supplied. The home page's
  "Recent Project Work" cards are still placeholders on purpose — see below.
