# HTTP with HttpClient

Register HttpClient and use interceptors for auth/logging.

```ts
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([
      (req, next) => {
        // Example: attach header
        const authReq = req.clone({ setHeaders: { 'X-App': 'demo' } });
        return next(authReq);
      }
    ]))
  ]
});

// usage in a service
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class Api {
  constructor(private http: HttpClient){}
  list(){ return this.http.get('/api/items'); }
}
```
**Expected output:** Outgoing requests carry custom headers; responses are typed and interceptors centralize cross-cutting concerns.
