# Error Handling & Logging

Define a global error handler and integrate remote logging.

```ts
import { ErrorHandler, Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  handleError(err: any){ /* send to Sentry */ console.error(err); }
}
```
**Expected output:** Unhandled errors are captured and reported; user gets a friendly fallback.
