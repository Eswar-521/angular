# 13 Lifecycle Hooks

#  Angular Lifecycle Hooks

Angular components go through different stages from creation → update → destruction.  
At each stage, Angular triggers special methods called **Lifecycle Hooks**.

These hooks allow you to run code at exactly the right moment in a component’s life.

---

## ⭐ Why Lifecycle Hooks?

Lifecycle hooks help you:
- Run code when component loads
- Detect when data changes
- Access the DOM after view loads
- Clean up before component is removed
- Initialize values and call services

In our **Product App**, we use lifecycle hooks to:

- Load products when a page is opened (`ngOnInit`)
- Clean up HTTP subscriptions when user leaves the page (`ngOnDestroy`)
- Observe changes to `@Input()` product data in a child card (`ngOnChanges`)
- Run code after the view is ready (`ngAfterViewInit`)

---

## 1. Main Lifecycle Hooks Overview

The most commonly used hooks are:

- `ngOnInit` – runs **once** after the first `ngOnChanges`, when the component is initialized.
- `ngOnDestroy` – runs right **before the component is destroyed**.
- `ngOnChanges` – runs **whenever an `@Input()` property changes**.
- `ngAfterViewInit` – runs **after the component’s view (and child views) are fully initialized**.

You enable a hook by:

1. Implementing the corresponding interface (e.g. `OnInit`).
2. Adding the method with the same name (e.g. `ngOnInit()`).

---

## 2. `ngOnInit` – Initialization Hook

### 2.1 What is `ngOnInit`?

> `ngOnInit` is called **once** after Angular has created the component and set all input properties.  
> It is the best place to **initialize data** and **call services**.

We use `ngOnInit` in our product pages to **load data** from services when the page opens.

---

### 2.2 Example 1 – Load All Products (ProductsComponent)

**File:** `src/app/pages/products/products.component.ts`  

We update this component to implement `OnInit` and load products inside `ngOnInit()`.

```ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  // Service injected via DI
  constructor(private productService: ProductService) {}

  // Lifecycle hook: called once when the component is initialized
  ngOnInit(): void {
    // Good place to load data
    this.products = this.productService.getAll();
  }
}
```

**Why did we write this code in this file?**

- `products.component.ts` is the page for `/all_products`.

- This page must show all `25 products` as soon as it loads.

- Using `ngOnInit()`:

 - Keeps the constructor “clean” (only for DI).

 - Makes it clear that data loading happens when the component initializes.


### 2.3 Load Category Products CategoryProductsComponent

**File** : `src/app/pages/category-products/category-products.component.ts`

```js
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css'],
})
export class CategoryProductsComponent implements OnInit {
  category = '';
  products: Product[] = [];
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  // Lifecycle hook: run when the component is ready
  ngOnInit(): void {
    const catParam = this.route.snapshot.paramMap.get('category');

    if (!catParam) {
      this.notFound = true;
      return;
    }

    this.category = catParam;

    const list = this.productService.getByCategory(catParam);
    if (!list || list.length === 0) {
      this.notFound = true;
      return;
    }

    this.products = list;
  }
}
```

**Why here?**

- This page is used by route: `/all_product_catgory/:category`.

- When the page loads, we must:

 - Read the URL param

 - Fetch products from the service

- `ngOnInit()` is the natural place to do this `one-time initialization logic`.


## 3. ngOnDestroy Cleanup Hook

### 3.1 What is ngOnDestroy?

`ngOnDestroy` is called **just before** Angular destroys the component instance.
It is the right place to **clean up** unsubscribe from Observables, remove event listeners, clear intervals, etc.

In our app, we `use ngOnDestroy` in the HTTP-based products page to unsubscribe from the HTTP Observable.

### 3.2 Example – Cleanup Subscription (ProductsHttpComponent)

We improve our HTTP example to use OnInit + OnDestroy.

`File: src/app/pages/products-http/products-http.component.ts`

