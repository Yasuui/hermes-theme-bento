/**
 * Hermes Screen Recorder — Playwright-based, no vision model needed.
 * Two modes:
 *   1. flow    — records clicking through nav, testing UI interactions
 *   2. cinema  — slow pans, hover pauses, cinematic showcase
 * 
 * Usage: npx playwright test recording.spec.ts --project=chromium
 * Output: test-results/recording-[flow|cinema]/video.webm
 */
import { test, expect, Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// ── Configuration ──────────────────────────────────────────────
const BASE_URL = process.env.RECORD_URL || 'http://localhost:3000';
const SLOW_MO = 80; // ms between actions — smooth cursor effect
const OUTPUT_DIR = process.env.RECORD_OUTPUT || '/tmp';

// ── Flow Recording: Click through every nav item, test every island ──
test('flow — full UX walkthrough', async ({ page, browserName }) => {
  test.slow(); // allow up to 3x timeout

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // let stagger animations settle

  // Hover top stat cards left to right with pauses
  const statCards = page.locator('main .grid > div').first().locator('> div');
  const cardCount = await statCards.count();
  for (let i = 0; i < Math.min(cardCount, 3); i++) {
    await statCards.nth(i).hover({ force: true });
    await page.waitForTimeout(800);
  }

  // Click through sidebar nav items
  const navItems = [
    'Sessions', 'Models', 'Logs', 'Cron', 'Skills', 
    'Plugins', 'Profiles', 'Config', 'Keys', 'Documentation'
  ];
  
  for (const label of navItems) {
    const navBtn = page.getByRole('button', { name: label, exact: true });
    if (await navBtn.isVisible({ timeout: 500 }).catch(() => false)) {
      await navBtn.click();
      await page.waitForTimeout(600);
    }
  }

  // Click plugin section items
  for (const label of ['Kanban', 'Example', 'Achievements']) {
    const btn = page.getByRole('button', { name: label, exact: true });
    if (await btn.isVisible({ timeout: 500 }).catch(() => false)) {
      await btn.click();
      await page.waitForTimeout(500);
    }
  }

  // Theme toggle: dark → light → dark
  const themeBtn = page.getByRole('button', { name: /toggle theme/i });
  if (await themeBtn.isVisible({ timeout: 500 }).catch(() => false)) {
    await themeBtn.click();
    await page.waitForTimeout(1000);
    await themeBtn.click();
    await page.waitForTimeout(800);
  }

  // Interact with Models island — favorite/unfavorite buttons
  const favBtns = page.getByRole('button', { name: /favorite/i });
  const favCount = await favBtns.count();
  for (let i = 0; i < Math.min(favCount, 3); i++) {
    await favBtns.nth(i).click();
    await page.waitForTimeout(400);
  }

  // Scroll slowly back to top
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(2000);

  // Final pause on full dashboard
  await page.waitForTimeout(2000);
});

// ── Cinema Recording: Slow cinematic showcase with smooth pans ──
test('cinema — premium product showcase', async ({ page }) => {
  test.slow();

  await page.setViewportSize({ width: 1440, height: 900 });

  // Dramatic load — slower, deliberate
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500); // extended pause for impact

  // Slow scroll: reveal content section by section
  for (const scrollY of [0, 120, 280, 440, 600, 800, 0]) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'smooth' }), scrollY);
    await page.waitForTimeout(1500);
  }

  // Linger on each stat card
  const cards = page.locator('main .grid > div').first().locator('> div');
  const cCount = await cards.count();
  for (let i = 0; i < Math.min(cCount, 3); i++) {
    await cards.nth(i).hover({ force: true });
    await page.waitForTimeout(1200);
  }

  // Gentle sidebar reveal — hover over each nav item slowly
  const nav = ['Sessions', 'Models', 'Skills', 'Profiles', 'Documentation'];
  for (const label of nav) {
    const btn = page.getByRole('button', { name: label, exact: true });
    if (await btn.isVisible({ timeout: 500 }).catch(() => false)) {
      await btn.hover({ force: true });
      await page.waitForTimeout(1000);
    }
  }

  // Theme transition with dramatic pause
  const themeToggle = page.getByRole('button', { name: /toggle theme/i });
  if (await themeToggle.isVisible({ timeout: 500 }).catch(() => false)) {
    await themeToggle.click();
    await page.waitForTimeout(2000); // Let viewer absorb the change
    await themeToggle.click();
    await page.waitForTimeout(1500);
  }

  // Final hero shot
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(3000);
});

// ── Post-processing hook — copy video to /tmp ──
test.afterAll(async () => {
  // Playwright saves videos to test-results/<project>/<test-name>-video.webm
  const testResultsDir = path.join(process.cwd(), 'test-results');
  if (fs.existsSync(testResultsDir)) {
    const files = fs.readdirSync(testResultsDir, { recursive: true }) as string[];
    for (const file of files) {
      if (file.endsWith('.webm')) {
        const src = path.join(testResultsDir, file);
        const dest = path.join(OUTPUT_DIR, path.basename(file));
        fs.copyFileSync(src, dest);
        console.log(`✓ Video saved: ${dest}`);
      }
    }
  }
});
