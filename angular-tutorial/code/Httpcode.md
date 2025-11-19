

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
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class Api {
  constructor(private http: HttpClient){}

  list() {
    return this.http.get('/api/items');
  }
}

```

### ➜ `import { bootstrapApplication } from '@angular/platform-browser';`
Used to start the Angular application in standalone mode.

### ➜ `import { provideHttpClient, withInterceptors } from '@angular/common/http';`
Imports HttpClient provider and interceptor utilities.

### ➜ `bootstrapApplication(AppComponent, { providers: [...] })`
Bootstraps the root component and registers global providers.

---

### ➜ `provideHttpClient(withInterceptors([...]))`
Enables HttpClient globally and adds interceptors.

### ➜ `(req, next) => { ... }`
Defines an interceptor function.

### ➜ `req.clone({ setHeaders: { 'X-App': 'demo' } })`
Clones the request and adds a custom header (`X-App: demo`).

### ➜ `return next(authReq);`
Forwards the modified request to the next handler.

---

### ➜ `import { HttpClient } from '@angular/common/http';`
Imports the HttpClient service for making HTTP calls.

### ➜ `@Injectable({ providedIn: 'root' })`
Marks Api class as an injectable service available throughout the app.

### ➜ `constructor(private http: HttpClient){}`
Injects HttpClient into the service.

### ➜ `list() { return this.http.get('/api/items'); }`
Makes a GET request to `/api/items`.  
Returns an Observable containing API response data.

---

### ⭐ Expected Behavior:
- All outgoing requests contain the header: `X-App: demo`
- Api service can call backend safely
- All logic is centralized via HttpClient + interceptors
