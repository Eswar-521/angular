# 12 Httpclient

## What is HttpClient? 

**HttpClient is an Angular service used to make HTTP calls (GET, POST, PUT, DELETE) to a backend server or API.**

It allows Angular apps to communicate with REST APIs —
send requests, receive responses, and handle data over HTTP.

HttpClient supports:
- GET – fetch data
- POST – send new data
- PUT – update existing data
- DELETE – remove data
- Interceptors
- Error handling
- Observables (RxJS)

**To use it, Angular provides**
```js
provideHttpClient()
```

## Why HttpClient is important?

- Talks to backend API

- Loads data from server

- Sends form data

- Updates DB

- Deletes records

- Handles response & errors

- Works with Observables (async streams)


## HttpClient Flow (Simple Explanation)
```js
Component → Service → API → Response → Component → UI updates.
```

In realworld:

- Component does not call API directly

- Component calls service

- Service uses HttpClient

- Service returns Observable

- Component subscribes and updates UI


### In web applications, we often need to **get data from a server** or **send data to a server**.  

- This communication happens over **HTTP**.

Examples of HTTP usage:

- When you open `https://example.com/products`, your browser sends an **HTTP GET request** and the server returns **HTML or JSON**.
- When you submit a form, the browser may send an **HTTP POST request** with data to the server.

In a **SPA (Single Page Application)** like our Angular app, we don’t reload the whole page, but we still use **HTTP requests** in the background to:

- Get product lists
- Get a single product
- Save an order, etc.

---

## 2. What is HttpClient in Angular?

In Angular, we do **not** use `fetch()` directly everywhere.

Instead, Angular gives us a built-in service called **`HttpClient`**.

> **HttpClient** is an Angular service (class) that makes it easy to send HTTP requests and receive HTTP responses.

Key points:

- Provided by `@angular/common/http`
- Supports methods: `get`, `post`, `put`, `delete`, etc.
- Returns **Observables** (`Observable<T>`)
- Works very well with Angular’s DI (Dependency Injection) and RxJS

We normally use HttpClient **inside services**, not directly inside components.


## 3. Why do we need HttpClient in our Product App?

Until now, our `ProductService` used **in-memory data**:

- Data file: `src/app/data/products.data.ts`
- Service: `src/app/services/product.service.ts`

This is great for learning, but in a real app:

- Products would usually come from a **backend API** or at least from a **JSON file** on the server.

So in this tutorial we will:

1. Put our 25 products into a JSON file:  
   `assets/products.json`
2. Create a new service:  
   `ProductHttpService` → uses `HttpClient` to fetch that JSON.
3. Create a new page component:  
   `ProductsHttpComponent` → shows products loaded over HTTP.
4. Configure HttpClient in `app.config.ts` using `provideHttpClient`.

This will show **where HTTP is used** and **how it is used** in our project.

---

## 4. Product JSON File (Server-like Data Source)

### 4.1 JSON File with Products

**File:** `src/app/data/products.data.json`

We move the same data from our table into a JSON array.

