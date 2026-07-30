# BDD / Gherkin Pattern

Este directorio demuestra el patrón **BDD con Gherkin** usando [`playwright-bdd`](https://vitalets.github.io/playwright-bdd).

## Setup

```bash
npm install -D playwright-bdd
```

Actualizar `playwright.config.ts`:

```ts
import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'tests/patrones/bdd-gherkin/**/*.feature',
  steps: 'tests/patrones/bdd-gherkin/steps/**/*.ts',
});

export default defineConfig({
  testDir,
  // ... resto del config
});
```

## Estructura

```
tests/patrones/bdd-gherkin/
  welcome-popup.feature    ← escenarios en Gherkin
  steps/
    welcome-popup.steps.ts ← implementación de cada step
```

## Correr

```bash
npx bddgen && npx playwright test
```
