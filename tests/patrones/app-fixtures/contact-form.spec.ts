import { test, expect } from './fixtures';

/**
 * App Fixtures pattern — Contact form tests
 * `popup`, `form`, and `challenges` are injected automatically.
 */
test.describe('Contact form — App Fixtures pattern', () => {

  test.beforeEach(async ({ popup }) => {
    await popup.dismissIfVisible();
  });

  test('shows email validation error when submitting without email', async ({ form }) => {
    await form.scrollIntoView();
    await form.fillForm({ firstName: 'Mike' });
    await form.submit();
    await form.expectEmailValidationError();
  });

  test('shows email validation error on Dynamic Values challenge without email', async ({ challenges, form }) => {
    await challenges.selectChallenge('Dynamic Values');
    await form.fillForm({ firstName: 'Min', lastName: 'Mon' });
    await form.submit();
    await form.expectEmailValidationError();
  });

  test('submits successfully with all fields filled', async ({ form }) => {
    await form.scrollIntoView();
    await form.fillForm({ firstName: 'Mike', email: 'miguel@mailinator.com' });
    await form.submit();
    await form.expectSendingState();
    await form.expectSuccessView();
  });

});
