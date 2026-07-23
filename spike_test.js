/*

Spike Test (Sudden Surges)
Goal: Evaluate how the system responds to sudden, massive bursts of traffic and how quickly it recovers.

When to use: E-commerce flash sales, breaking news announcements, or viral marketing pushes.

k6 Configuration: Instant jump from baseline traffic to maximum load and back down

*/

export const options = {
  stages: [
    { duration: '10s', target: 10 },  // Normal load
    { duration: '1m', target: 500 },  // Immediate spike!
    { duration: '3m', target: 500 },  // Hold spike
    { duration: '10s', target: 10 },  // Drop back to normal
  ],
};