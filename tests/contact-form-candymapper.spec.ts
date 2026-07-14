import { test, expect } from '@playwright/test';

const CANDYMAPPER_URL = 'https://www.candymapper.net/';

test.describe('Contact Us form — candymapper.net', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(CANDYMAPPER_URL);

    // Dismiss the welcome modal if it appears
    const findCandyBtn = page.getByRole('button', { name: 'FIND MY CANDY!' });
    if (await findCandyBtn.isVisible()) {
      await findCandyBtn.click();
    }
  });

  test('shows validation error when email is missing and succeeds on valid submission (keyboard)', async ({ page }) => {
    // Scroll to the Contact Us section
    await page.locator('#contactSection').scrollIntoViewIfNeeded();
    // Sleep: let the scroll animation settle before interacting
    await page.waitForTimeout(800);

    // Focus and type First Name using the keyboard
    await page.getByRole('textbox', { name: 'First Name' }).focus();
    await page.waitForTimeout(400);
    await page.keyboard.type('Mike', { delay: 80 });

    // Sleep: brief pause before attempting to submit
    await page.waitForTimeout(600);

    // Tab to submit and press Enter — no email filled, expect validation error
    await page.getByRole('button', { name: 'SUBMIT' }).focus();
    await page.waitForTimeout(300);
    await page.keyboard.press('Enter');
    await expect(page.locator('#emailError')).toHaveText('Please enter a valid email address');

    // Sleep: pause before filling in the email field
    await page.waitForTimeout(500);

    // Focus the Email field and type using the keyboard
    await page.getByRole('textbox', { name: 'Email*' }).focus();
    await page.waitForTimeout(400);
    await page.keyboard.type('miguel@mailinator.com', { delay: 80 });

    // Sleep: brief pause before submitting
    await page.waitForTimeout(600);

    // Submit using the keyboard
    await page.getByRole('button', { name: 'SUBMIT' }).focus();
    await page.waitForTimeout(300);
    await page.keyboard.press('Enter');

    // Button transitions to "Sending..." while the request is in flight
    await expect(page.locator('#submitLabel')).toContainText('Sending...');

    // Wait for the success view to appear
    await expect(page.locator('#successView')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#successView p')).toHaveText('Thank you! Your message has been sent.');
  });

});
