# BDD / Gherkin Pattern

This branch demonstrates the **BDD with Gherkin** pattern using [`playwright-bdd`](https://vitalets.github.io/playwright-bdd).

## Setup

```bash
npm install -D playwright-bdd
```

Then update `playwright.config.ts` to use `defineBddConfig`:

```ts
import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'tests/bdd/**/*.feature',
  steps: 'tests/bdd/steps/**/*.ts',
});

export default defineConfig({
  testDir,
  // ... rest of config
});
```

## Structure

```
tests/bdd/
  welcome-popup.feature    ← Gherkin scenarios (human-readable)
  steps/
    welcome-popup.steps.ts ← Step definitions (code)
```

## Running

```bash
npx bddgen && npx playwright test
```

## When to use this pattern

- When non-technical stakeholders (PMs, QA analysts) write or review test scenarios
- When you need living documentation aligned to business requirements
- Adds setup overhead vs. plain Playwright — evaluate the trade-off for your team
