import { test } from '@playwright/test';
import { WelcomePopupPage } from './pages/WelcomePopupPage';
import { ChallengesPage } from './pages/ChallengesPage';

/**
 * All six challenge cards on the home page share the same behaviour when clicked:
 *   1. The contact section scrolls into view.
 *   2. A topic banner appears above the form.
 *   3. The First Name input receives focus.
 *
 * We test one card per behaviour to keep it lean, and a parametrised group
 * that verifies every card's banner text independently.
 */

const ALL_TOPICS = [
  'Report a Bug',
  'Slider Challenge',
  'Dynamic Values',
  'Join the Hunt',
  'Sandbox Tools',
  'Community',
];

test.describe('Challenge cards — navigation to Contact Us', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.dismissIfVisible();
  });

  test('clicking a card scrolls the contact section into view', async ({ page }) => {
    const challenges = new ChallengesPage(page);

    await challenges.selectChallenge('Dynamic Values');

    // The contact section should now be visible in the viewport
    await challenges.expectContactSectionInViewport();
  });

  test('clicking a card sets focus on the First Name input', async ({ page }) => {
    const challenges = new ChallengesPage(page);

    await challenges.selectChallenge('Report a Bug');

    await challenges.expectNameInputFocused();
  });

  // Parametrised: every card must show its own topic banner text
  for (const topic of ALL_TOPICS) {
    test(`clicking "${topic}" card shows the correct topic banner`, async ({ page }) => {
      const challenges = new ChallengesPage(page);

      await challenges.selectChallenge(topic);

      await challenges.expectTopicBanner(topic);
    });
  }

  test('topic banner is empty before any card is clicked', async ({ page }) => {
    const challenges = new ChallengesPage(page);

    // On fresh load (after modal dismissed) no card has been selected
    await challenges.expectTopicBannerEmpty();
  });

  test('banner updates when a different card is clicked', async ({ page }) => {
    const challenges = new ChallengesPage(page);

    // Select the first card, then switch to a different one
    await challenges.selectChallenge('Slider Challenge');
    await challenges.expectTopicBanner('Slider Challenge');

    await challenges.selectChallenge('Community');
    await challenges.expectTopicBanner('Community');
  });

});
