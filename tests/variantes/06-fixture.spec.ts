import { test as base } from '@playwright/test';
import { WelcomePopupPage } from '../pages/WelcomePopupPage';
import { ChallengesPage } from '../pages/ChallengesPage';
import { ContactFormPage } from '../pages/ContactFormPage';

// VARIANTE 6: Fixture personalizado
// El fixture encapsula el setup (navegar + cerrar modal) e inyecta
// las page objects directamente en el test.

type MyFixtures = {
  popup: WelcomePopupPage;
  challenges: ChallengesPage;
  form: ContactFormPage;
};

const test = base.extend<MyFixtures>({
  popup: async ({ page }, use) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.dismissIfVisible();
    await use(popup);
  },
  challenges: async ({ page }, use) => {
    await use(new ChallengesPage(page));
  },
  form: async ({ page }, use) => {
    await use(new ContactFormPage(page));
  },
});

test.describe('Dynamic Values challenge — fixture personalizado', () => {

  test('shows email validation error when submitting without email',
    async ({ popup: _, challenges, form }) => {
      // popup fixture already navigated and dismissed the modal

      await challenges.selectChallenge('Dynamic Values');

      await form.fillForm({ firstName: 'Min', lastName: 'Mon' });
      await form.submit();
      await form.expectEmailValidationError();
    }
  );

});
