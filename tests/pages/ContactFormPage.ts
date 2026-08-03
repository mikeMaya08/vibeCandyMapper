import { Page, expect } from '@playwright/test';

/**
 * ContactFormPage
 * Encapsulates interactions with the contact form (#contactSection).
 * Covers: navigation to the section, filling fields, submitting,
 * validation error assertions, and success state assertions.
 */
export class ContactFormPage {
  private readonly section = '#contactSection';
  private readonly firstNameField;
  private readonly lastNameField;
  private readonly emailField;
  private readonly submitBtn;
  private readonly nameError = '#nameError';
  private readonly emailError = '#emailError';
  private readonly submitLabel = '#submitLabel';
  private readonly successView = '#successView';
  private readonly successMessage = '#successView p';

  constructor(private page: Page) {
    this.firstNameField = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameField = page.getByRole('textbox', { name: 'Last Name' });
    this.emailField = page.getByRole('textbox', { name: 'Email*' });
    this.submitBtn = page.getByRole('button', { name: 'SUBMIT' });
  }

  // ── Navigation ───────────────────────────────────────────────────────────

  /** Scrolls the contact section into view so form fields are interactable. */
  async scrollIntoView() {
    await this.page.locator(this.section).scrollIntoViewIfNeeded();
  }

  // ── Actions ──────────────────────────────────────────────────────────────

  /** Fills the First Name field. */
  async fillFirstName(value: string) {
    await this.firstNameField.fill(value);
  }

  /** Fills the Last Name field. */
  async fillLastName(value: string) {
    await this.lastNameField.fill(value);
  }

  /** Fills the Email field. */
  async fillEmail(value: string) {
    await this.emailField.fill(value);
  }

  /**
   * Fills all available form fields in one call.
   * Any field left undefined is skipped (not filled).
   */
  async fillForm({ firstName, lastName, email }: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }) {
    if (firstName !== undefined) await this.fillFirstName(firstName);
    if (lastName !== undefined) await this.fillLastName(lastName);
    if (email !== undefined) await this.fillEmail(email);
  }

  /** Clicks the SUBMIT button. */
  async submit() {
    await this.submitBtn.click();
  }

  // ── Assertions ───────────────────────────────────────────────────────────

  /** Asserts the email validation error message is shown. */
  async expectEmailValidationError() {
    await expect(this.page.locator(this.emailError)).toHaveText(
      'Please enter a valid email address'
    );
  }

  /** Asserts the submit button transitions to "Sending..." state. */
  async expectSendingState() {
    await expect(this.page.locator(this.submitLabel)).toContainText('Sending...');
  }

  /** Asserts the success view is visible with the confirmation message. */
  async expectSuccessView() {
    await expect(this.page.locator(this.successView)).toBeVisible({ timeout: 5000 });
    await expect(this.page.locator(this.successMessage)).toHaveText(
      'Thank you! Your message has been sent.'
    );
  }
}
