import { test as base } from '@playwright/test';
import { WelcomePopupPage } from '../../pages/WelcomePopupPage';
import { ContactFormPage } from '../../pages/ContactFormPage';
import { ChallengesPage } from '../../pages/ChallengesPage';

/**
 * App Fixtures pattern: extends Playwright's base `test` with pre-built
 * page objects. Specs receive them as fixture arguments — no manual
 * instantiation needed inside each test.
 */
type AppFixtures = {
  popup: WelcomePopupPage;
  form: ContactFormPage;
  challenges: ChallengesPage;
};

export const test = base.extend<AppFixtures>({
  // Navigates to '/' and provides a ready WelcomePopupPage instance
  popup: async ({ page }, use) => {
    await page.goto('/');
    await use(new WelcomePopupPage(page));
  },

  // Provides a ContactFormPage instance (nav handled by popup fixture or the test)
  form: async ({ page }, use) => {
    await use(new ContactFormPage(page));
  },

  // Provides a ChallengesPage instance
  challenges: async ({ page }, use) => {
    await use(new ChallengesPage(page));
  },
});

export { expect } from '@playwright/test';
