# Routing in Angular (Standalone Router)

## 1. What Is Routing?

Routing allows an Angular application to switch between different views/components  
based on the URL — similar to pages in a website.

Example URLs:
- `/` → Home page
- `/users/10` → User details page
- `/products` → Product list
- `/login` → Login page

Routing makes your application act like a multi-page app while staying inside a single-page application (SPA).

---

## 2. Standalone Router (No NgModule)

With Angular standalone APIs, routing is configured using:

```ts
provideRouter(routes)
```

This replaces older AppRoutingModule files.

Standalone routing is simpler:

- No NgModules required

- Routes are defined in a single file (app.routes.ts)

- Components are lazy-loaded for better performance

## 3. Defining Routes

Routes are an array of objects.
Each object defines:

- path → URL

- loadComponent → which component to load

- loadChildren → which child routes to load

- redirectTo → redirect rules

Example:

```js
ts
Copy code
{ path: '', loadComponent: ... }
```

## 4. Lazy Loading Components

With standalone components, lazy loading is easy:


```ts
Copy code
loadComponent: () => import('./home.component').then(m => m.HomeComponent)
```
Benefits:

- Loads component only when needed

- Faster startup time

- Improves performance

## 5. Route Parameters
Dynamic URLs use route parameters:

Example:

```ts
Copy code
path: 'users/:id'
```

- If URL = /users/10,
- then 10 becomes the route parameter named id.

## 6. Extra Features: Scrolling
Standalone router supports features like:

- Scroll to top on navigation

- Restore previous scroll position

Example:

```ts
withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
```

## 7. Expected Behavior

- Visiting / loads HomeComponent (lazy)

- Visiting /users/5 loads UserComponent with id 5

- Scroll position is restored when navigating back