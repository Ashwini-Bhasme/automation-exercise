const { test, expect } = require("@playwright/test");
test("login functionality", async ({ page }) => {
  const email = "dev.ashwinibhasme@gmail.com";
  const pwd = "Sumedha@1984";
  await page.goto("https://automationexercise.com/");
  await page.locator(".fa-lock").click();
  await page.locator("input[data-qa='login-email']").fill(email);
  //invalid password
  await page.getByPlaceholder("Password").fill("random");
  await page.getByRole("button", { name: "Login" }).click();
  const errorMessage = page.getByText("Your email or password is incorrect!");
  //invalid login assertion
  await expect(errorMessage).toHaveText("Your email or password is incorrect!");
  await page.locator("input[data-qa='login-email']").fill(email);
  await page.getByPlaceholder("Password").fill(pwd);
  await page.getByRole("button", { name: "Login" }).click();
  //URL assertion
  await expect(page).toHaveURL("https://automationexercise.com");
  //Text assertion
  await expect(page.getByText("Logged in as ashwini")).toBeVisible();
  const logoutButton = page.locator(".fa-lock");
  //Visibility assertion
  await expect(logoutButton).toBeVisible();
});

test("form submission", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  await page.locator(".fa-envelope").click();
  //URL Assertion
  await expect(page).toHaveURL("https://automationexercise.com/contact_us");
  await page.getByPlaceholder("Name").fill("ab");
  await page.locator("[data-qa='email']").fill("a@gmail.com");
  await page.getByPlaceholder("Subject").fill("Registration");
  await page
    .getByPlaceholder("Your Message Here")
    .fill("Proceed with Registration");

  await page.locator("[name='upload_file']").click();
  await page.locator("[name='upload_file']").setInputFiles("assignment.pdf");

  page.on("dialog", (dialog) => dialog.accept());
  await page.locator("[value='Submit']").click();
  //check for success message
  const successMessage = page.locator(".status.alert.alert-success");
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toHaveText(
    "Success! Your details have been submitted successfully."
  );
});

test("search functionality", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  await page.locator(".card_travel").click();
  await expect(page).toHaveURL("https://automationexercise.com/products");
  const searchQuery = "Frozen Tops";
  await page.locator("#search_product").fill(searchQuery);
  await page.locator("#submit_search").click();
  await expect(page.locator(".title.text-center")).toBeVisible();
  const image = page.locator('img[src="/get_product_picture/13"]');
  await expect(image).toBeVisible();
  const searchResult = page.getByText("Frozen Tops For Kids").nth(1);
  await expect(searchResult).toContainText(searchQuery);
});
test("add third last product to Cart", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  await page.locator(".card_travel").click();
  await expect(page).toHaveURL("https://automationexercise.com/products");
  const products = page.locator(".product-image-wrapper");
  const count = await products.count();
  const thirdLastIndex = count - 3;
  const thirdLastProduct = products.nth(thirdLastIndex);
  await thirdLastProduct.scrollIntoViewIfNeeded();
  await thirdLastProduct.locator(".btn.add-to-cart").first().click();
  const cartNotification = page.locator(".modal-confirm .modal-title");
  await expect(cartNotification).toBeVisible();
  await expect(cartNotification).toContainText("Added!");
});
