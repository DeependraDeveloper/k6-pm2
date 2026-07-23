/*

Load Test (Average Traffic)
Goal: Assess how the application performs under expected daily traffic or baseline concurrent users.

When to use: To measure standard response times, latency, and resource usage (CPU/Memory) before releasing a new feature.

k6 Configuration: Ramp up to target normal load, hold it, and ramp down.

*/




import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '1m', target: 50 },  // Ramp-up to 50 users
    { duration: '5m', target: 50 },  // Stay at 50 users (steady state)
    { duration: '1m', target: 0 },   // Ramp-down to 0 users
  ],
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