import { Page, expect } from '@playwright/test';

/**
 * ContactFormComponent
 * Component Object pattern: models the contact form as a reusable component.
 * Can be embedded in any page object that hosts this form.
 */
export class ContactFormComponent {
  private readonly section = '#contactSection';
  private readonly firstNameField;
  private readonly lastNameField;
  private readonly emailField;
  private readonly submitBtn;
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

  async scrollIntoView() {
    await this.page.locator(this.section).scrollIntoViewIfNeeded();
  }

  async fillFirstName(value: string) { await this.firstNameField.fill(value); }
  async fillLastName(value: string)  { await this.lastNameField.fill(value); }
  async fillEmail(value: string)     { await this.emailField.fill(value); }

  async fillForm({ firstName, lastName, email }: {
    firstName?: string; lastName?: string; email?: string;
  }) {
    if (firstName !== undefined) await this.fillFirstName(firstName);
    if (lastName  !== undefined) await this.fillLastName(lastName);
    if (email     !== undefined) await this.fillEmail(email);
  }

  async submit() { await this.submitBtn.click(); }

  async expectEmailValidationError() {
    await expect(this.page.locator(this.emailError)).toHaveText('Please enter a valid email address');
  }

  async expectSendingState() {
    await expect(this.page.locator(this.submitLabel)).toContainText('Sending...');
  }

  async expectSuccessView() {
    await expect(this.page.locator(this.successView)).toBeVisible({ timeout: 5000 });
    await expect(this.page.locator(this.successMessage)).toHaveText('Thank you! Your message has been sent.');
  }
}
