import { Builder, By, Key, until } from "selenium-webdriver";

async function testMovieSearch() {
  // Set up the browser driver
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to the app
    await driver.get("http://localhost:5173"); // Replace with the URL of your MovieSearch app

    // Find the search input field and enter the movie title
    const searchInput = await driver.findElement(By.css('input[type="text"]'));
    await searchInput.sendKeys("John Wick", Key.RETURN);

    // Check if no movies found message appears
    const noMoviesFound = await driver.findElement(
      By.xpath('//p[contains(text(), "No movies found")]')
    );
    if (await noMoviesFound.isDisplayed()) {
      console.log("No movies found.");
    }

    // Find the first movie card and click on it to open the modal
    const movieCard = await driver.findElement(By.css("clickcard"));
    await movieCard.click();

    // Wait for the modal to appear
    await driver.wait(until.elementLocated(By.xpath('//div[@role="dialog"]')));

    // Check if the modal contains the movie title and overview
    const modalTitle = await driver.findElement(
      By.xpath('//h2[@class="text-xl font-semibold text-center"]')
    );
    const modalOverview = await driver.findElement(
      By.xpath(
        '//p[contains(text(), "With the price on his head ever increasing")]'
      )
    );
    console.log("Modal Title:", await modalTitle.getText());
    console.log("Modal Overview:", await modalOverview.getText());

    // Find the close button in the modal and click it to close the modal
    const closeButton = await driver.findElement(
      By.xpath('//button[text()="Close"]')
    );
    await closeButton.click();

    // Wait for the modal to disappear
    await driver.wait(until.stalenessOf(modalTitle));
  } finally {
    // Close the browser
    await driver.quit();
  }
}

testMovieSearch();
