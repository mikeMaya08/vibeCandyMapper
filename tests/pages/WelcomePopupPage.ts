import { Page, expect } from '@playwright/test';

/**
 * WelcomePopupPage
 * Encapsulates all interactions with the welcome modal (#modalOverlay).
 * Covers: open state, all dismiss mechanisms, and localStorage persistence.
 */
export class WelcomePopupPage {
  private readonly overlay = '#modalOverlay';
  private readonly modalCard = '#modalOverlay .modal-card';
  private readonly modalTitle = '#modalTitle';
  private readonly closeBtn = '#closeBtn';
  private readonly findCandyBtn;

  constructor(private page: Page) {
    this.findCandyBtn = page.getByRole('button', { name: 'FIND MY CANDY!' });
  }

  // ── Setup ────────────────────────────────────────────────────────────────

  /** Clears the localStorage flag so the modal always appears fresh on reload. */
  async resetState() {
    await this.page.evaluate(() => localStorage.removeItem('seenContactModal'));
    await this.page.reload();
  }

  // ── Assertions ───────────────────────────────────────────────────────────

  /** Asserts the modal is open (overlay has class "open"). */
  async expectVisible() {
    await expect(this.page.locator(this.overlay)).toHaveClass(/open/);
    await expect(this.page.locator(this.modalCard)).toBeVisible();
  }

  /** Asserts the modal is closed (overlay does NOT have class "open"). */
  async expectClosed() {
    await expect(this.page.locator(this.overlay)).not.toHaveClass(/open/);
  }

  /** Asserts the modal content: title, FIND MY CANDY button, and close button. */
  async expectCorrectContent() {
    await expect(this.page.locator(this.modalTitle)).toHaveText('Pop-Up Challenge');
    await expect(this.findCandyBtn).toBeVisible();
    await expect(this.page.locator(this.closeBtn)).toBeVisible();
  }

  // ── Actions ──────────────────────────────────────────────────────────────

  /** Closes the modal by clicking the X button, then asserts it is closed. */
  async dismissWithCloseButton() {
    await this.page.locator(this.closeBtn).click();
    await this.expectClosed();
  }

  /** Closes the modal by clicking the FIND MY CANDY! button, then asserts it is closed. */
  async dismissWithFindMyCandyButton() {
    await this.findCandyBtn.click();
    await this.expectClosed();
  }

  /**
   * Closes the modal by clicking the overlay backdrop (outside the card).
   * Uses position { x: 5, y: 5 } to land on the overlay, not the card.
   */
  async dismissWithBackdropClick() {
    await this.page.locator(this.overlay).click({ position: { x: 5, y: 5 } });
    await this.expectClosed();
  }

  /** Closes the modal by pressing the Escape key, then asserts it is closed. */
  async dismissWithEscapeKey() {
    await this.page.keyboard.press('Escape');
    await this.expectClosed();
  }

  /**
   * Dismisses the modal if it is currently visible (non-blocking helper).
   * Use this in beforeEach hooks when the modal is an obstacle, not the subject.
   */
  async dismissIfVisible() {
    if (await this.findCandyBtn.isVisible()) {
      await this.findCandyBtn.click();
    }
  }
}
