import { test, expect } from '@playwright/test';

test.describe('Welcome popup modal', () => {

  // Clear localStorage before each test so the modal always opens fresh
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('seenContactModal'));
    await page.reload();
    await expect(page.locator('#modalOverlay')).toHaveClass(/open/);
  });

  test('appears on first visit with correct content', async ({ page }) => {
    const modal = page.locator('#modalOverlay .modal-card');
    await expect(modal).toBeVisible();
    await expect(page.locator('#modalTitle')).toHaveText('Pop-Up Challenge');
    await expect(page.getByRole('button', { name: 'FIND MY CANDY!' })).toBeVisible();
    await expect(page.locator('#closeBtn')).toBeVisible();
  });

  test('closes when the X button is clicked', async ({ page }) => {
    await page.locator('#closeBtn').click();
    await expect(page.locator('#modalOverlay')).not.toHaveClass(/open/);
  });

  test('closes when the FIND MY CANDY! button is clicked', async ({ page }) => {
    await page.getByRole('button', { name: 'FIND MY CANDY!' }).click();
    await expect(page.locator('#modalOverlay')).not.toHaveClass(/open/);
  });

  test('closes when clicking the overlay backdrop', async ({ page }) => {
    // Click on the overlay area outside the modal card
    await page.locator('#modalOverlay').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('#modalOverlay')).not.toHaveClass(/open/);
  });

  test('closes when pressing Escape key', async ({ page }) => {
    await page.keyboard.press('Escape');
    await expect(page.locator('#modalOverlay')).not.toHaveClass(/open/);
  });

  test('does not reappear on second visit after being dismissed', async ({ page }) => {
    // Dismiss the modal (sets seenContactModal in localStorage)
    await page.locator('#closeBtn').click();
    await expect(page.locator('#modalOverlay')).not.toHaveClass(/open/);

    // Reload and verify it stays closed
    await page.reload();
    await expect(page.locator('#modalOverlay')).not.toHaveClass(/open/);
  });

});
