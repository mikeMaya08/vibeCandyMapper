Feature: Welcome popup modal

  Background:
    Given the user clears the seen-modal flag from localStorage
    And the user navigates to the homepage
    Then the welcome popup should be visible

  Scenario: Popup appears on first visit with correct content
    Then the popup should display the title "Pop-Up Challenge"
    And the "FIND MY CANDY!" button should be visible
    And the close button should be visible

  Scenario: User closes the popup with the X button
    When the user clicks the close button
    Then the welcome popup should be closed

  Scenario: User closes the popup with the FIND MY CANDY! button
    When the user clicks the "FIND MY CANDY!" button
    Then the welcome popup should be closed

  Scenario: User closes the popup by clicking the backdrop
    When the user clicks outside the modal card
    Then the welcome popup should be closed

  Scenario: User closes the popup by pressing Escape
    When the user presses the Escape key
    Then the welcome popup should be closed

  Scenario: Popup does not reappear after being dismissed
    When the user clicks the close button
    And the user reloads the page
    Then the welcome popup should be closed
