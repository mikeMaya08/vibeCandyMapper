import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

/**
 * BDD / Gherkin pattern — Step definitions for the welcome popup feature.
 *
 * Requires: npm install -D playwright-bdd
 * See tests/patrones/bdd-gherkin/README.md for full setup instructions.
 */
const { Given, When, Then } = createBdd();

// ── Given ────────────────────────────────────────────────────────────────────

Given('the user clears the seen-modal flag from localStorage', async ({ page }) => {
  await page.evaluate(() => localStorage.removeItem('seenContactModal'));
});

Given('the user navigates to the homepage', async ({ page }) => {
  await page.goto('/');
});

// ── When ─────────────────────────────────────────────────────────────────────

When('the user clicks the close button', async ({ page }) => {
  await page.locator('#closeBtn').click();
});

When('the user clicks the {string} button', async ({ page }, buttonName: string) => {
  await page.getByRole('button', { name: buttonName }).click();
});

When('the user clicks outside the modal card', async ({ page }) => {
  await page.locator('#modalOverlay').click({ position: { x: 5, y: 5 } });
});

When('the user presses the Escape key', async ({ page }) => {
  await page.keyboard.press('Escape');
});

When('the user reloads the page', async ({ page }) => {
  await page.reload();
});

// ── Then ─────────────────────────────────────────────────────────────────────

Then('the welcome popup should be visible', async ({ page }) => {
  await expect(page.locator('#modalOverlay')).toHaveClass(/open/);
  await expect(page.locator('#modalOverlay .modal-card')).toBeVisible();
});

Then('the welcome popup should be closed', async ({ page }) => {
  await expect(page.locator('#modalOverlay')).not.toHaveClass(/open/);
});

Then('the popup should display the title {string}', async ({ page }, title: string) => {
  await expect(page.locator('#modalTitle')).toHaveText(title);
});

Then('the {string} button should be visible', async ({ page }, buttonName: string) => {
  await expect(page.getByRole('button', { name: buttonName })).toBeVisible();
});

Then('the close button should be visible', async ({ page }) => {
  await expect(page.locator('#closeBtn')).toBeVisible();
});
