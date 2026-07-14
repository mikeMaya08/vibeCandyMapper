import { test, expect } from '@playwright/test';

const CANDYMAPPER_URL = 'https://www.candymapper.net/';

test.describe('Contact Us form — candymapper.net', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(CANDYMAPPER_URL);

    // Wait up to 10s for the modal/banner to appear, then dismiss it
    const closeLink = page.locator('[aria-label="FIND MY CANDY"]');
    await closeLink.waitFor({ state: 'visible', timeout: 10000 });
    await closeLink.click();
  });

  test('fills and submits the contact form using keyboard input', async ({ page }) => {
    // Scroll the Wix contact form into view and let it settle
    await page.locator('form[aria-label="Contact us"]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800); // let scroll animation and lazy-loaded widgets render

    // --- First Name ---
    await page.getByRole('textbox', { name: 'First name' }).focus();
    await page.waitForTimeout(400);
    await page.keyboard.type('Mike', { delay: 80 });

    // --- Last Name ---
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Last name' }).focus();
    await page.waitForTimeout(400);
    await page.keyboard.type('Smith', { delay: 80 });

    // --- Attempt submit without email — expect inline validation error ---
    await page.waitForTimeout(600);
    await page.locator('[data-hook="submit-button"]').focus();
    await page.waitForTimeout(300);
    await page.keyboard.press('Enter');

    await expect(page.locator('[data-hook="field-error-email"]')).toBeVisible();

    // --- Email ---
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Email' }).focus();
    await page.waitForTimeout(400);
    await page.keyboard.type('miguel@mailinator.com', { delay: 80 });

    // --- Message ---
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Message' }).focus();
    await page.waitForTimeout(400);
    await page.keyboard.type('Hello from automated testing!', { delay: 80 });

    // --- Submit ---
    await page.waitForTimeout(600);
    await page.locator('[data-hook="submit-button"]').focus();
    await page.waitForTimeout(300);
    await page.keyboard.press('Enter');

    // Wait for the success message to appear after submission
    await expect(page.getByText('Thank you for your inquiry! We will get back to you within 48 hours.')).toBeVisible({ timeout: 10000 });
  });

});
