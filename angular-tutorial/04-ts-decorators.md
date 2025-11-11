# TypeScript & Decorators Primer

Angular uses class decorators for metadata and DI.

```ts
import { Injectable, Component } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {}

@Component({
  selector: 'x-demo',
  standalone: true,
  template: `<p>Hello</p>`
})
export class DemoComponent {}
```
**Expected output:** Services can be injected anywhere; components carry their own metadata.
