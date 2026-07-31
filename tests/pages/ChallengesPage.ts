import { Page, expect } from '@playwright/test';

/**
 * ChallengesPage
 * Encapsulates interactions with the challenges grid (#optionsGrid).
 * Each card is identified by its data-topic attribute.
 */
export class ChallengesPage {
  private readonly grid = '#optionsGrid';
  private readonly topicBanner = '#contactTopic';

  constructor(private page: Page) {}

  // ── Navigation ───────────────────────────────────────────────────────────

  /** Scrolls the challenges grid into view. */
  async scrollIntoView() {
    await this.page.locator(this.grid).scrollIntoViewIfNeeded();
  }

  /**
   * Clicks a challenge card by its topic name (data-topic attribute).
   * Also scrolls the grid into view before clicking.
   * Example topics: 'Dynamic Values', 'Slider Challenge'
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
   * Asserts the topic banner shows the expected text for the selected card.
   * The app renders: `You selected "<topic>" — tell us more below.`
   */
  async expectTopicBanner(topic: string) {
    await expect(this.page.locator(this.topicBanner)).toHaveText(
      `You selected \u201c${topic}\u201d \u2014 tell us more below.`
    );
  }

  /** Asserts the topic banner is empty (no card selected yet, or after reset). */
  async expectTopicBannerEmpty() {
    await expect(this.page.locator(this.topicBanner)).toBeEmpty();
  }

  /**
   * Asserts the First Name input has focus after the card-click scroll.
   * The app calls nameInput.focus() immediately after the scroll.
   */
  async expectNameInputFocused() {
    await expect(this.page.locator('#firstNameInput')).toBeFocused();
  }
}
