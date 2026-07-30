import { Page, expect } from '@playwright/test';

/**
 * App Actions pattern — popup actions
 * Pure functions that receive `page` and perform a single, named action.
 */

export async function resetPopupState(page: Page) {
  await page.evaluate(() => localStorage.removeItem('seenContactModal'));
  await page.reload();
}

export async function expectPopupVisible(page: Page) {
  await expect(page.locator('#modalOverlay')).toHaveClass(/open/);
  await expect(page.locator('#modalOverlay .modal-card')).toBeVisible();
}

export async function expectPopupClosed(page: Page) {
  await expect(page.locator('#modalOverlay')).not.toHaveClass(/open/);
}

export async function expectPopupContent(page: Page) {
  await expect(page.locator('#modalTitle')).toHaveText('Pop-Up Challenge');
  await expect(page.getByRole('button', { name: 'FIND MY CANDY!' })).toBeVisible();
  await expect(page.locator('#closeBtn')).toBeVisible();
}

export async function dismissPopupWithCloseButton(page: Page) {
  await page.locator('#closeBtn').click();
  await expectPopupClosed(page);
}

export async function dismissPopupWithFindMyCandy(page: Page) {
  await page.getByRole('button', { name: 'FIND MY CANDY!' }).click();
  await expectPopupClosed(page);
}

export async function dismissPopupWithBackdrop(page: Page) {
  await page.locator('#modalOverlay').click({ position: { x: 5, y: 5 } });
  await expectPopupClosed(page);
}

export async function dismissPopupWithEscape(page: Page) {
  await page.keyboard.press('Escape');
  await expectPopupClosed(page);
}

export async function dismissPopupIfVisible(page: Page) {
  const btn = page.getByRole('button', { name: 'FIND MY CANDY!' });
  if (await btn.isVisible()) await btn.click();
}
