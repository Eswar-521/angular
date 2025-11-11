# RxJS Fundamentals

Observables and operators underpin HttpClient, Router, and more.

```ts
import { of, map, filter } from 'rxjs';
of(1,2,3).pipe(
  map(x => x * 2),
  filter(x => x > 2)
).subscribe(console.log);
```
**Expected output:** Logs 4 and 6; demonstrates transformation + filtering.
