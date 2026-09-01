import { browser } from 'k6/browser';
import { check } from 'k6';

export const options = {
  scenarios: {
    browser_test: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 1,
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },

  thresholds: {
    checks: ['rate==1.0'],
    browser_web_vital_lcp: ['p(95)<2500'],
    browser_web_vital_cls: ['p(95)<0.1'],
  },
};

export default async function () {
  const page = await browser.newPage();

  page.on('response', (response) => {
    if (response.status() >= 400) {
      console.log(`HTTP ${response.status()} | ${response.url()}`);
    }
  });

  try {
    // 1. Homepage
    const home = await page.goto(
      'https://www.achnafthariq.com/',
      {
        waitUntil: 'load',
        timeout: 30000,
      }
    );

    check(home, {
      'homepage status is 200': (r) =>
        r !== null && r.status() === 200,
    });

    // 2. Buka project
    const projectLink = page
        .locator('a[href*="sales-data-cleaning"]')
        .first();

    const projectHref = await projectLink.getAttribute('href');
    console.log(`PROJECT LINK = ${projectHref}`);

    await projectLink.click();

    await page.waitForURL(
        /\/projects\/sales-data-cleaning\/?$/,
        { timeout: 30000 }
        );

    check(page.url(), {
        'project page opened': (url) =>
            url.includes('/projects/sales-data-cleaning'),
    });

        // 3. Kembali ke homepage
        await page.goto(
        'https://www.achnafthariq.com/',
        {
            waitUntil: 'load',
            timeout: 30000,
        }
        );

    // 4. Services
    const servicesLink = page
      .locator('a[href="#services"]')
      .first();

    await servicesLink.click();
    await page.waitForTimeout(500);

    check(page.url(), {
      'services navigation works': (url) =>
        url.includes('#services'),
    });

    // 5. Contact
    const contactLink = page
      .locator('a[href="#contact"]')
      .first();

    await contactLink.click();
    await page.waitForTimeout(500);

    check(page.url(), {
      'contact navigation works': (url) =>
        url.includes('#contact'),
    });

    // 6. Periksa email publik
    const emailButton = page
      .locator('a[href^="mailto:"]')
      .first();

    const emailHref =
      await emailButton.getAttribute('href');

    console.log(`CONTACT EMAIL = ${emailHref}`);

    check(emailHref, {
      'contact email is correct': (href) =>
        href === 'mailto:contact@achnafthariq.com',
    });

  } finally {
    await page.close();
  }
}