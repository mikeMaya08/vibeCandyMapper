/**
 * ContactFormDataBuilder
 * Data Builders pattern: fluent builder for generating contact form payloads.
 * Provides sensible defaults and allows selective overrides per test scenario.
 * Makes test data intent explicit and eliminates repetitive object literals.
 */
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
}

export class ContactFormDataBuilder {
  private data: ContactFormData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test.user@mailinator.com',
  };

  withFirstName(firstName: string): this {
    this.data.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): this {
    this.data.lastName = lastName;
    return this;
  }

  withEmail(email: string): this {
    this.data.email = email;
    return this;
  }

  /** Removes the email (simulates a user who skips the required field). */
  withoutEmail(): this {
    this.data.email = '';
    return this;
  }

  /** Returns a plain object — pass directly to ContactFormPage.fillForm(). */
  build(): ContactFormData {
    return { ...this.data };
  }
}
