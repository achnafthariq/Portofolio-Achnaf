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
    const status = response.status();

    if (status >= 400) {
        console.log(`HTTP ${status} | ${response.url()}`);
    }
    });

  page.on('requestfailed', (request) => {
    const failure = request.failure();

    console.log(
      `FAILED | ${request.resourceType()} | ${request.url()} | ${
        failure ? failure.errorText : 'unknown'
      }`
    );
  });

  try {
    const response = await page.goto(
      'https://www.achnafthariq.com/',
      {
        waitUntil: 'load',
        timeout: 30000,
      }
    );

    check(response, {
      'homepage status is 200': (r) =>
        r !== null && r.status() === 200,
    });

    // Beri waktu resource asynchronous selesai
    await page.waitForTimeout(2000);

  } finally {
    await page.close();
  }
}