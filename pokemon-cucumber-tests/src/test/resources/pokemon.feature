Feature: Pokemon application

  Scenario: Open Pokemon application
    Given the user opens the Pokemon application
    Then the Pokemon homepage should be displayed

  Scenario: Start a Pokemon fight
    Given the user opens the Pokemon application
    When the user starts a Pokemon fight
    Then the Pokemon fight should be displayed

   Scenario: Add a Pokemon to my collection after winning a fight
      Given the user opens the Pokemon application
      And the user starts a Pokemon fight
      When the user wins the Pokemon fight
      Then the Pokemon should be added to the user's collection

    Scenario: Start a fight without selecting a Pokemon
      Given the user opens the Pokemon application
      When the user does not select a Pokemon
      Then the Start Fight button should not be displayed


#integraion tests

      Scenario: Display locations received from the API
        Given the user opens the Pokemon application
        Then the first 20 locations received from the API should be displayed

        Scenario: Locations are displayed again after the battle
          Given the user has completed a Pokemon battle
          When the user clicks the Continue your journey button
          Then the available locations should be displayed again

            Scenario: Display a random Pokemon after selecting a location
              Given the user opens the Pokemon application
              When the user selects a location with Pokemon encounters
              Then a random Pokemon should be displayed
              And the Pokemon name should be visible
              And the Pokemon sprite should be visible

              Scenario: Locations are not displayed after selecting a location
                Given the user see the locations
                When the user clicks an exact location
                Then the available locations should not be displayed