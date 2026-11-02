Feature: Pokemon application

  Scenario: Open Pokemon application
    Given the user opens the Pokemon application
    Then the Pokemon homepage should be displayed

  Scenario: Start a Pokemon fight
    Given the user opens the Pokemon application
    When the user starts a Pokemon fight
    Then the Pokemon fight should be displayed