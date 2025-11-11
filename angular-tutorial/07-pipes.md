# Pipes

Use built-in pipes and create pure custom pipes for performance.

```ts
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'exclaim', standalone: true, pure: true })
export class ExclaimPipe implements PipeTransform {
  transform(v: string, times = 1){ return v + '!'.repeat(times); }
}
```
**Expected output:** `{{ 'hi' | exclaim:3 }}` renders `hi!!!`; pure pipes only re-run when inputs change.
