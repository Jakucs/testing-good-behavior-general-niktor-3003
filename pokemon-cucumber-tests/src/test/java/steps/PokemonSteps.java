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
        pokemonPage.startPokemonFight();
    }

    @Then("the Pokemon fight should be displayed")
    public void pokemonFightShouldBeDisplayed() {
        Assertions.assertTrue(
                pokemonPage.isFightDisplayed(),
                "Pokemon fight was not displayed!"
        );
    }
}