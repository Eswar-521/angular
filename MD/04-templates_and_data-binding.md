
# Templates and Data Binding  

---

## 1. What is a Template in Angular?

A **template** is the **HTML part** of a component. 

- It decides **what the user sees on the screen**.
- It can contain 
  - plain HTML (div, h1, p, etc.)
  - Angular features (interpolation `{{ }}`, directives like `*ngIf`, `*ngFor`)
  - bindings (`[ ]`, `( )`, `[( )]`)

Every component you created in the Product App has a template file like 

- `app.component.html`
- `landing-home.component.html`
- `products.component.html`
- `product-lookup.component.html`
- `not-found.component.html`



## 2. Template Example – `AppComponent`

### 2.1 TypeScript class

```ts
// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  appName = 'Angular Product Routing Demo';
}
```

**2.2 Template**

<!-- src/app/app.component.html -->
```js
<header class="app-header">
  <h1>{{ appName }}</h1>

  <nav>
    <a routerLink="/">Home</a> |
    <a routerLink="/all_products">All Products</a> |
    <a routerLink="/all_product_catgories">All Categories</a>
  </nav>
</header>

<hr />

<main class="app-content">
  <!-- Routed pages will appear here -->
  <router-outlet></router-outlet>
</main>
```

**What this template does**

- `{{ appName }}` = shows the component’s appName value.

- `<a routerLink="...">` = navigation links to other routes.

- `<router-outlet>` = placeholder where the current page (component) is injected based on URL.


## 3. What is Data Binding?

- Data Binding is the way Angular connects TypeScript code (component class)
with the template (HTML).

There are 4 main types

- Interpolation – `{{ }}` – TS → HTML text

- Property Binding – `[property]="expression"` – TS → HTML property

- Event Binding – `(event)="handler()"` – HTML event → TS method

- Two-way Binding – `[(ngModel)]="property"` – HTML ↔ TS (both directions)

Our Product App already uses `Interpolation` and `Property Binding` a lot,
and we can easily add `Event Binding` and `Two-way Binding`.

4. Interpolation `({{ }})`

- `Interpolation` is used to display values from the component class in the template:

```js
{{ someProperty }}
```

Angular replaces `{{ someProperty }}` with the value from the class.

**Example From `App.component`**

```js
// app.component.ts
export class AppComponent {
  appName = 'Angular Product Routing Demo';
}
```

```js
<!-- app.component.html -->
<h1>{{ appName }}</h1>
```

The page shows
```js
Angular Product Routing Dem
```

## Property Binding ([ ]) 

- `Property Binding` sets a `DOM property` using a value from the component:

```js
<img [src]="product.image" [alt]="product.product_name" />
```

Here `src` and `alt` are not hard-coded strings;
Angular takes values from the component `product object`.


## Product card image & alt

// src/app/pages/product-card/product-card.component.ts

```js
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: Product;
}
```


<!-- product-card.component.html -->
```js
<div class="product-card">
  <img [src]="product.image" [alt]="product.product_name" />

  <h3>{{ product.product_name }}</h3>
  <p>Category: {{ product.product_category }}</p>
  <p>Unit Price: ${{ product.unit_price }}</p>

  <a [routerLink]="['/product_lookup', product.product_id]">
    View Product
  </a>
</div>
```

**Where property binding is used**

- `[src]="product.image"` → `src` attribute of <img> is set from TS property.

- `[alt]="product.product_name"` → sets the `alt` text from TS property.

- `[routerLink]="['/product_lookup', product.product_id]"` → builds the URL from the product id.


## Structural Directives + Data Binding (*ngFor, *ngIf)

- Detailed theory of directives comes in `Directives` chapter,
- but here we show how they work `together with data binding` in templates.

## *ngFor in ProductsComponent template

// src/app/pages/products/products.component.ts

```js
import { Component } from '@angular/core';
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
export class ProductsComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {
    this.products = this.productService.getAll();
  }

  trackById(index: number, product: Product): number {
    return product.product_id;
  }
}
```
<!-- products.component.html -->
```js
<h2>All Products</h2>

<div class="product-grid">
  <div
    class="product-card"
    *ngFor="let p of products; trackBy: trackById"
  >
    <img [src]="p.image" [alt]="p.product_name" />
    <h3>{{ p.product_name }}</h3>
    <p>Category: {{ p.product_category }}</p>
    <p>Unit Price: ${{ p.unit_price }}</p>

    <a [routerLink]="['/product_lookup', p.product_id]">
      View Product
    </a>
  </div>
</div>

```

**What’s bound here?**

- `*ngFor="let p of products; trackBy: trackById"`

- products comes from the component TS.

- For each product p, Angular creates a new <div class="product-card">.

Inside each card

`{{ p.product_name }}` (interpolation)

- `[src]="p.image"` (property binding)

- `[routerLink]="['/product_lookup', p.product_id]"` (property binding with array)


## `*ngIf` in Product Lookup

- Already seen above – Angular shows either “Product Not Found” block
`or` “Product Details” block based on notFound and product values.

```js
<div *ngIf="notFound" class="nf">
  <!-- Not found message -->
</div>

<div *ngIf="!notFound && product" class="detail-card">
  <!-- Product details -->
</div>
```

Data binding side

- notFound and product are TS properties updated in the component.

- Template reacts to these values and shows/hides parts accordingly.

## Event Binding (( )) 

- `Event Binding` listens for events from the template (like clicks)
and calls a method in the component class:

```js
<button (click)="doSomething()">Click me</button>
```

- The (click) event is bound to doSomething() method in TS.

## Two-way Binding ([(ngModel)]) – Example Search Box

- This requires `FormsModule.` This is a slightly advanced example we can add on top of your existing project.

**Update ProductsComponent for search**

```js
// products.component.ts (with searchTerm and FormsModule)
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Product[] = [];
  searchTerm = '';

  constructor(private productService: ProductService) {
    this.products = this.productService.getAll();
  }

  get filteredProducts(): Product[] {
    const term = this.searchTerm.toLowerCase();
    return this.products.filter(p =>
      p.product_name.toLowerCase().includes(term)
    );
  }
}
```

## Template with [(ngModel)]

```js
<!-- products.component.html (with two-way binding search box) -->

<h2>All Products</h2>

<input
  type="text"
  placeholder="Search by product name..."
  [(ngModel)]="searchTerm"
/>

<div class="product-grid">
  <div
    class="product-card"
    *ngFor="let p of filteredProducts"
  >
    <img [src]="p.image" [alt]="p.product_name" />
    <h3>{{ p.product_name }}</h3>
    <p>Category: {{ p.product_category }}</p>
    <p>Unit Price: ${{ p.unit_price }}</p>

    <a [routerLink]="['/product_lookup', p.product_id]">
      View Product
    </a>
  </div>
</div>
```

## What’s happening:

- [(ngModel)]="searchTerm" → `two-way binding`

- typing in the input updates searchTerm in TS.

- updating searchTerm in TS (if needed) updates the input.

- filteredProducts uses searchTerm to filter products.

- As you type, the list of products updates live.

