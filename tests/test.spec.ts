import { test, expect } from "@playwright/test";
import { uuid } from "./utils/uuid";
import { mailHelper } from "./utils/mailHelper";

// test("fill out data", async ({ page }) => {
//   await page.goto("http://localhost:5173/");
//   await page.getByLabel("Email address").click();
//   await page
//     .getByLabel("Email address")
//     .fill("milos.jovancevic+sistem3@growthmill.com");
//   await page.getByLabel("Password").click();
//   await page.getByLabel("Password").fill("H2NDhbt5QdyK2zG");
//   await page.getByRole("button", { name: "Continue" }).click();
//
//   await page.waitForTimeout(3000);
//   await page
//     .getByRole("menuitem", { name: "book Documentation" })
//     .getByText("Documentation")
//     .click();
//   await page.getByRole("menuitem", { name: "Stripe" }).click();
//
//   const buttonSelector = "button#stripeConnectAccount";
//   const isButtonPresent = await page.isVisible(buttonSelector);
//   if (isButtonPresent) {
//     const page1Promise = page.waitForEvent("popup");
//     await page
//       .getByRole("button", { name: "Click here to Start Stripe Onboarding" })
//       .click();
//     const page1 = await page1Promise;
//     await page1.locator('[data-test="test-mode-fill-button"]').click();
//   }
//
//   await page.getByText("Shopify", { exact: true }).click();
//   await page
//     .getByRole("menuitem", { name: "Create an App" })
//     .getByText("Create an App")
//     .click();
//   await page.getByPlaceholder("Shopify Store Name").click();
//   await page.getByPlaceholder("Shopify Store Name").fill("name");
//   await page.getByPlaceholder("Shopify Access Token").click();
//   await page.getByPlaceholder("Shopify Access Token").fill("token");
//   await page.getByRole("button", { name: "Continue" }).click();
//
//   await page.waitForTimeout(1000);
//
//   await page.getByText("Manual Payment Method").click();
//   await page.getByPlaceholder("Payment Gateway Name").click();
//   await page.getByPlaceholder("Payment Gateway Name").fill("gejtvej");
//   await page.getByRole("button", { name: "Continue" }).click();
//
//   await page.waitForTimeout(1000);
//
//   await page
//     .getByRole("menuitem", { name: "Notifications" })
//     .getByText("Notifications")
//     .click();
//   await page.getByPlaceholder("Payment Success Url").click();
//   await page.getByPlaceholder("Payment Success Url").fill("uspeh");
//   await page.getByPlaceholder("Payment Error Url").click();
//   await page.getByPlaceholder("Payment Error Url").fill("neuspeh");
//   await page.getByRole("button", { name: "Continue" }).click();
//
//   await page.waitForTimeout(1000);
// });
//
// test("signup", async ({ page, context }) => {
//   const randomId = uuid("");
//   const email = "milosjotester@gmail.com";
//   const userSignupEmail = `milosjotester+${randomId}@gmail.com`;
//   await page.goto(
//     "https://dashboard-stage.payoffline.growthmill.cloud/api/stripe/checkout/price_1NLaQYJ1mos9bCIQVxER5szH"
//   );
//   await page.waitForLoadState("networkidle");
//   await page.getByLabel("Correo electrónico").click();
//   await page.getByLabel("Correo electrónico").fill(userSignupEmail);
//   await page.waitForTimeout(1000);
//   await page.locator("select").first().selectOption("oxxo");
//   await page.getByPlaceholder("1234 1234 1234 1234").click();
//   await page
//     .getByPlaceholder("1234 1234 1234 1234")
//     .fill("5555 5555 5555 44444");
//   await page.getByPlaceholder("1234 1234 1234 1234").press("Tab");
//   await page.getByPlaceholder("MM / AA").fill("04 / 444");
//   await page.getByPlaceholder("MM / AA").press("Tab");
//   await page.getByPlaceholder("CVC").fill("4444");
//   await page.getByLabel("Nombre del titular de la tarjeta").click();
//   await page.getByLabel("Nombre del titular de la tarjeta").fill("mj");
//   await page
//     .getByLabel(
//       "Acepto las Condiciones de servicio y la Política de privacidad de GM::United States"
//     )
//     .check();
//   await page.waitForTimeout(1000);
//   await page.getByTestId("hosted-payment-submit-button").click();
//
//   await page.waitForTimeout(10000);
//   const emailHTML = await mailHelper.readEmail(
//     page,
//     "no-reply@payoffline.growthmill.cloud",
//     email,
//     "Welcome to PayOffline!"
//   );
//   await page.waitForTimeout(5000);
//   const clickHereLink = await mailHelper.getPasswordResetLink(emailHTML);
//   await page.goto(clickHereLink);
//
//   await page.getByLabel("New password", { exact: true }).click();
//   await page
//     .getByLabel("New password", { exact: true })
//     .fill("Teskasifra1988!");
//   await page.getByLabel("Re-enter new password").click();
//   await page.getByLabel("Re-enter new password").fill("Teskasifra1988!");
//   await page.getByRole("button", { name: "Reset password" }).click();
//   await page
//     .getByRole("link", { name: "Back to PayOffline Dashboard" })
//     .click();
//   await page.getByLabel("Email address").click();
//   await page.getByLabel("Email address").fill(userSignupEmail);
//   await page.getByLabel("Email address").press("Tab");
//   await page.getByLabel("Password").fill("Teskasifra1988!");
//   await page.getByLabel("Password").press("Enter");
// });

