
# 16 State Management (NgRx)

## 1️⃣ What is State?

**State means the data that your application currently holds.**

Examples of state:

- Logged-in user  
- List of students / products  
- Selected student / selected product  
- Form inputs  
- Cart items (in e-commerce)  
- Theme (dark / light)

Whenever this data changes → the **UI should update**.  
This process is called **State Management**.

---

## 2️⃣ Why Do We Need State Management?

Because in any real app:

- Components need to **share data**
- Data needs to be **updated and shown everywhere**
- UI must **react** whenever the data changes
- We don’t want to **duplicate** the same data in many components

Good state management gives:

- Cleaner code  
- Fewer bugs  
- Easier debugging  
- Faster development  

---

## 3️⃣ State in Angular – Three Levels

Angular commonly uses three levels of state:

### 3.1 Local State (inside a single component)

Data lives only in one component.

Example from our **Products page**:

**File:** `src/app/pages/products/products.component.ts`

```ts
products: Product[] = [];
loading = false;
errorMessage = '';
```


- `products`, `loading`, `errorMessage` are local state.

- Only `ProductsComponent` knows about them.

- Template reads them and shows the UI.


## 3.1 Shared State with Services (Our Project Style)

A `service` holds the data and logic.
Multiple components inject the same service and share that state.

This is exactly what our `Product App` does.

**File**: `src/app/services/product.service.ts`

```js
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { PRODUCTS_DATA } from '../data/products.data';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Shared state: all products
  private products: Product[] = PRODUCTS_DATA;

  // Expose state as Observables (RxJS)
  getAll$(): Observable<Product[]> {
    return of(this.products).pipe(delay(500));
  }

  getById$(id: number): Observable<Product | undefined> {
    return this.getAll$().pipe(
      map(list => list.find(p => p.product_id === id))
    );
  }

  getByCategory$(category: string): Observable<Product[]> {
    const cat = category.toLowerCase();
    return this.getAll$().pipe(
      map(list => list.filter(p =>
        p.product_category.toLowerCase() === cat
      ))
    );
  }
}
```


- `products` array is **shared state** (single source of truth).

- Any component can use **ProductService** to read that state.


### 3.3 Global State Libraries (NgRx, Signals Store, Akita)

For `very large apps`, services can become hard to manage:

- Many components

- Many different types of data

- Complex business rules

Then we use a `global state store` like `NgRx`.

**NgRx** is a library that manages application-wide state using:

- `a single store`

- `actions`

- `reducers`

- `selectors`
**built on top of RxJS.**

Our current product app is small, so we `don’t need NgRx` yet,
but we will understand the concepts using our existing service code.


## 4️⃣ Our Product App – How State Is Managed Today
**4.1 Data Definition (Shape of the State)**

**File**: `src/app/models/product.model.ts`
```js
export interface Product {
  product_id: number;
  product_category: string;
  product_name: string;
  unit_price: number;
}
```

This interface defines the `state shape` for one product.

**File: src/app/data/products.data.ts**

```js
import { Product } from '../models/product.model';

export const PRODUCTS_DATA: Product[] = [
  { product_id: 1, product_category: 'FROZEN', product_name: 'Ice Cream', unit_price: 2.5 },
  { product_id: 2, product_category: 'FROZEN', product_name: 'Green Peas', unit_price: 2 },
  // ...
  { product_id: 25, product_category: 'Home Goods', product_name: 'Batteries', unit_price: 1.5 }
];
```

This file is our `initial state` (like a seed for the store).

**4.2 Service as a Mini Store**

As we saw earlier, `ProductService`

- Holds **all products** in memory (private products)

- Exposes **read operations** as Observables

  - `getAll$()`

  - `getById$(id)`

  - `getByCategory$(category)`

We can think of this service as a simple store:

- `products` = state

- `getAll$()` = `selector` (returns the whole state)

- `getById$()` / `getByCategory$()` = filtered selectors

For this tutorial we are not adding “add / update / delete” methods,
but if we did, they would be our `state update methods` (similar to NgRx reducers).


## 4. Components Reading Shared State

**4.1 ProductsComponent – Reads the product list**

**File**: `src/app/pages/products/products.component.ts`

```js
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

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

  private productsSub?: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loading = true;
    this.productsSub = this.productService.getAll$().subscribe({
      next: (data) => {
        this.products = data;   // local state populated from shared state
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load products.';
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.productsSub?.unsubscribe();
  }
}
```

- **Shared state**: comes from `ProductService`.

- **Local state**: `products`, `loading`, `errorMessage` in this component.

- When shared state changes (if service later updates),
we would get new values via the Observable, and the UI updates.

## 4.2 ProductLookupComponent – Reads one product + quantity

**File**: `src/app/pages/product-lookup/product-lookup.component.ts`

```js
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

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

    this.lookupSub = this.productService.getById$(id).subscribe({
      next: (found) => {
        if (!found) {
          this.router.navigateByUrl('/not-found');
          return;
        }

        this.product = found;   // local state from shared state

        if (this.qty != null) {
          this.totalPrice = this.qty * this.product.unit_price;
        }
      },
      error: () => {
        this.router.navigateByUrl('/not-found');
      }
    });
  }

  ngOnDestroy(): void {
    this.lookupSub?.unsubscribe();
  }
}
```

- `ProductLookupComponent` does not own product data.

- It reads shared state through `ProductService.getById$(id)`.

- Only local details (`qty`, `totalPrice`, `notFound`) live in this component.

## 5️⃣ Where NgRx Fits (Conceptual, No Extra Files)

Right now:

- `ProductService` = store for products

- Components = ask service for data and display it

In a **large application**, we could move this logic into `NgRx Store`:

- products slice in the global store

- loadProducts, loadProductById actions

- reducers to update store when data arrives

- selectors: `selectAllProducts`, `selectProductById`


## 6️⃣ State Management in Our Product App

- State = data like `products`, `selected product`, `qty`, `totalPrice`.

- We manage state at two levels:

  - Component state (each page’s own small data).

  - Shared service state (ProductService holding product list).

- Components `do not duplicate data`; they read from one shared source.

- RxJS Observables connect the `service state` to the `component templates`.

- For bigger apps, this pattern can grow into `NgRx store`,
but the core ideas `single source of truth`, `observables`, `selectors` are already present here.