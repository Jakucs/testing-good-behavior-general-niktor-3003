package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

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
        
        return false;
    }
}
