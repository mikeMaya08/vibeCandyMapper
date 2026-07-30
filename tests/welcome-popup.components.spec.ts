import { test } from '@playwright/test';
import { WelcomePopupComponent } from './components/WelcomePopupComponent';
import { ContactFormComponent } from './components/ContactFormComponent';
import { ChallengesComponent } from './components/ChallengesComponent';

/**
 * Component Object pattern — Welcome popup tests
 * Components are granular, reusable, and scoped to a single UI area.
 * A "page" would compose multiple components; here we use them directly.
 */
test.describe('Welcome popup — Component Object pattern', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupComponent(page);
    await popup.resetState();
    await popup.expectVisible();
  });

  test('appears on first visit with correct content', async ({ page }) => {
    const popup = new WelcomePopupComponent(page);
    await popup.expectVisible();
    await popup.expectCorrectContent();
  });

  test('closes when the X button is clicked', async ({ page }) => {
    const popup = new WelcomePopupComponent(page);
    await popup.dismissWithCloseButton();
  });

  test('closes when the FIND MY CANDY! button is clicked', async ({ page }) => {
    const popup = new WelcomePopupComponent(page);
    await popup.dismissWithFindMyCandyButton();
  });

  test('closes when clicking the overlay backdrop', async ({ page }) => {
    const popup = new WelcomePopupComponent(page);
    await popup.dismissWithBackdropClick();
  });

  test('closes when pressing Escape key', async ({ page }) => {
    const popup = new WelcomePopupComponent(page);
    await popup.dismissWithEscapeKey();
  });

  test('does not reappear on second visit after being dismissed', async ({ page }) => {
    const popup = new WelcomePopupComponent(page);
    await popup.dismissWithCloseButton();
    await page.reload();
    await popup.expectClosed();
  });

});

test.describe('Contact form — Component Object pattern', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupComponent(page);
    await popup.dismissIfVisible();
  });

  test('shows email validation error when email is missing', async ({ page }) => {
    const form = new ContactFormComponent(page);
    await form.scrollIntoView();
    await form.fillForm({ firstName: 'Mike' });
    await form.submit();
    await form.expectEmailValidationError();
  });

  test('shows email validation error on Dynamic Values challenge without email', async ({ page }) => {
    const challenges = new ChallengesComponent(page);
    const form = new ContactFormComponent(page);
    await challenges.selectChallenge('Dynamic Values');
    await form.fillForm({ firstName: 'Min', lastName: 'Mon' });
    await form.submit();
    await form.expectEmailValidationError();
  });

});