test("e2e", async ({ page, context }) => {
  const randomId = uuid("");
  const email = "milosjotester@gmail.com";
  const userSignupEmail = `milosjotester+${randomId}@gmail.com`;
  const password = "Teskasifra1988!";
  const baseUrl = "https://dashboard-stage.payoffline.growthmill.cloud/api/";

  await page.goto(
    "https://dashboard-stage.payoffline.growthmill.cloud/api/stripe/checkout/price_1NLaQYJ1mos9bCIQVxER5szH"
  );
  await page.waitForLoadState("networkidle");
  await page.getByLabel("Correo electrónico").click();
  await page.getByLabel("Correo electrónico").fill(userSignupEmail);
  await page.waitForTimeout(1000);
  await page.locator("select").first().selectOption("oxxo");
  await page.getByPlaceholder("1234 1234 1234 1234").click();
  await page
    .getByPlaceholder("1234 1234 1234 1234")
    .fill("5555 5555 5555 44444");
  await page.getByPlaceholder("1234 1234 1234 1234").press("Tab");
  await page.getByPlaceholder("MM / AA").fill("04 / 444");
  await page.getByPlaceholder("MM / AA").press("Tab");
  await page.getByPlaceholder("CVC").fill("4444");
  await page.getByLabel("Nombre del titular de la tarjeta").click();
  await page.getByLabel("Nombre del titular de la tarjeta").fill("mj");
  await page
    .getByLabel(
      "Acepto las Condiciones de servicio y la Política de privacidad de GM::United States"
    )
    .check();
  await page.waitForTimeout(1000);
  await page.getByTestId("hosted-payment-submit-button").click();

  const emailHTML = await mailHelper.readEmail(
    page,
    "no-reply@payoffline.growthmill.cloud",
    email,
    "Welcome to PayOffline!"
  );
  const clickHereLink = await mailHelper.getPasswordResetLink(emailHTML);
  await page.goto(clickHereLink);

  await page.getByLabel("New password", { exact: true }).click();
  await page.getByLabel("New password", { exact: true }).fill(password);
  await page.getByLabel("Re-enter new password").click();
  await page.getByLabel("Re-enter new password").fill(password);
  await page.getByRole("button", { name: "Reset password" }).click();
  await page
    .getByRole("link", { name: "Back to PayOffline Dashboard" })
    .click();
  await page.getByLabel("Email address").click();
  await page.getByLabel("Email address").fill(userSignupEmail);
  await page.getByLabel("Email address").press("Tab");
  await page.getByLabel("Password").fill(password);
  await page.getByLabel("Password").press("Enter");

  // fill out data
  await page
    .getByRole("menuitem", { name: "book Documentation" })
    .getByText("Documentation")
    .click();
  await page.getByRole("menuitem", { name: "Stripe" }).click();

  const buttonSelector = "button#stripeConnectAccount";
  const isButtonPresent = await page.isVisible(buttonSelector);
  if (isButtonPresent) {
    const page1Promise = page.waitForEvent("popup");
    await page
      .getByRole("button", { name: "Click here to Start Stripe Onboarding" })
      .click();
    const page1 = await page1Promise;
    await page1.locator('[data-test="test-mode-fill-button"]').click();
  }

  await page.getByText("Shopify", { exact: true }).click();
  await page
    .getByRole("menuitem", { name: "Create an App" })
    .getByText("Create an App")
    .click();
  await page.getByPlaceholder("Shopify Store Name").click();
  await page.getByPlaceholder("Shopify Store Name").fill("name");
  await page.getByPlaceholder("Shopify Access Token").click();
  await page.getByPlaceholder("Shopify Access Token").fill("token");

  await Promise.all([
    page.waitForResponse(
      (resp) => resp.url().includes(baseUrl) && resp.status() === 200
    ),
    await page.getByRole("button", { name: "Continue" }).click(),
  ]);

  await page.waitForResponse((res) => {
    return res.url().includes(baseUrl) && res.status() === 200;
  });

  await page.getByText("Manual Payment Method").click();
  await page.getByPlaceholder("Payment Gateway Name").click();
  await page.getByPlaceholder("Payment Gateway Name").fill("gejtvej");
  await page.getByRole("button", { name: "Continue" }).click();

  await Promise.all([
    page.waitForResponse(
      (resp) => resp.url().includes(baseUrl) && resp.status() === 200
    ),
    await page.getByRole("button", { name: "Continue" }).click(),
  ]);

  await page
    .getByRole("menuitem", { name: "Notifications" })
    .getByText("Notifications")
    .click();
  await page.getByPlaceholder("Payment Success Url").click();
  await page.getByPlaceholder("Payment Success Url").fill("uspeh");
  await page.getByPlaceholder("Payment Error Url").click();
  await page.getByPlaceholder("Payment Error Url").fill("neuspeh");
  await page.getByRole("button", { name: "Continue" }).click();

  await Promise.all([
    page.waitForResponse(
      (resp) => resp.url().includes(baseUrl) && resp.status() === 200
    ),
    await page.getByRole("button", { name: "Continue" }).click(),
  ]);
});
