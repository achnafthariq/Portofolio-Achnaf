# Website Testing & Validation

This document summarizes the performance, functional, and security testing performed on the Achnaf Thariq portfolio website.

Website: https://www.achnafthariq.com  
Test date: 1 September 2026

---

## 1. HTTP Load Testing

Load testing was performed locally using k6 against the production website.

### Test 1 — 10 Virtual Users

| Metric | Result |
|---|---:|
| Maximum VUs | 10 |
| Total Requests | 611 |
| Failed Requests | 0.00% |
| Average Response Time | 86.26 ms |
| p95 Response Time | 130.15 ms |
| Maximum Response Time | 380.26 ms |
| Checks Passed | 100% |

Result: **PASS**

---

### Test 2 — 25 Virtual Users

| Metric | Result |
|---|---:|
| Maximum VUs | 25 |
| Total Requests | 2,856 |
| Failed Requests | 0.00% |
| Average Response Time | 72.59 ms |
| p95 Response Time | 137.53 ms |
| Maximum Response Time | 405.03 ms |
| Checks Passed | 100% |

Thresholds:

- HTTP failure rate < 1%
- p95 response time < 500 ms

Result: **PASS**

---

### Test 3 — 50 Virtual Users

| Metric | Result |
|---|---:|
| Maximum VUs | 50 |
| Total Requests | 6,914 |
| Failed Requests | 0.00% |
| Average Response Time | 73.98 ms |
| p95 Response Time | 132.54 ms |
| Maximum Response Time | 753.12 ms |
| Checks Passed | 100% |

Thresholds:

- HTTP failure rate < 1%
- p95 response time < 500 ms

Result: **PASS**

---

## 2. Browser Performance Testing

Browser-level testing was performed using k6 browser with Chromium.

The test loaded the website as a real browser rather than sending only HTTP requests.

### Stable Single-User Test

| Metric | Result |
|---|---:|
| Browser VUs | 1 |
| Iterations | 5 |
| Homepage HTTP 200 | 100% |
| Largest Contentful Paint (LCP) p95 | 676 ms |
| First Contentful Paint (FCP) | 676 ms |
| Cumulative Layout Shift (CLS) | 0 |
| Time to First Byte (TTFB) p95 | 254.15 ms |
| Checks Passed | 100% |

Thresholds:

- LCP p95 < 2.5 seconds
- CLS p95 < 0.1
- Functional checks = 100%

Result: **PASS**

---

## 3. Functional User Journey Testing

A browser-based user journey test was performed across the main website navigation.

Test flow:

1. Open homepage
2. Verify homepage returns HTTP 200
3. Open the Sales Data Cleaning project
4. Verify project page navigation
5. Return to homepage
6. Navigate to Services
7. Navigate to Contact
8. Validate public contact email

### Result

| Check | Result |
|---|---|
| Homepage status is 200 | PASS |
| Project page opened | PASS |
| Services navigation works | PASS |
| Contact navigation works | PASS |
| Contact email is correct | PASS |

Testing configuration:

- 1 browser VU
- 5 iterations
- 25 total checks
- 25 successful checks
- 0 failed checks

Result: **100% PASS**

---

## 4. Resource Validation

Browser testing identified a missing favicon request:

`/favicon.ico`

The website favicon configuration was updated and the issue was resolved.

The project URL was also standardized to:

`/projects/sales-data-cleaning`

for cleaner public URLs and consistent navigation.

---

## 5. HTTPS and Transport Security

The production domain was evaluated using SSL Labs.

Result:

**SSL Labs Grade: A+**

The website uses:

- HTTPS
- TLS 1.2 minimum
- TLS 1.3 support
- HTTP/2
- HSTS
- Cloudflare SSL/TLS

---

## 6. Security Configuration

The website is protected and configured with several security controls.

Implemented controls include:

- Content-Security-Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy
- Cloudflare Web Application Firewall
- DNSSEC

---

## 7. Email Security

Custom domain email routing is configured through Cloudflare.

Public addresses include:

- `contact@achnafthariq.com`
- `security@achnafthariq.com`

Email security configuration includes:

- SPF
- DKIM
- DMARC
- Cloudflare Email Routing

DMARC currently operates in monitoring mode (`p=none`) while email authentication is monitored.

---

## 8. Security Contact

A public `security.txt` file is available at:

`https://www.achnafthariq.com/.well-known/security.txt`

Security reports can be sent to:

`security@achnafthariq.com`

---

## 9. Test Summary

| Area | Result |
|---|---|
| 10 VU Load Test | PASS |
| 25 VU Load Test | PASS |
| 50 VU Load Test | PASS |
| HTTP Failure Rate | 0% |
| Browser Performance | PASS |
| Functional Navigation | 25/25 PASS |
| SSL Labs | A+ |
| DNSSEC | Enabled |
| Security Headers | Enabled |
| Email Authentication | SPF / DKIM / DMARC |
| security.txt | Published |

---

## Limitations

These results represent controlled testing of a static portfolio website delivered through Cloudflare.

The tests do not demonstrate unlimited scalability, DDoS resistance, or the capacity of a traditional application backend.

The load tests primarily evaluate HTTP delivery through the production Cloudflare infrastructure, while browser tests validate rendering and user-facing navigation.

Testing should be repeated after significant changes to website infrastructure, frontend assets, routing, or security configuration.