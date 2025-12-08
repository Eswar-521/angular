# 14 Rxjs Basics

##  What is RxJS?

**RxJS (Reactive Extensions for JavaScript) is a library that helps Angular work with data that arrives in the future, like API calls, user clicks, timers, and streams.**

In simple words:

> **RxJS helps Angular wait for data and react to it automatically.**

---

##  Why Do We Need RxJS?

Angular apps deal with many operations that don't complete immediately:

- API calls  
- User inputs  
- Button clicks  
- Loading data  
- Timer-based actions  

These are **asynchronous**, so Angular uses RxJS to handle them properly.

---

## Core Idea of RxJS (Very Simple)

### Observable  
A source of future data (API response, event, value).

### Subscribe  
Your code that “listens” for the data when it arrives.

### Operators  
Functions that transform the data (like `map`, `filter`, etc.).

---

##  Definition 

> **RxJS lets Angular work smoothly with data that arrives over time by using Observables and Subscriptions.**

---

## RxJS in Our Product App (Product Lookup Project)

In this Angular tutorial, we use RxJS with our **Product App** (shopping cart / product lookup).

We will see RxJS in three main files:

1. `src/app/services/product.service.ts`  
2. `src/app/pages/products/products.component.ts`  
3. `src/app/pages/product-lookup/product-lookup.component.ts`  

---

## 1️⃣ ProductService – Returning Observables Instead of Plain Arrays

### File: `src/app/services/product.service.ts`

We already have in-memory data in:

- `src/app/data/products.data.ts`
- `src/app/models/product.model.ts`

Now we use RxJS to **wrap that data in Observables**.

```ts
// File: src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { PRODUCTS_DATA } from '../data/products.data';

// 🔹 RxJS imports
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // In-memory data from products.data.ts
  private products: Product[] = PRODUCTS_DATA;

  // -----------------
  // RxJS Style Methods
  // -----------------

  // Get ALL products as an Observable
  getAll$(): Observable<Product[]> {
    // of(...) creates an Observable from a value
    // delay(...) simulates API call time
    return of(this.products).pipe(
      delay(500)         // fake 0.5 second network delay
    );
  }

  // Get ONE product by ID as an Observable
  getById$(id: number): Observable<Product | undefined> {
    return this.getAll$().pipe(
      // map is an RxJS operator that transforms the stream
      map(list => list.find(p => p.product_id === id))
    );
  }

  // Get products by category as an Observable
  getByCategory$(category: string): Observable<Product[]> {
    const cat = category.toLowerCase();

    return this.getAll$().pipe(
      map(list =>
        list.filter(p => p.product_category.toLowerCase() === cat)
      )
    );
  }
}
```

## What is happening here?

- `of(this.products)` → **Observable<Product[]>** (stream of product arrays).

- `.pipe(delay(500))` → waits 500ms before emitting → simulates an API.

- `.pipe(map(...))` → transforms the emitted value (array → single product, or filtered array).

**Service rule**
- Service returns Observables, components subscribe.

## 2️⃣ ProductsComponent – Subscribing to getAll$()

The Products page (/all_products) now listens to the Observable from the service.

**File**: `src/app/pages/products/products.component.ts`

```js
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

// RxJS Subscription type
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  loading = false;
  errorMessage = '';

  // Keep subscription to clean up later
  private productsSub?: Subscription;

  constructor(private productService: ProductService) {}

  // Component created → Start loading products
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    // 🔹 Subscribe to Observable<Product[]>
    this.productsSub = this.productService.getAll$().subscribe({
      next: (data) => {
        this.products = data;   // received product list
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products with RxJS', err);
        this.errorMessage = 'Failed to load products.';
        this.loading = false;
      },
      complete: () => {
        console.log('Products stream completed.');
      }
    });
  }

  // Component removed → Clean up subscription
  ngOnDestroy(): void {
    if (this.productsSub) {
      this.productsSub.unsubscribe();
    }
  }
}
```

**Key RxJS points in this component**

- We call `getAll$()` (note the $ suffix = Observable).

- We use `.subscribe({ next, error, complete })`.

- We store the `Subscription` and call `.unsubscribe()` in `ngOnDestroy()`.

This is a classic pattern

**Observable from service** → `subscribe in component` → `unsubscribe on destroy`.


## 3️⃣ Product Lookup Page – Using RxJS With Route Parameters

When user opens URLs like:

- `/product_lookup/25`

- `/product_lookup/23/5`

we want to

- Read `id` (and `qty` if present) from the URL.

- Call `getById$(id)` from the service.

Show product details and total price.

`File: src/app/pages/product-lookup/product-lookup.component.ts`

```js
// File: src/app/pages/product-lookup/product-lookup.component.ts
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

// RxJS
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-lookup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-lookup.component.html',
  styleUrls: ['./product-lookup.component.css'],
})
export class ProductLookupComponent implements OnDestroy {
  product?: Product;
  qty?: number;
  totalPrice?: number;
  notFound = false;

  private lookupSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    // Read URL params once using snapshot
    const idParam = this.route.snapshot.paramMap.get('id');
    const qtyParam = this.route.snapshot.paramMap.get('qty');

    const id = idParam ? Number(idParam) : NaN;
    const qty = qtyParam ? Number(qtyParam) : undefined;

    if (Number.isNaN(id)) {
      this.notFound = true;
      return;
    }

    if (qtyParam !== null) {
      if (!qty || qty <= 0) {
        this.notFound = true;
        return;
      }
      this.qty = qty;
    }

    // 🔹 Subscribe to Observable<Product | undefined>
    this.lookupSub = this.productService.getById$(id).subscribe({
      next: (found) => {
        if (!found) {
          this.router.navigateByUrl('/not-found');
          return;
        }

        this.product = found;

        if (this.qty != null) {
          this.totalPrice = this.qty * this.product.unit_price;
        }
      },
      error: (err) => {
        console.error('Error in product lookup (RxJS)', err);
        this.router.navigateByUrl('/not-found');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.lookupSub) {
      this.lookupSub.unsubscribe();
    }
  }
}
```

### What RxJS is doing in this file?

- `getById$(id)` returns Observable<Product | undefined>.

- We `subscribe` to receive the product.

- We handle missing product by routing to `/not-found`.

- We again unsubscribe in `ngOnDestroy()`.

### 4️⃣ Quick Recap For Notes

- Service `(product.service.ts)`

 - Uses RxJS (`of, delay, map`)

 - Returns Observable<Product[]> and Observable<Product>.

**ProductsComponent**

- Subscribes to `getAll$()`

- Handles `next`, `error`, `complete`

- Unsubscribes in `ngOnDestroy()`.

**ProductLookupComponent**

 - Reads URL params

 - Subscribes to `getById$(id)`

 - Calculates `totalPrice`

 - Unsubscribes in `ngOnDestroy`

