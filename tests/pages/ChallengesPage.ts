import { Page, expect } from '@playwright/test';

/**
 * ChallengesPage
 * Encapsulates interactions with the challenges grid (#optionsGrid).
 * Each card is identified by its data-topic attribute.
 */
export class ChallengesPage {
  private readonly grid = '#optionsGrid';

  constructor(private page: Page) {}

  // ── Navigation ───────────────────────────────────────────────────────────

  /** Scrolls the challenges grid into view. */
  async scrollIntoView() {
    await this.page.locator(this.grid).scrollIntoViewIfNeeded();
  }

  /**
   * Clicks a challenge card by its topic name (data-topic attribute).
   * Also scrolls the grid into view before clicking.
   * Example topics: 'Dynamic Values', 'Static Values'
   */
  async selectChallenge(topic: string) {
    await this.scrollIntoView();
    await this.page.locator(`//button[@data-topic="${topic}"]`).click();
  }

  // ── Assertions ───────────────────────────────────────────────────────────

  /** Asserts the contact section scrolled into the viewport after selecting a challenge. */
  async expectContactSectionInViewport() {
    await expect(this.page.locator('#contactSection')).toBeInViewport();
  }

  /**
   * Asserts the context message above the contact form matches the selected topic.
   * The app renders: You selected "<topic>" — tell us more below.
   */
  async expectContactTopicText(topic: string) {
    await expect(this.page.locator('#contactTopic')).toHaveText(
      `You selected \u201c${topic}\u201d \u2014 tell us more below.`
    );
  }

  /**
   * Asserts that the First Name input has focus after a card is clicked.
   * The app calls nameInput.focus() as part of the card-click handler.
   */
  async expectFirstNameFocused() {
    await expect(this.page.locator('#firstNameInput')).toBeFocused();
  }
}
