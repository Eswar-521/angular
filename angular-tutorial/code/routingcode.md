
```ts
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./home.component')
      .then(m => m.HomeComponent) 
  },
  { 
    path: 'users/:id', 
    loadComponent: () => import('./user.component')
      .then(m => m.UserComponent) 
  }
];


// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes, 
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled'
      })
    )
  ]
});

```


### ➜ `import { Routes } from '@angular/router';`
Imports Angular's routing type used to define route configs.

---

### ➜ `export const routes: Routes = [ ... ];`
Creates an array of route definitions.
Each object in the array represents a route.

---

### ➜ `{ path: '', loadComponent: () => import('./home.component').then(m => m.HomeComponent) }`
Defines the root path `/`.
- `path: ''` → empty path means homepage
- `loadComponent` → lazy-loads HomeComponent using dynamic import

---

### ➜ `{ path: 'users/:id', loadComponent: ... }`
Defines a route with a parameter:
- `users/:id` → matches URLs like `/users/5`
- `:id` is the dynamic route parameter
- Component loads lazily

---

### ➜ `import { provideRouter, withInMemoryScrolling } from '@angular/router';`
Imports standalone router providers.

---

### ➜ `bootstrapApplication(AppComponent, { providers: [...] })`
Bootstraps Angular app and registers routing providers.

---

### ➜ `provideRouter(routes)`
Registers the routing configuration using the `routes` array.

---

### ➜ `withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })`
Adds extra router behavior:
- Restores scroll position when navigating back
- Scrolls to top when navigating forward

---

### ⭐ Expected Behavior:
- `/` loads HomeComponent lazily
- `/users/:id` loads UserComponent lazily
- Router restores scroll positions automatically
