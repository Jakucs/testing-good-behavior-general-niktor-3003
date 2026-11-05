package steps;

import hooks.Hooks;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import pages.PokemonPage;

import static hooks.Hooks.driver;

public class PokemonSteps {

    private PokemonPage pokemonPage;
    private String defeatedPokemon;

    @Given("the user opens the Pokemon application")
    public void userOpensPokemonApplication() {

        pokemonPage = new PokemonPage(Hooks.driver);
    }

    @Then("the Pokemon homepage should be displayed")
    public void pokemonHomepageShouldBeDisplayed() {
        Assertions.assertTrue(
                pokemonPage.isHomepageDisplayed(),
                "Pokemon homepage was not displayed!"
        );
    }

    @When("the user starts a Pokemon fight")
    public void userStartsPokemonFight() {
        //defeatedPokemon = pokemonPage.getOpponentPokemonName();
        pokemonPage.startPokemonFight();
    }

    @Then("the Pokemon fight should be displayed")
    public void pokemonFightShouldBeDisplayed() {
        Assertions.assertTrue(
                pokemonPage.isFightDisplayed(),
                "Pokemon fight was not displayed!"
        );
    }

    @When("the user wins the Pokemon fight")
    public void userWinsPokemonFight() {
        pokemonPage.winPokemonFight();
    }

    @Then("the Pokemon should be added to the user's collection")
    public void pokemonShouldBeAddedToCollection() {
        pokemonPage.openMyPokemon();

        defeatedPokemon = pokemonPage.getOpponentPokemonName();

        Assertions.assertTrue(
                pokemonPage.isPokemonAddedToCollection(defeatedPokemon),
                "The defeated Pokemon was not added to the collection!"
        );
    }

    @When("the user does not select a Pokemon")
    public void userDoesNotSelectAnyPokemon(){
            // No action
    }

    @Then("the Start Fight button should not be displayed")
    public void startFightButtonDoesNotDisplayed(){
        Assertions.assertFalse(
                pokemonPage.isStartFightButtonDisplayed(),
                "The button displays"
        );

    }

    @Then("the first 20 locations received from the API should be displayed")
    public void firstTwentyLocationsShouldBeDisplayed(){
        Assertions.assertEquals(
                20,
                pokemonPage.getLocationsCount(),
                "The application should display the first 20 locations!"
        );
    }

    @Given("the user has completed a Pokemon battle")
    public void userHasCompletedPokemonBattle() {
        pokemonPage = new PokemonPage(Hooks.driver);
        pokemonPage.startPokemonFight();
        pokemonPage.winPokemonFight();
    }

    @When("the user clicks the Continue your journey button")
    public void userClicksContinueJourneyButton() {
        pokemonPage.continueJourneyButtonClick();
    }

    @Then("the available locations should be displayed again")
    public void locationsShouldBeDisplayedAgain() {
        Assertions.assertEquals(
                20,
                pokemonPage.getLocationsCount(),
                "The application should display the first 20 locations!"
        );
    }

    @When("the user selects a location with Pokemon encounters")
    public void userSelectsLocationWithPokemonEncounters() {
        pokemonPage.selectLocationWithPokemon();
    }

    @Then("a random Pokemon should be displayed")
    public void randomPokemonShouldBeDisplayed() {
        Assertions.assertTrue(
                pokemonPage.isPokemonNameDisplayed(),
                "No Pokemon was displayed!"
        );
    }

    @Then("the Pokemon name should be visible")
    public void pokemonNameShouldBeVisible() {
        Assertions.assertTrue(
                pokemonPage.isPokemonNameDisplayed(),
                "Pokemon name is not visible!"
        );
    }

    @Then("the Pokemon sprite should be visible")
    public void pokemonSpriteShouldBeVisible() {
        Assertions.assertTrue(
                pokemonPage.isPokemonSpriteDisplayed(),
                "Pokemon sprite is not visible!"
        );
    }

    @Given("the user see the locations")
    public void userSeeTheLocations() {
        pokemonPage = new PokemonPage(Hooks.driver);
    }

    @When("the user clicks an exact location")
    public void userSelectedAnExactLocation(){
        pokemonPage.selectLocationWithPokemon();
    }

    @Then("the available locations should not be displayed")
    public void userShouldNotSeeTheLocations(){
        Assertions.assertTrue(
                pokemonPage.areLocationsDisplayed(),
                "Home is no displayed!"
        );
    }


}