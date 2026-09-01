import { browser } from 'k6/browser';
import { check } from 'k6';

export const options = {
  scenarios: {
    browser_test: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 5,
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
    const homeResponse = await page.goto(
      'https://www.achnafthariq.com/',
      {
        waitUntil: 'load',
        timeout: 30000,
      }
    );

    check(homeResponse, {
      'homepage status is 200': (r) =>
        r !== null && r.status() === 200,
    });

    const projectLink = page
      .locator('a[href="projects/sales-data-cleaning.html"]')
      .first();

    await projectLink.click();

    await page.waitForURL(
      /\/projects\/sales-data-cleaning\/?$/,
      {
        timeout: 30000,
      }
    );

    check(page.url(), {
      'project page opened': (url) =>
        url.includes('/projects/sales-data-cleaning'),
    });

    await page.waitForTimeout(1500);

  } finally {
    await page.close();
  }
}