# Dependency Injection (DI) & Providers in Angular

## 1. What is Dependency Injection (DI)?

Dependency Injection is a design pattern where objects (services) are **automatically supplied** to components instead of creating them manually.

Without DI:
- You create objects using `new`
- Hard to test
- Hard to reuse

With DI:
- Angular creates and supplies services automatically
- Easy to test, reuse, extend, override

Examples of items injected:
- Services
- Configuration values
- API URLs
- HTTP clients
- Tokens

---

## 2. What Are Providers?

A provider tells Angular **how to create or supply a dependency**.

Providers can supply:
- A class (Service)
- A value
- A function
- A token

In Angular, providers can be placed in:
- `root` (global)
- a component (local provider)
- a route (route-level)
- a module (legacy / older apps)

---

## 3. `providedIn` Explained

```ts
@Injectable({ providedIn: 'root' })
```
This means:

- Angular creates one shared instance of the service

- Available everywhere in the app

- Best for common/shared services


## 4 What Is an Injection Token?

Sometimes you need to inject non-class values, like:

- Strings

- Numbers

- Configuration values

- API URLs

Classes work automatically, but strings must use an InjectionToken:

```js
export const API_URL = new InjectionToken<string>('API_URL');
```

- This creates a custom token Angular can inject.


## 5 What Is the inject() Function?

Traditionally, you inject via constructor:

```js
constructor(private service: DataService) {}
```

But inject() allows injection:

- Inside a service property

- Inside a function

- Outside classes

- In standalone apps

```js
api = inject(API_URL);
```

- This is the new recommended pattern, especially in standalone APIs.


## 6 Why Use DI and Providers?

- Makes services reusable

- Makes testing easier

- Centralizes logic

- Avoids manually creating objects

- Allows overriding for child components/routes

- Supports multiple environment configs

