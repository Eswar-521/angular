# HTTP with HttpClient 

## 1. What Is HttpClient?

Angular provides a built-in service called **HttpClient** to make HTTP calls to a backend API.

It supports:
- GET → fetch data
- POST → create data
- PUT/PATCH → update data
- DELETE → remove data

HttpClient returns **Observables**, which allow asynchronous operations and let Angular handle change detection efficiently.

---

## 2. How HttpClient Works in Angular?

To use HttpClient in a standalone Angular app, you must register it globally using:

```ts
provideHttpClient()
```

- This enables HttpClient throughout the app with no need for NgModule.


## 3. What Are HTTP Interceptors?

- Interceptors are functions that run before every HTTP request and before every response.

You can use interceptors to:

- Attach auth tokens

- Add headers

- Log requests

- Handle errors

- Modify responses

Interceptors centralize common logic so you don’t repeat it in every service.


Example interceptor tasks:

- Add Authorization headers

- Add custom app headers

- Retry failed requests

- Redirect on 401 errors

## 4. Using HttpClient in a Service

- Services are ideal for organizing HTTP logic.
Typical service responsibilities:

- Fetch data from API

- Send form data

- CRUD operations

- Handle API errors

- Expose methods to components


```js
list(){ return this.http.get('/api/items'); }
```

## 5. . Expected Behavior

- HttpClient is registered globally using provideHttpClient

- An interceptor adds custom headers to every outgoing request

- Api service uses HttpClient to make a GET request

- Responses are strongly typed

- The app has a single place to manage auth/logging logic


