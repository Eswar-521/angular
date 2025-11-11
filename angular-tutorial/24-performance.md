# Performance & Change Detection

Prefer `OnPush`, trackBy, and small, pure pipes; split bundles and preload critical routes.

```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ /*...*/ changeDetection: ChangeDetectionStrategy.OnPush })
export class FastList {}
```
**Expected output:** Fewer change detection cycles; smoother lists with trackBy.
