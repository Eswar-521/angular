# Dependency Injection & Providers

Angular DI is hierarchical. Use `providedIn` and the `inject()` function in constructors or functions.

```ts
import { Injectable, InjectionToken, inject } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');

@Injectable({ providedIn: 'root' })
export class DataService {
  api = inject(API_URL);
}
```
**Expected output:** Inject tokens anywhere; override providers at component/route level for testability.
