import { Page, expect } from '@playwright/test';

/**
 * ChallengesComponent
 * Component Object pattern: models the challenges grid as a standalone component.
 */
export class ChallengesComponent {
  private readonly grid = '#optionsGrid';

  constructor(private page: Page) {}

  async scrollIntoView() {
    await this.page.locator(this.grid).scrollIntoViewIfNeeded();
  }

  async selectChallenge(topic: string) {
    await this.scrollIntoView();
    await this.page.locator(`//button[@data-topic="${topic}"]`).click();
  }

  async expectContactSectionInViewport() {
    await expect(this.page.locator('#contactSection')).toBeInViewport();
  }
}
