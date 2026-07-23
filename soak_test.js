/*
Soak Test (Endurance)
Goal: Uncover issues that only appear over long periods, such as memory leaks, unclosed database connections, or disk log fill-ups.

When to use: Ran overnight or during long CI/CD build cycles before major production deployments.

k6 Configuration: Moderate load sustained over hours.
*/

export const options = {
  stages: [
    { duration: '2m', target: 50 },
    { duration: '4h', target: 50 },  // Run for 4 hours
    { duration: '2m', target: 0 },
  ],
};