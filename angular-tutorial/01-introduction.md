# Introduction

Angular is a full‑stack front‑end framework with routing, DI, HTTP, forms, and tooling built in.
**Angular 16+** added **Standalone Components** (no NgModules) and **Signals** for fine‑grained reactivity.

- **Where it fits:** Enterprise apps, dashboards, admin tools, complex forms, multi‑team codebases.
- **Angular vs React/Vue:** More conventions and batteries included; steeper learning curve but cohesive DX.
- **SPA vs SSR/SSG:** Use **Angular Universal** for SEO and fast first paint; cache at the edge for scale.
- **Standalone & Signals:** Smaller mental model, tree‑shakeable imports, predictable reactivity.

```ts
// Example: standalone component + signals
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <button (click)="inc()">Count {{ count() }} (double: {{ double() }})</button>
  `
})
export class CounterComponent {
  count = signal(0);
  double = computed(() => this.count() * 2);
  constructor(){ effect(() => console.log('count:', this.count())); }
  inc(){ this.count.update(v => v + 1); }
}
```
**Expected output:** Clicking increments the signal; console logs updates; template reflects count and computed double.
