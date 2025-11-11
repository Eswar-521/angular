# CI/CD & Environments

Automate lint/test/build and promote environments.

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint && npm run test --if-present && npm run build
```
**Expected output:** Every PR is validated; artifacts available for preview deploys.
