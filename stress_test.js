/*
Stress Test (Breaking Point)
Goal: Determine the maximum capacity of the system and see where it breaks (e.g., database connection pool exhaustion, memory leaks).

When to use: To establish operational limits and ensure graceful failure (e.g., returning proper 503 errors instead of crashing the server).

k6 Configuration: Continuously ramp
*/

export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 200 }, // Push beyond normal
    { duration: '5m', target: 400 }, // Extreme traffic
    { duration: '2m', target: 0 },   // Recovery phase
  ],
};