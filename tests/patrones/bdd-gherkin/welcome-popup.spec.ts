// Generated from: tests/patrones/bdd-gherkin/welcome-popup.feature
// Run `npx bddgen` to regenerate if the .feature file changes.
import { createBdd } from 'playwright-bdd';
import { test as base } from '@playwright/test';

const { Given, When, Then } = createBdd();

// ── Step implementations ──────────────────────────────────────────────────────

Given('the user clears the seen-modal flag from localStorage', async ({ page }) => {
  await page.evaluate(() => localStorage.removeItem('seenContactModal'));
});

Given('the user navigates to the homepage', async ({ page }) => {
  await page.goto('/');
});

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

Then('the welcome popup should be visible', async ({ page }) => {
  const { expect } = await import('@playwright/test');
  await expect(page.locator('#modalOverlay')).toHaveClass(/open/);
});

Then('the welcome popup should be closed', async ({ page }) => {
  const { expect } = await import('@playwright/test');
  await expect(page.locator('#modalOverlay')).not.toHaveClass(/open/);
});

Then('the popup should display the title {string}', async ({ page }, title: string) => {
  const { expect } = await import('@playwright/test');
  await expect(page.locator('#modalTitle')).toHaveText(title);
});

Then('the {string} button should be visible', async ({ page }, buttonName: string) => {
  const { expect } = await import('@playwright/test');
  await expect(page.getByRole('button', { name: buttonName })).toBeVisible();
});

Then('the close button should be visible', async ({ page }) => {
  const { expect } = await import('@playwright/test');
  await expect(page.locator('#closeBtn')).toBeVisible();
});

// ── Scenarios ─────────────────────────────────────────────────────────────────

const test = base.extend({});

test.describe('Welcome popup modal — BDD / Gherkin pattern', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate first so localStorage is accessible, then clear the flag and reload
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('seenContactModal'));
    await page.reload();
    const { expect } = await import('@playwright/test');
    await expect(page.locator('#modalOverlay')).toHaveClass(/open/);
  });

  test('Popup appears on first visit with correct content', async ({ page }) => {
    const { expect } = await import('@playwright/test');
    await expect(page.locator('#modalTitle')).toHaveText('Pop-Up Challenge');
    await expect(page.getByRole('button', { name: 'FIND MY CANDY!' })).toBeVisible();
    await expect(page.locator('#closeBtn')).toBeVisible();
  });

  test('User closes the popup with the X button', async ({ page }) => {
    const { expect } = await import('@playwright/test');
    await page.locator('#closeBtn').click();
    await expect(page.locator('#modalOverlay')).not.toHaveClass(/open/);
  });

  test('User closes the popup with the FIND MY CANDY! button', async ({ page }) => {
    const { expect } = await import('@playwright/test');
    await page.getByRole('button', { name: 'FIND MY CANDY!' }).click();
    await expect(page.locator('#modalOverlay')).not.toHaveClass(/open/);
  });

  test('User closes the popup by clicking the backdrop', async ({ page }) => {
    const { expect } = await import('@playwright/test');
    await page.locator('#modalOverlay').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('#modalOverlay')).not.toHaveClass(/open/);
  });

  test('User closes the popup by pressing Escape', async ({ page }) => {
    const { expect } = await import('@playwright/test');
    await page.keyboard.press('Escape');
    await expect(page.locator('#modalOverlay')).not.toHaveClass(/open/);
  });

  test('Popup does not reappear after being dismissed', async ({ page }) => {
    const { expect } = await import('@playwright/test');
    await page.locator('#closeBtn').click();
    await page.reload();
    await expect(page.locator('#modalOverlay')).not.toHaveClass(/open/);
  });

});
