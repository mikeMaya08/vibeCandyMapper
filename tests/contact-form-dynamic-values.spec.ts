import { test, expect } from '@playwright/test';

const BASE_URL = 'https://vibe-candy-mapper.vercel.app/';

test.describe('Contact Us form — Dynamic Values challenge', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);

    // Dismiss the welcome modal if it appears
    const findCandyBtn = page.getByRole('button', { name: 'FIND MY CANDY!' });
    if (await findCandyBtn.isVisible()) {
      await findCandyBtn.click();
    }
  });

  test('shows email validation error when submitting Dynamic Values challenge form without email', async ({ page }) => {
    // Navigate to the Challenges section and click the Dynamic Values card
    await page.locator('#optionsGrid').scrollIntoViewIfNeeded();
    await page.locator('//button[@data-topic="Dynamic Values"]').click();

    // The click scrolls to the contact form — fill First Name and Last Name only
    await page.getByRole('textbox', { name: 'First Name' }).fill('Min');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Mon');

    // Submit without an email address
    await page.getByRole('button', { name: 'SUBMIT' }).click();

    // Assert the email validation error is displayed
    await expect(page.locator('#emailError')).toHaveText('Please enter a valid email address');
  });

});
