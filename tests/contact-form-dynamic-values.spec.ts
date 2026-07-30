import { test } from '@playwright/test';
import { WelcomePopupPage } from './pages/WelcomePopupPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { ContactFormPage } from './pages/ContactFormPage';

test.describe('Contact Us form — Dynamic Values challenge', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.dismissIfVisible();
  });

  test('shows email validation error when submitting Dynamic Values challenge form without email', async ({ page }) => {
    const challenges = new ChallengesPage(page);
    const form = new ContactFormPage(page);

    // Navigate to the Dynamic Values challenge (scrolls grid and clicks the card)
    await challenges.selectChallenge('Dynamic Values');

    // Fill First Name and Last Name only — no email
    await form.fillForm({ firstName: 'Min', lastName: 'Mon' });
    await form.submit();

    // Assert email validation error
    await form.expectEmailValidationError();
  });

});
