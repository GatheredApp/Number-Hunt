# Number Hunt

Number Hunt is an offline-first mobile deduction game grounded in Bayesian inference. Scan numbered tiles, combine uncertain evidence, inspect the probability map, and explicitly guess the hidden number in as few attempts as possible.

## Play

Quick Play offers 25, 49, 81, or 100 tiles; Custom games support 9–144; Daily Hunt is a shared 100-tile challenge. Every round starts with three scans. A scan reveals an organic cluster of roughly 4–7 new tiles. Each reports a **noisy observation** from Cold through Blazing: hotter clues are more likely near the target, but no clue proves its location. Incorrect guesses grant one scan and become hard evidence that assigns that candidate zero probability. Revealing the target tile does not identify it or win—the target must be guessed.

The Probability view visualizes the posterior over every candidate, highlights the most likely candidate (never an “answer”), and summarizes confidence and entropy. Ratings and points remain based on guess count; bits learned are a secondary measure of scan efficiency.

## Bayesian model

`src/game/heat.ts` is the single tuning point for the five distance-band likelihood rows. Relative distance is `abs(observed tile - candidate target) / max(1, board size - 1)`. Every row contains a positive probability for every heat result, so surprising clues never permanently eliminate a candidate.

`src/game/bayes.ts` recomputes belief from stored evidence rather than persisting derived probabilities. For each candidate it adds log likelihoods to the log prior, then normalizes with a max-shifted log-sum-exp calculation. Incorrect guesses are excluded before normalization. Shannon entropy is `-Σ p log2(p)`; each scan records entropy before and after, with their difference reported as information gain in bits.

Truth (`secret`), immutable noisy observations (`{tile, heat, scanId}`), and derived posterior belief remain separate. Rendering never calculates clue heat from the secret.

## Deterministic Daily Hunt

The date deterministically selects the Daily target. Cluster counts, cluster ordering, and each heat sample use independently derived event seeds containing the daily seed, scan index, center/tile, and event type. Therefore identical dates and action sequences reproduce the same evidence without relying on mutable RNG state or rendering order. Quick and Custom games use ordinary local randomness.

## Persistence

Schema v2 stores observations and scan history. Loading checks the v2 key and can explicitly migrate the existing v1 key: settings and aggregate/daily statistics are retained, while an incompatible deterministic-clue v1 active game alone is discarded. Derived posteriors are recomputed after reload. Malformed storage falls back safely to defaults.

## Development

```bash
npm install
npm run dev
npm test
npm run typecheck
npm run lint
npm run build
```

React owns screen orchestration; framework-independent modules under `src/game/` own likelihoods, Bayesian math, deterministic randomness, game transitions, and scoring. LocalStorage logic lives in `src/storage/`. Scores remain `round(1000 × log2(board size) / guesses)` and ratings remain guess-based.

## PWA and deployment

`vite-plugin-pwa` generates the manifest and Workbox service worker. All gameplay and inference work offline. The production base remains `/Number-Hunt/`; `.github/workflows/deploy.yml` tests and deploys `dist` to GitHub Pages.
