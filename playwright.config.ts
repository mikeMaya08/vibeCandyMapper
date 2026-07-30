import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const bddTestDir = defineBddConfig({
  features: 'tests/patrones/bdd-gherkin/**/*.feature',
  steps: 'tests/patrones/bdd-gherkin/steps/**/*.ts',
});

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: 'https://vibe-candy-mapper.vercel.app/',
    headless: true,
  },
  reporter: [
    ['@muuktest/amikoo-reporter'],
    ['list'],
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      // BDD / Gherkin pattern — requires `npx bddgen` before running
      name: 'bdd-gherkin',
      testDir: bddTestDir,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
