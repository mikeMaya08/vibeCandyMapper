import { test, expect } from '@playwright/test';

const BASE_URL = 'https://vibe-candy-mapper.vercel.app/';

test.describe('Contact Us form', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);

    // Dismiss the welcome modal if it appears
    const findCandyBtn = page.getByRole('button', { name: 'FIND MY CANDY!' });
    if (await findCandyBtn.isVisible()) {
      await findCandyBtn.click();
    }
  });

  test('shows validation error when email is missing and succeeds on valid submission', async ({ page }) => {
    // Scroll to the Contact Us section
    await page.locator('#contactSection').scrollIntoViewIfNeeded();

    // Fill in First Name only (no email)
    await page.getByRole('textbox', { name: 'First Name' }).fill('Mike');

    // Submit without email — expect validation error
    await page.getByRole('button', { name: 'SUBMIT' }).click();
    await expect(page.locator('#emailError')).toHaveText('Please enter a valid email address');

    // Now fill in a valid email and resubmit
    await page.getByRole('textbox', { name: 'Email*' }).fill('miguel@mailinator.com');
    await page.getByRole('button', { name: 'SUBMIT' }).click();

    // Button transitions to "Sending..." while the request is in flight
    await expect(page.locator('#submitLabel')).toContainText('Sending...');

    // Wait for the success view to appear
    await expect(page.locator('#successView')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#successView p')).toHaveText('Thank you! Your message has been sent.');
  });

});
