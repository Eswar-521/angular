

```ts
import { Injectable, InjectionToken, inject } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');

@Injectable({ providedIn: 'root' })
export class DataService {
  api = inject(API_URL);
}
```

## Code Explanation 

### ➜ `import { Injectable, InjectionToken, inject } from '@angular/core';`
Imports Angular's DI features:
- `Injectable` → marks class as a service
- `InjectionToken` → creates custom tokens for non-class values
- `inject()` → function-based injection

---

### ➜ `export const API_URL = new InjectionToken<string>('API_URL');`
Creates a custom DI token.
Used when injecting:
- strings
- numbers
- config values  
Angular cannot inject raw strings directly, so tokens solve this.

`'API_URL'` is just a debugging label.

---

### ➜ `@Injectable({ providedIn: 'root' })`
Marks `DataService` as injectable.
`providedIn: 'root'`:
- Angular creates **one global instance**
- Available everywhere
- No need to include it in providers array

---

### ➜ `export class DataService {`
Defines the service class that Angular will provide through DI.

---

### ➜ `api = inject(API_URL);`
Injects the value assigned to `API_URL` token.
- Uses new Angular function-style injection
- No need for a constructor
- Works inside services, functions, signals, etc.

This variable (`api`) now contains the value of `API_URL`.

---

### ⭐ Behavior:
- Anything that provides `API_URL` (like in main.ts or component providers) will give a value
- `DataService` automatically receives the injected value
- No need to manually construct DataService

