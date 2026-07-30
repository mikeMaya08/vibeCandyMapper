// Generated from: tests/patrones/bdd-gherkin/welcome-popup.feature
import { test } from 'playwright-bdd';

test.describe('Welcome popup modal', () => {

  test.beforeEach(async ({ Given, And }) => {
    await Given('the user clears the seen-modal flag from localStorage');
    await And('the user navigates to the homepage');
  });

  test('Popup appears on first visit with correct content', async ({ Then, And }) => {
    await Then('the popup should display the title "Pop-Up Challenge"');
    await And('the "FIND MY CANDY!" button should be visible');
    await And('the close button should be visible');
  });

  test('User closes the popup with the X button', async ({ When, Then }) => {
    await When('the user clicks the close button');
    await Then('the welcome popup should be closed');
  });

  test('User closes the popup with the FIND MY CANDY! button', async ({ When, Then }) => {
    await When('the user clicks the "FIND MY CANDY!" button');
    await Then('the welcome popup should be closed');
  });

  test('User closes the popup by clicking the backdrop', async ({ When, Then }) => {
    await When('the user clicks outside the modal card');
    await Then('the welcome popup should be closed');
  });

  test('User closes the popup by pressing Escape', async ({ When, Then }) => {
    await When('the user presses the Escape key');
    await Then('the welcome popup should be closed');
  });

  test('Popup does not reappear after being dismissed', async ({ When, And, Then }) => {
    await When('the user clicks the close button');
    await And('the user reloads the page');
    await Then('the welcome popup should be closed');
  });

});
