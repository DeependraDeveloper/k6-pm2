/*

Smoke Test (Sanity Check)
Goal: Verify that your test script is written correctly and that the target system can handle a minimal load without crashing.

When to use: Before running heavy performance tests or right after deploying to a staging environment.
k6 Configuration: Very low VUs (Virtual Users) for a short duration.

*/

import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');

export const options = {
  vus: 1, // Just 1 user
  duration: '30s',
};
export default function () {
  const res = http.get('http://localhost:3000/api/v1/users/all');

  // Verify response status
  const success = check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Track error rate (add 1 if failed, 0 if succeeded)
  errorRate.add(!success);
}