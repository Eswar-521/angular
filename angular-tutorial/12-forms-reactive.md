# Forms: Reactive

Build robust forms with `FormGroup` and custom controls.

```ts
import { FormGroup, FormControl, Validators } from '@angular/forms';

form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  tags: new FormControl<string[]>([])
});
```
**Expected output:** Errors available via control.errors; use async validators for server checks.
