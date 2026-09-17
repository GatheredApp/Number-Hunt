# Number Hunt

Number Hunt is a polished, offline-first mobile deduction game. Scan clusters of numbered tiles, interpret a five-band heat map, and explicitly guess the hidden number in as few attempts as possible.

## Play

Choose Quick Play (25, 49, 81, or 100 tiles), build a Custom game (9–144), or take the shared 100-tile Daily Hunt. Every round starts with three scans. A scan reveals an organic nearby cluster; heat reflects **numeric** distance from the target. Every incorrect guess grants one more scan but never gives a higher/lower hint. Revealing the target is not enough—you must submit it.

## Development

```bash
npm install
npm run dev
npm test
npm run typecheck
npm run lint
npm run build
```

## Architecture

- `src/game/` contains framework-independent engine, heat bands, deterministic daily PRNG, scoring, and domain types.
- `src/storage/` owns versioned, corruption-tolerant LocalStorage persistence and statistics.
- `src/App.tsx` contains responsive application screens and interaction orchestration.
- `src/styles.css` supplies the mobile-first visual system, safe-area behavior, and reduced-motion mode.

Scores use `round(1000 × log2(board size) / guesses)`. Ratings depend only on guesses: Perfect (1), Elite (2), Excellent (3), Strong (4–5), Solid (6–8), and Found It (9+).

## Daily Hunt and persistence

Daily Hunt hashes the local calendar date into a seeded PRNG, so the target and scan behavior are reproducible without a server. The first completion is recorded; later attempts are marked practice. Active games, settings, daily history, streaks, and aggregate records live locally and survive refreshes.

## PWA and deployment

`vite-plugin-pwa` generates the manifest and Workbox service worker. The app shell and game assets are cached for offline play, update availability is surfaced in-app, and install prompts are captured where supported. Vite's production base is `/Number-Hunt/` for GitHub Pages. `.github/workflows/deploy.yml` is the single Pages workflow: it tests, type-checks, lints, builds, and deploys only the generated `dist` directory using the official Pages actions. Do not also enable GitHub's starter "Deploy static content" workflow, because that publishes the unbuilt TypeScript source instead of the Vite output.
