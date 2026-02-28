import { test, expect } from '@playwright/test';

const E2E_EMAIL = process.env.E2E_EMAIL || '';
const E2E_PASSWORD = process.env.E2E_PASSWORD || '';

// Test A: Unauthenticated access redirects to login
test('Unauthenticated access redirects to login', async ({ page }) => {
  await page.goto('/app/settings');
  await expect(page).toHaveURL(/\/login/);
  await expect(page.locator('form')).toBeVisible();
});

// Test B: Invalid login shows an error message
test('Invalid login shows an error message', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[data-testid="login-email"]', 'invalid@example.com');
  await page.fill('[data-testid="login-password"]', 'wrongpassword');
  await page.click('[data-testid="login-submit"]');
  await expect(page.locator('[data-testid="login-error"]')).toBeVisible();
  await expect(page).toHaveURL(/\/login/);
});

// Test C: Valid login redirects to dashboard
test('Valid login redirects to dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[data-testid="login-email"]', E2E_EMAIL);
  await page.fill('[data-testid="login-password"]', E2E_PASSWORD);
  await page.click('[data-testid="login-submit"]');
  await expect(page).toHaveURL(/\/app/);
  await expect(page.locator('body')).not.toBeEmpty();
});

// Test D: Logged-in user visiting /login gets redirected away
test('Logged-in user visiting /login gets redirected away', async ({ page }) => {
  // Assume already logged in from previous test
  await page.goto('/login');
  await expect(page).toHaveURL(/\/app\/dashboard/);
});