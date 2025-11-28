# 19 Interceptors

##  What is an Interceptor?

An **Interceptor** is a special Angular service that sits **between your application and the backend API**.

Think of it like a **security guard** or **middleware** that checks every HTTP request and response.

Whenever your app makes an HTTP call:

- Request → passes through interceptor → goes to server  
- Response → passes through interceptor → goes to app  

---

##  Why Do We Use Interceptors?

Interceptors are mainly used for:

###  1. Adding Authentication Tokens
Add JWT token to every API request automatically.

###  2. Logging Requests
Print every API request and its response for debugging.

###  3. Error Handling
Show global messages (snackbar, popup) if API errors occur.

###  4. Modifying Requests
Add headers like:
- Authorization
- Content-Type

### ✔ 5. Retrying Failed Requests
Retry API call if network fails.

---

##  One-Line Definition

> **An Interceptor allows you to modify or check all HTTP requests and responses in one single place.**

---

#  Small Interceptor Code Example (Beginner Friendly)

### 📌 Create an Interceptor

**logging.interceptor.ts**

```ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("📤 Request sent:", req.url);

    return next.handle(req).pipe(
      tap(event => {
        console.log("📥 Response received:", event);
      })
    );
  }
}
```
## In project 

Add it in main.ts since you are using Standalone Components
```js
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoggingInterceptor } from './logging.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([ (req, next) => new LoggingInterceptor().intercept(req, next) ])
    )
  ]
});
```

-  Now every request your app makes will pass through the interceptor.