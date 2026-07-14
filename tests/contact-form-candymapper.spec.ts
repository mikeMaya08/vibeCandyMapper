import { test, expect } from '@playwright/test';

const CANDYMAPPER_URL = 'https://www.candymapper.net/';

test.describe('Contact Us form — candymapper.net', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(CANDYMAPPER_URL);

    // Dismiss the modal/banner if it appears (Wix overlay close link)
    const closeLink = page.locator('[data-testid="linkElement"]');
    if (await closeLink.isVisible()) {
      await closeLink.click();
    }
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

    // NOTE: This form is protected by reCAPTCHA. The submit button state
    // and any success message assertion may not be reachable in a headless
    // automated run without a reCAPTCHA bypass strategy.
    // The assertions below will pass only in environments where reCAPTCHA
    // is disabled or mocked.
    await expect(page.locator('[data-hook="submit-button"]')).toHaveAttribute('aria-disabled', 'true', { timeout: 5000 });
  });

});
