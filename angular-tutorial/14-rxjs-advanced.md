# RxJS Advanced

Correctly choose higher‑order mapping and manage teardown.

```ts
import { Subject, switchMap, takeUntil } from 'rxjs';
const destroy$ = new Subject<void>();
search$.pipe(
  switchMap(q => api.search(q)),
  takeUntil(destroy$)
).subscribe();
```
**Expected output:** Cancels previous search on new query; unsubscribes on destroy to avoid leaks.
