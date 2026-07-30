import { Page, expect } from '@playwright/test';

/**
 * WelcomePopupComponent
 * Component Object pattern: models the welcome modal as a standalone,
 * reusable component — independent of any page that hosts it.
 */
export class WelcomePopupComponent {
  private readonly overlay = '#modalOverlay';
  private readonly card = '#modalOverlay .modal-card';
  private readonly title = '#modalTitle';
  private readonly closeBtn = '#closeBtn';
  private readonly findCandyBtn;

  constructor(private page: Page) {
    this.findCandyBtn = page.getByRole('button', { name: 'FIND MY CANDY!' });
  }

  // ── Setup ────────────────────────────────────────────────────────────────

  async resetState() {
    await this.page.evaluate(() => localStorage.removeItem('seenContactModal'));
    await this.page.reload();
  }

  // ── Assertions ───────────────────────────────────────────────────────────

  async expectVisible() {
    await expect(this.page.locator(this.overlay)).toHaveClass(/open/);
    await expect(this.page.locator(this.card)).toBeVisible();
  }

  async expectClosed() {
    await expect(this.page.locator(this.overlay)).not.toHaveClass(/open/);
  }

  async expectCorrectContent() {
    await expect(this.page.locator(this.title)).toHaveText('Pop-Up Challenge');
    await expect(this.findCandyBtn).toBeVisible();
    await expect(this.page.locator(this.closeBtn)).toBeVisible();
  }

  // ── Actions ──────────────────────────────────────────────────────────────

  async dismissWithCloseButton() {
    await this.page.locator(this.closeBtn).click();
    await this.expectClosed();
  }

  async dismissWithFindMyCandyButton() {
    await this.findCandyBtn.click();
    await this.expectClosed();
  }

  async dismissWithBackdropClick() {
    await this.page.locator(this.overlay).click({ position: { x: 5, y: 5 } });
    await this.expectClosed();
  }

  async dismissWithEscapeKey() {
    await this.page.keyboard.press('Escape');
    await this.expectClosed();
  }

  async dismissIfVisible() {
    if (await this.findCandyBtn.isVisible()) {
      await this.findCandyBtn.click();
    }
  }
}
