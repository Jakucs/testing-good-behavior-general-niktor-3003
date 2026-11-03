package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class PokemonPage extends BasePage{

    public PokemonPage(WebDriver driver) {
        super(driver);
    }

    private By eternaCityButton =
            By.xpath("//h3[text()='Eterna City']/following-sibling::button");

    private By eternaWestGateButton =
            By.xpath("//h3[text()='Eterna City West Gate']/following-sibling::button");

    private By charizardChoose =
            By.xpath("//h2[text()='CHARIZARD']/following-sibling::button");

    private By startFightButton =
            By.xpath("//button[text()='Start Fight']");

    private By battleLogTitle = By.xpath("//span[text()='Battle Log']");

    private By victoryMessage = By.xpath("//h2[text()='You won!']");

    private By opponentPokemonName = By.xpath("(//h2[contains(@class,'pokemon-card__name')])[last()]");

    private By continueJourneyButton =
            By.className("winner-back-button");

    public void startPokemonFight() {
        click(eternaCityButton);
        click(eternaWestGateButton);
        click(charizardChoose);
        click(startFightButton);
    }

    public boolean isHomepageDisplayed() {
        return driver.getCurrentUrl().equals("http://localhost:5173/");
    }

    public boolean isFightDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(battleLogTitle)).isDisplayed();
    }

    public boolean winPokemonFight(){
        return wait.until(ExpectedConditions.visibilityOfElementLocated(victoryMessage)).isDisplayed();
    }

    public void openMyPokemon(){
        click(continueJourneyButton);
        click(eternaCityButton);
        click(eternaWestGateButton);
    }

    public String getOpponentPokemonName() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(opponentPokemonName)).getText();
    }

    public boolean isPokemonAddedToCollection(String pokemonName) {
        By locator = By.xpath("//h2[@class='pokemon-card__name'][translate(normalize-space(text()),"
                + "'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='"
                + pokemonName.trim().toUpperCase() + "']");
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(locator)).isDisplayed();
        } catch (TimeoutException e) {
            return false;
        }
    }
}
