import { test } from '@playwright/test';
import { dismissPopupIfVisible } from './actions/popupActions';
import {
  scrollToContactForm,
  fillContactForm,
  submitContactForm,
  expectEmailValidationError,
  expectFormSuccess,
  selectChallenge,
} from './actions/formActions';

/**
 * App Actions pattern — Contact form tests
 * Each action function names what the user does; spec reads like a user story.
 */
test.describe('Contact form — App Actions pattern', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await dismissPopupIfVisible(page);
  });

  test('shows email validation error when email is missing', async ({ page }) => {
    await scrollToContactForm(page);
    await fillContactForm(page, { firstName: 'Mike' });
    await submitContactForm(page);
    await expectEmailValidationError(page);
  });

  test('shows email validation error on Dynamic Values challenge without email', async ({ page }) => {
    await selectChallenge(page, 'Dynamic Values');
    await fillContactForm(page, { firstName: 'Min', lastName: 'Mon' });
    await submitContactForm(page);
    await expectEmailValidationError(page);
  });

  test('submits successfully with all fields filled', async ({ page }) => {
    await scrollToContactForm(page);
    await fillContactForm(page, { firstName: 'Mike', email: 'miguel@mailinator.com' });
    await submitContactForm(page);
    await expectFormSuccess(page);
  });

});
