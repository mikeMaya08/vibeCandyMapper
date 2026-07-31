import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const bddTestDir = defineBddConfig({
  features: 'tests/patrones/bdd-gherkin/**/*.feature',
  steps: 'tests/patrones/bdd-gherkin/steps/**/*.ts',
  outputDir: '.features-gen',
});

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: process.env.BASE_URL ?? 'https://vibe-candy-mapper.vercel.app/',
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
      // BDD / Gherkin pattern — generated specs live in .features-gen
      name: 'bdd-gherkin',
      testDir: bddTestDir,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