```json
[
  { "product_id": 1, "product_category": "FROZEN", "product_name": "Ice Cream", "unit_price": 2.5, "image": "assets/images/icecream.png" },
  { "product_id": 2, "product_category": "FROZEN", "product_name": "Green Peas", "unit_price": 2, "image": "assets/images/peas.png" },
  { "product_id": 3, "product_category": "FROZEN", "product_name": "Corn", "unit_price": 2, "image": "assets/images/corn.png" },
  { "product_id": 4, "product_category": "FROZEN", "product_name": "Meat", "unit_price": 5, "image": "assets/images/meat.png" },
  { "product_id": 5, "product_category": "FROZEN", "product_name": "Pizza", "unit_price": 4, "image": "assets/images/pizza.png" },

  { "product_id": 6, "product_category": "OFFICE SUPPLIES", "product_name": "Paper", "unit_price": 5, "image": "assets/images/paper.png" },
  { "product_id": 7, "product_category": "OFFICE SUPPLIES", "product_name": "Pens", "unit_price": 4, "image": "assets/images/pens.png" },
  { "product_id": 8, "product_category": "OFFICE SUPPLIES", "product_name": "Ink", "unit_price": 5, "image": "assets/images/ink.png" },
  { "product_id": 9, "product_category": "OFFICE SUPPLIES", "product_name": "Chair", "unit_price": 100, "image": "assets/images/chair.png" },
  { "product_id": 10, "product_category": "OFFICE SUPPLIES", "product_name": "Folder", "unit_price": 2, "image": "assets/images/folder.png" },

  { "product_id": 11, "product_category": "Kitchen", "product_name": "Plates", "unit_price": 3, "image": "assets/images/plates.png" },
  { "product_id": 12, "product_category": "Kitchen", "product_name": "Bowls", "unit_price": 3, "image": "assets/images/bowls.png" },
  { "product_id": 13, "product_category": "Kitchen", "product_name": "Spoon", "unit_price": 1, "image": "assets/images/spoon.png" },
  { "product_id": 14, "product_category": "Kitchen", "product_name": "Fork", "unit_price": 1, "image": "assets/images/fork.png" },
  { "product_id": 15, "product_category": "Kitchen", "product_name": "Napkins", "unit_price": 4, "image": "assets/images/napkins.png" },

  { "product_id": 16, "product_category": "FRUITS", "product_name": "Apple", "unit_price": 2, "image": "assets/images/apple.png" },
  { "product_id": 17, "product_category": "FRUITS", "product_name": "Banana", "unit_price": 1, "image": "assets/images/banana.png" },
  { "product_id": 18, "product_category": "FRUITS", "product_name": "Pear", "unit_price": 2, "image": "assets/images/pear.png" },
  { "product_id": 19, "product_category": "FRUITS", "product_name": "Grapes", "unit_price": 3, "image": "assets/images/grapes.png" },
  { "product_id": 20, "product_category": "FRUITS", "product_name": "Watermelon", "unit_price": 5, "image": "assets/images/watermelon.png" },

  { "product_id": 21, "product_category": "Home Goods", "product_name": "Bulbs", "unit_price": 3, "image": "assets/images/bulbs.png" },
  { "product_id": 22, "product_category": "Home Goods", "product_name": "Cleaning Liquid", "unit_price": 4, "image": "assets/images/cleaning-liquid.png" },
  { "product_id": 23, "product_category": "Home Goods", "product_name": "Wipes", "unit_price": 3, "image": "assets/images/wipes.png" },
  { "product_id": 24, "product_category": "Home Goods", "product_name": "Air Freshner", "unit_price": 3.5, "image": "assets/images/air-freshner.png" },
  { "product_id": 25, "product_category": "Home Goods", "product_name": "Batteries", "unit_price": 1.5, "image": "assets/images/batteries.png" }
]
```

## Enabling HttpClient in the App (Global Config)
**5.1 App Config File**

`File: src/app/app.config.ts`

We add provideHttpClient() so that HttpClient is available everywhere.

```js
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

**Why here?**

- `app.config.ts` is the central place where we already configured `provideRouter(routes)`.

- Adding `provideHttpClient()` tells Angular:

   - “This application uses HttpClient. Please set up the HTTP system and make `HttpClient` injectable in services / components.”


## Product HTTP Service – Using HttpClient

We will create a `new service` that loads products over HTTP:

**File name**: `src/app/services/product-http.service.ts`

- This service will call `assets/products.json` using `HttpClient`.

6.1 Service File

**File**: `src/app/services/product-http.service.ts`

```js
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {
  private productsUrl = 'assets/products.json';

  constructor(private http: HttpClient) {}

  // Get all products from JSON via HTTP GET
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  // Get single product by ID
  getById(id: number): Observable<Product | undefined> {
    return this.getAll().pipe(
      map((list) => list.find(p => p.product_id === id))
    );
  }

  // Get all categories (unique)
  getAllCategories(): Observable<string[]> {
    return this.getAll().pipe(
      map((list) => [...new Set(list.map(p => p.product_category))].sort())
    );
  }

  // Get products by category
  getByCategory(category: string): Observable<Product[]> {
    const cat = category.toLowerCase();
    return this.getAll().pipe(
      map((list) =>
        list.filter(p => p.product_category.toLowerCase() === cat)
      )
    );
  }
}
```

## Why we wrote this code in this file?

- services/product-http.service.ts is the correct place for `HTTP-based logic`

 - Components stay UI-focused.

 - All HTTP logic is inside this service.

- `@Injectable({ providedIn: 'root' })`

 - Angular creates one instance of this service and shares it across the app.

- `HttpClient` is injected via DI into the service constructor


## 7. Component that Uses HTTP Service – ProductsHttpComponent

Now we create a page that displays all products fetched via HTTP.

- **File name**: `src/app/pages/products-http/products-http.component.ts`

- **Template file**: `src/app/pages/products-http/products-http.component.html`

**7.1 Component TypeScript**

**File**: `src/app/pages/products-http/products-http.component.ts`
```js
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHttpService } from '../../services/product-http.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products-http',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-http.component.html',
  styleUrls: ['./products-http.component.css'],
})
export class ProductsHttpComponent {
  products: Product[] = [];
  loading = false;
  errorMessage = '';

