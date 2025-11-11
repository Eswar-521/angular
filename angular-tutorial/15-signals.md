# Signals in Angular

Signals provide fine‑grained reactivity with `signal`, `computed`, and `effect`.

```ts
import { signal, computed, effect } from '@angular/core';
const first = signal('Ada');
const last = signal('Lovelace');
const full = computed(() => `${first()} ${last()}`);
effect(() => console.log(full()));
```
**Expected output:** Console prints full name whenever either part changes without zone-based change detection.
