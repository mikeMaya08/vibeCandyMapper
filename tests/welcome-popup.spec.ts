import { test } from '@playwright/test';
import { WelcomePopupPage } from './pages/WelcomePopupPage';

test.describe('Welcome popup modal', () => {

  // Clear localStorage before each test so the modal always opens fresh
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.resetState();
    await popup.expectVisible();
  });

  test('appears on first visit with correct content', async ({ page }) => {
    const popup = new WelcomePopupPage(page);
    await popup.expectVisible();
    await popup.expectCorrectContent();
  });

  test('closes when the X button is clicked', async ({ page }) => {
    const popup = new WelcomePopupPage(page);
    await popup.dismissWithCloseButton();
  });

  test('closes when the FIND MY CANDY! button is clicked', async ({ page }) => {
    const popup = new WelcomePopupPage(page);
    await popup.dismissWithFindMyCandyButton();
  });

  test('closes when clicking the overlay backdrop', async ({ page }) => {
    const popup = new WelcomePopupPage(page);
    await popup.dismissWithBackdropClick();
  });

  test('closes when pressing Escape key', async ({ page }) => {
    const popup = new WelcomePopupPage(page);
    await popup.dismissWithEscapeKey();
  });

  test('does not reappear on second visit after being dismissed', async ({ page }) => {
    const popup = new WelcomePopupPage(page);

    // Dismiss the modal (sets seenContactModal in localStorage)
    await popup.dismissWithCloseButton();

    // Reload and verify it stays closed
    await page.reload();
    await popup.expectClosed();
  });

});
