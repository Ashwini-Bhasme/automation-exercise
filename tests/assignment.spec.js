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
  await page.getByPlaceholder("Name").fill("ashwini");
  await page.locator("[data-qa='email']").fill("dev.ashwinibhasme+1@gmail.com");
  await page.getByPlaceholder("Subject").fill("Registration");
  await page
    .getByPlaceholder("Your Message Here")
    .fill("Proceed with Registration");
  //await page.pause();
  await page.locator("[name='upload_file']").click();
  await page.locator("[name='upload_file']").setInputFiles("assignment.pdf");

  page.on("dialog", (dialog) => dialog.accept());
  await page.locator("[value='Submit']").click();

  await expect(
    page
      .getByText("Success! Your details have been submitted successfully.")
      .first()
  ).toBeVisible();
});
