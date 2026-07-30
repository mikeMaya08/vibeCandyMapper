import { test, expect } from './fixtures';

/**
 * App Fixtures pattern — Welcome popup tests
 * Page objects are injected as fixture arguments; no manual instantiation needed.
 * `popup` fixture navigates to '/' automatically before each test.
 */
test.describe('Welcome popup modal — App Fixtures pattern', () => {

  test.beforeEach(async ({ popup }) => {
    await popup.resetState();
    await popup.expectVisible();
  });

  test('appears on first visit with correct content', async ({ popup }) => {
    await popup.expectVisible();
    await popup.expectCorrectContent();
  });

  test('closes when the X button is clicked', async ({ popup }) => {
    await popup.dismissWithCloseButton();
  });

  test('closes when the FIND MY CANDY! button is clicked', async ({ popup }) => {
    await popup.dismissWithFindMyCandyButton();
  });

  test('closes when clicking the overlay backdrop', async ({ popup }) => {
    await popup.dismissWithBackdropClick();
  });

  test('closes when pressing Escape key', async ({ popup }) => {
    await popup.dismissWithEscapeKey();
  });

  test('does not reappear on second visit after being dismissed', async ({ popup, page }) => {
    await popup.dismissWithCloseButton();
    await page.reload();
    await popup.expectClosed();
  });

});
