# State Management

Start with local **signals**/**RxJS**; scale to **NgRx** or signal stores.

```ts
// Minimal signal store
import { signal, computed } from '@angular/core';
export class CounterStore {
  #count = signal(0);
  readonly count = computed(() => this.#count());
  inc() { this.#count.update(v => v + 1); }
}
```
**Expected output:** Encapsulated state with readonly selector; UI binds to `store.count()`.
