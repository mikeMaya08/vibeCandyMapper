/**
 * ContactFormDataBuilder
 * Data Builders pattern: fluent builder for generating contact form payloads.
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

  withoutEmail(): this {
    this.data.email = '';
    return this;
  }

  build(): ContactFormData {
    return { ...this.data };
  }
}
