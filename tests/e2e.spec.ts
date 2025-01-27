import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:4322';

test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto(baseURL);

  // Expect a title "to contain" "Blog Template".
  await expect(page).toHaveTitle(/Blog Template/);
});

test('theme toggle button changes theme', async ({ page }) => {
  await page.goto(baseURL);

  const themeToggle = page.locator('#theme-toggle');
  await expect(themeToggle).toBeVisible();

  // Check initial theme
  let html = await page.locator('html');
  let initialTheme = await html.getAttribute('data-theme');

  // Toggle theme
  await themeToggle.click();

  // Check theme changed
  html = await page.locator('html');
  let newTheme = await html.getAttribute('data-theme');
  expect(newTheme).not.toBe(initialTheme);
});

test('SEO structured data is present', async ({ page }) => {
  await page.goto(baseURL);

  const structuredData = await page.locator('script[type="application/ld+json"]');
  await expect(structuredData).toBeVisible();

  const structuredDataContent = await structuredData.textContent();
  expect(structuredDataContent).toBeTruthy();

  // TODO: Add more specific checks for structured data content
  // For example, check for @context, @type, title, description, etc.
});

test('all links are clickable', async ({ page }) => {
  await page.goto(baseURL);

  const links = await page.locator('a');
  for (const link of await links.all()) {
    const href = await link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
      try {
        const response = await page.goto(baseURL + href, { waitUntil: 'load' });
        expect(response.status()).toBeLessThan(400); // Check for successful response
      } catch (error) {
        console.error(`Error navigating to ${href}: ${error}`);
        expect(error).toBeNull(); // Fail test if navigation error occurs
      }
      await page.goBack(); // Go back to homepage to continue testing other links
    }
  }
});