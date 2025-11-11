# Tooling & Project Setup

Use strict TS, ESLint + Prettier, aliases, and environment files.

```ts
// tsconfig.json (partial)
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": "./",
    "paths": { "@app/*": ["src/app/*"], "@env/*": ["src/environments/*"] }
  }
}

// .eslintrc.cjs (basic)
module.exports = {
  root: true,
  ignorePatterns: ["projects/**/*"],
  overrides: [{ files: ["*.ts"], extends: ["plugin:@angular-eslint/recommended"] }]
}

// src/environments/environment.ts
export const environment = { production: false, apiUrl: 'http://localhost:3000' };
```
**Expected output:** Strict typing, linting/formatting, and clean imports with path aliases. Secrets remain out of version control.
