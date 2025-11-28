# Services & Dependency Injection in Angular  


## 1. What is a Service?

- A **Service** is a TypeScript class where we keep **reusable logic / data** that we want to share across multiple components.
- In our ProductApp, this is mainly:
  - Product list data  
  - Lookup by ID  
  - Category list  
  - Products by category  

## 2. What is Dependency Injection (DI)?

- **Dependency** = something your class needs to work  
  - Example: `ProductsComponent` **needs** `ProductService`
  - Example: `ProductLookupComponent` **needs** `ProductService` + `ActivatedRoute`
- **Dependency Injection** = Angular **creates these dependencies** and **gives (injects)** them to your class.
- You do **not** write `new ProductService()` inside components.
- Instead you write:

```ts
constructor(private ps: ProductService) {}
```

## 3. Why Services & DI in our ProductApp?

**We don’t want to copy-paste product data logic in**

 - HomeComponent

 - ProductsComponent

 - ProductLookupComponent

 - AllCategoriesComponent

 - CategoryProductsComponent

- We want `one central place` for

 - Reading product list

 - Finding by id

 - Getting categories

Filter by category
  - That central place is `ProductService`.

- DI helps us

 - Use the same `ProductService` instance across many components

 - Keep components focused on `UI + page logic`


## Our Product Model (Shape of Data)

```js
// File: src/app/models/product.model.ts
export interface Product {
  product_id: number;
  product_category: string;
  product_name: string;
  unit_price: number;
  image: string;
}
```

**Expected output**

- We get a `strong type` for product objects.

- Any file that uses `Product` knows it must have `product_id`, `product_category`, etc.



## Our Main Service – ProductService


`// File: src/app/services/product.service.ts`

```js
import { Injectable } from "@angular/core";
import { PRODUCTS } from "../data/products.data";
import { Product } from "../models/product.model";

@Injectable({ providedIn: "root" })
export class ProductService {
  // Return all products
  getAll(): Product[] {
    return PRODUCTS;
  }

  // Return single product by ID
  getById(id: number): Product | undefined {
    return PRODUCTS.find((p) => p.product_id === id);
  }

  // Unique list of categories
  getAllCategories(): string[] {
    return [...new Set(PRODUCTS.map((p) => p.product_category))];
  }

  // Products in a given category (case-insensitive)
  getByCategory(category: string): Product[] {
    const c = category.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) => p.product_category.toLowerCase() === c
    );
  }
}
```

**What is happening here?**

- `@Injectable({ providedIn: 'root' })`

 - Registers the service with Angular’s root injector

 - Only one shared instance of ProductService for the whole app

- Methods

- `getAll()` → All product records from `PRODUCTS`

- `getById(id)` → One product or undefined

- `getAllCategories()` → Unique category names

- `getByCategory(category)` → Filter list


**We can Expected Output**

- Whenever any component asks for `ProductService`, Angular gives `the same instance`, with all these helper methods


## DI – Showing All Products ProductsComponent

**Component TypeScript**

`// File: src/app/pages/products/products.component.ts`

```js
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./products.component.html",
})
export class ProductsComponent {
  products: Product[] = [];

  // 👉 Dependency Injection happens here
  constructor(private ps: ProductService) {
    // Using the injected service
    this.products = this.ps.getAll();
  }

  trackById(_: number, p: Product) {
    return p.product_id;
  }
}
```

**Component Template**

`// File: src/app/pages/products/products.component.ts`

```js
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./products.component.html",
})
export class ProductsComponent {
  products: Product[] = [];

  // 👉 Dependency Injection happens here
  constructor(private ps: ProductService) {
    // Using the injected service
    this.products = this.ps.getAll();
  }

  trackById(_: number, p: Product) {
    return p.product_id;
  }
}
```

## Code Explanation How DI is Working Here 

- Angular sees `constructor(private ps: ProductService)`.

- Because `ProductService` is `providedIn: 'root'`, Angular creates it (if not already created).

- `ps` now holds that injected service instance.

- The component calls `this.ps.getAll()` to fill `products`.

- The template loops over `products` and shows cards.

## We can Expected output 

- Visiting route `/all_products` (see routes file) renders

 - A grid of product cards with name, category, price, and “View Product” link for each product.

### Service & DI our project context 

**What is a Service?**
- A reusable, non-UI class for data and business logic.
- In our app `ProductService` reading from `PRODUCTS` and exposing helper methods.

**What is DI?**
- Angular’s system to `create` and `provide` those services and other dependencies like `ActivatedRoute` to components.

**Why in ProductApp?**

- No duplicate logic

- One central product source

- Easy maintenance and extension (e.g. replace PRODUCTS with HTTP API later)