```js
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ProductHttpService } from '../../services/product-http.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products-http',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-http.component.html',
  styleUrls: ['./products-http.component.css'],
})
export class ProductsHttpComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  loading = false;
  errorMessage = '';

  // Keep reference to subscription for cleanup
  private productsSub?: Subscription;

  constructor(private productHttpService: ProductHttpService) {}

  // ngOnInit: start loading data when component is initialized
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productsSub = this.productHttpService.getAll().subscribe({
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

  // ngOnDestroy: called right before this component is removed
  ngOnDestroy(): void {
    // Prevent memory leaks by unsubscribing
    if (this.productsSub) {
      this.productsSub.unsubscribe();
    }
  }
}
```

**Why did we write this here?**

- products-http.component.ts is responsible for `calling the HTTP service` and `subscribing`.

- The component must stop listening when user navigates away.

- `ngOnDestroy()` is the best place to unsubscribe and free resources.

## 4. ngOnChanges – Input Changes Hook

**4.1 What is ngOnChanges?**

`ngOnChanges` runs `every time` an `@Input()` property changes.
It gives you a `SimpleChanges` object that tells you the `previous` and `current` values.

We use this in child components that display data received from a parent, for example a `Product Card`.

### 4.2 Example – Product Card Component @Input + ngOnChanges

We create a simple child component to show a single product card and log when the input changes.

**File**: `src/app/components/product-card/product-card.component.ts`
```js
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnChanges {
  @Input() product!: Product;

  // Lifecycle hook: called whenever @Input() product changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      const prev = changes['product'].previousValue;
      const curr = changes['product'].currentValue;
      console.log('Product changed in ProductCardComponent:', {
        previous: prev,
        current: curr,
      });
    }
  }
}
```

**Where do we use this component?**

For example, in `ProductsComponent`

**File**: `src/app/pages/products/products.component.html`
```js
<h2>All Products</h2>

<div class="product-grid">
  <app-product-card
    *ngFor="let p of products"
    [product]="p">
  </app-product-card>
</div>
```

**Why `ngOnChanges` here?**

- `ProductCardComponent` gets a product from its parent.

- Whenever the parent’s product list changes (filter, sort, new data), the card’s `@Input()` changes.

- `ngOnChanges()` lets us react to that change:

 - For logging

 - For recalculating derived values

 - For updating UI state based on new input

## 5. `ngAfterViewInit` – View Initialization Hook

### 5.1 What is ngAfterViewInit?

`ngAfterViewInit` runs after Angular has fully initialized the component’s view and all child views.
It is a good place to:

- **Access** `@ViewChild` elements

- **Work with DOM APIs or third-party UI libraries**

- **Start animations**

### 5.2 Example – Landing Home Component Logs After View Ready

We add `ngAfterViewInit` to log when the home page has finished rendering.

**File**: `src/app/pages/landing-home/landing-home.component.ts`

```js
import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.css'],
})
export class LandingHomeComponent implements AfterViewInit {
  appTitle = 'Angular Product Routing Demo';

  // Lifecycle hook: called after the view and child views are initialized
  ngAfterViewInit(): void {
    console.log('LandingHomeComponent view initialized');
    // In real apps, you might focus an input, start a carousel, etc.
  }
}
```

**Why here?**

- landing-home.component.ts represents the **home page** (/ route).

- We might need to

 - Focus a search box

 - Initialize a slider or chart

- These actions require the `DOM to be ready`, so ngAfterViewInit() is the correct hook.


### Here where the Hooks we used in our project 

`ngOnInit`

- `src/app/pages/products/products.component.ts`

→ Loads all products when /all_products page opens.

- `src/app/pages/category-products/category-products.component.ts`

→ Reads URL :category and loads filtered products.

`ngOnDestroy`

- `src/app/pages/products-http/products-http.component.ts`

→ Unsubscribes from HTTP products subscription to avoid memory leaks.

`ngOnChanges`

- `src/app/components/product-card/product-card.component.ts`
→ Reacts to changes in @Input() product from parent component.

`ngAfterViewInit`

- `src/app/pages/landing-home/landing-home.component.ts`

→ Runs code after the home page view is fully rendered.