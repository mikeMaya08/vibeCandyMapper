import { test } from '@playwright/test';
import { WelcomePopupPage } from './pages/WelcomePopupPage';
import { ChallengesPage } from './pages/ChallengesPage';

/**
 * Challenge card flow
 * Verifies that clicking each of the 6 challenge cards:
 *   1. Scrolls the contact section into the viewport.
 *   2. Sets the context message to "You selected "<topic>" — tell us more below."
 *   3. Focuses the First Name input field.
 */
test.describe('Challenge card flow', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.dismissIfVisible();
  });

  const cards = [
    'Report a Bug',
    'Slider Challenge',
    'Dynamic Values',
    'Join the Hunt',
    'Sandbox Tools',
    'Community',
  ] as const;

  for (const topic of cards) {
    test(`clicking "${topic}" scrolls to contact section and pre-fills context message`, async ({ page }) => {
      const challenges = new ChallengesPage(page);

      // Click the challenge card
      await challenges.selectChallenge(topic);

      // Contact section should now be in the viewport
      await challenges.expectContactSectionInViewport();

      // Context message must reflect the selected topic
      await challenges.expectContactTopicText(topic);

      // First Name field should receive focus automatically
      await challenges.expectFirstNameFocused();
    });
  }

});
