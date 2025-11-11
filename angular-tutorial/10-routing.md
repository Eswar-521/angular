# Routing (Standalone Router)

Configure routes with `provideRouter` and lazy-load standalone components.

```ts
// app.routes.ts
import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./home.component').then(m => m.HomeComponent) },
  { path: 'users/:id', loadComponent: () => import('./user.component').then(m => m.UserComponent) }
];

// main.ts
import { provideRouter, withInMemoryScrolling } from '@angular/router';
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }))]
});
```
**Expected output:** Navigation updates view without reload; lazy chunks load per route; scroll position is restored.
