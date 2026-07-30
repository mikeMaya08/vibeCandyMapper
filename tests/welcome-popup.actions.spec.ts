import { test } from '@playwright/test';
import {
  resetPopupState,
  expectPopupVisible,
  expectPopupClosed,
  expectPopupContent,
  dismissPopupWithCloseButton,
  dismissPopupWithFindMyCandy,
  dismissPopupWithBackdrop,
  dismissPopupWithEscape,
} from './actions/popupActions';

/**
 * App Actions pattern — Welcome popup tests
 * Tests call pure action functions; no classes, no page objects.
 * Each function name reads as plain English describing what the user does.
 */
test.describe('Welcome popup modal — App Actions pattern', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await resetPopupState(page);
    await expectPopupVisible(page);
  });

  test('appears on first visit with correct content', async ({ page }) => {
    await expectPopupVisible(page);
    await expectPopupContent(page);
  });

  test('closes when the X button is clicked', async ({ page }) => {
    await dismissPopupWithCloseButton(page);
  });

  test('closes when the FIND MY CANDY! button is clicked', async ({ page }) => {
    await dismissPopupWithFindMyCandy(page);
  });

  test('closes when clicking the overlay backdrop', async ({ page }) => {
    await dismissPopupWithBackdrop(page);
  });

  test('closes when pressing Escape key', async ({ page }) => {
    await dismissPopupWithEscape(page);
  });

  test('does not reappear on second visit after being dismissed', async ({ page }) => {
    await dismissPopupWithCloseButton(page);
    await page.reload();
    await expectPopupClosed(page);
  });

});