  constructor(private productHttpService: ProductHttpService) {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productHttpService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products via HTTP', err);
        this.errorMessage = 'Failed to load products. Please try again later.';
        this.loading = false;
      },
    });
  }
}
```
**Why we wrote this code in this file?**

- This is a page-level component for the route /http-products (we will configure route next).

- It

 - **Injects** `ProductHttpService` via DI.

 - Calls `getAll()` to fetch data from `src/app/data/products.json`.

 - Handles loading state and error state.

- It does not know how HTTP works internally. That is handled by the service.


## 8 Adding Route for HTTP Products Page

We want a URL to open this page, e.g.

`http://localhost:4000/http-products`

**8.1 Route Configuration**

**File**: `src/app/app.routes.ts`

```js
import { Routes } from '@angular/router';
import { LandingHomeComponent } from './pages/landing-home/landing-home.component';
import { AllCategoriesComponent } from './pages/all-categories/all-categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { ProductLookupComponent } from './pages/product-lookup/product-lookup.component';
import { LookupReactiveComponent } from './pages/lookup-reactive/lookup-reactive.component';
import { ProductsHttpComponent } from './pages/products-http/products-http.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: LandingHomeComponent },
  { path: 'all_product_catgories', component: AllCategoriesComponent },
  { path: 'all_products', component: ProductsComponent },
  { path: 'all_product_catgory/:category', component: CategoryProductsComponent },

  { path: 'product_lookup/:id', component: ProductLookupComponent },
  { path: 'product_lookup/:id/:qty', component: ProductLookupComponent },

  { path: 'reactive-lookup', component: LookupReactiveComponent },

  // NEW: HTTP Products page
  { path: 'http-products', component: ProductsHttpComponent },

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];
```

**Why we updated this file?**

- app.routes.ts is the central routing configuration.

- To make /http-products work, we:

 - imported ProductsHttpComponent.

 - added `{ path: 'http-products', component: ProductsHttpComponent }`.


 ## 9. Adding a Link in the Navbar (Optional but Helpful)
**9.1 Root Component Template**

**File**: `src/app/app.component.html`
```js
<header class="app-header">
  <h1>{{ appName }}</h1>

  <nav>
    <a routerLink="/">Home</a> |
    <a routerLink="/all_products">All Products</a> |
    <a routerLink="/all_product_catgories">All Categories</a> |
    <a routerLink="/reactive-lookup">Reactive Lookup</a> |
    <a routerLink="/http-products">HTTP Products</a>
  </nav>
</header>

<hr />

<main class="app-content">
  <router-outlet></router-outlet>
</main>
```

- This makes it easy to open the `HTTP-based products page` from anywhere.


## Finally Where did we use it in our peoject ?

**Configuration**

 - `src/app/app.config.ts` → `provideHttpClient()`

**Service**

- `src/app/services/product-http.service.ts` → `ProductHttpService` uses `HttpClient to call assets/products.json`.

**Component**

- `src/app/pages/products-http/products-http.component.ts`
subscribes to `ProductHttpService.getAll()` and displays data in
`products-http.component.html.`



