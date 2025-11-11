# Getting Started

Install the CLI and scaffold a **standalone** app.

```bash
# Prereqs
node -v
npm i -g @angular/cli

# New app (choose Standalone when prompted or pass the flag)
ng new my-app --standalone --routing --style=scss
cd my-app

# Dev, build, test
ng serve -o
ng build
ng test
```
**Expected output:** Dev server at http://localhost:4200; production build in dist/; tests run with the default runner.
