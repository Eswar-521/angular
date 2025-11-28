

# Angular Directives 

## 1. What is a Directive?

### Simple Definition

An Angular **Directive** is a special instruction that you put on an HTML element  
to **change how it looks or behaves**.

You can think of a directive like a **“power-up”** for plain HTML:

- It can **show or hide** elements.
- It can **repeat** elements for each item in a list.
- It can **change styles or classes**.
- It can **add behavior** (like navigation, hover effects, etc.).

In our **Product Routing App**, you are already using directives like:

- `*ngFor` – to loop over products
- `*ngIf` – to show or hide blocks
- `routerLink` – to turn `<a>` tags into Angular navigation links

---

## 2. Types of Directives

In Angular there are mainly **two** directive types you will use daily:

1. **Structural Directives**  
   - They **change the structure** of the DOM (add/remove elements).  
   - Always start with `*` (like `*ngIf`, `*ngFor`).

2. **Attribute Directives**  
   - They **change the appearance or behavior** of an element.  
   - Examples: `routerLink`, `ngClass`, `ngStyle`.

> Components are also technically directives with a template,  
> but in this chapter we focus on **`*ngIf`, `*ngFor`, `routerLink`, etc.**

---

## 3. Structural Directive: `*ngFor`

### What is `*ngFor`?

`*ngFor` is a structural directive that **repeats an element**  
for every item in a collection (array).

> In our project, we use `*ngFor` to loop through the **products list**  
> and create one card per product.

### 3.1 Example from `ProductsComponent`

#### TypeScript

```ts
// src/app/pages/products/products.component.ts
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
### Here we can expected the 

- The `products` array is filled with all 25 products using `ProductService`.

- `trackById` provides a stable identity for each product

**Template**

<!-- src/app/pages/products/products.component.html -->
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
## From this code we can excepted the 

- For each product in `products`, Angular creates a `<div class="product-card">`.

- You see 25 cards, one for each product (Ice Cream, Green Peas, Corn, …).

- Each card shows product name, category, price, and a “View Product” link.



**How *ngFor works**

- Angular finds `*ngFor="let p of products"` on the `<div>`.

- It looks at the array products from the component.

- For each item in products, it

- Creates a new <div> element.

- Sets p to that product object inside the template.

- The `trackBy:` `trackById` helps Angular track items by their `product_id`,
so if data changes, Angular updates efficiently instead of re-creating everything


## Structural Directive: *ngIf

**What is *ngIf?**

- `*ngIf` is a structural directive that `adds or removes` an element
from the DOM depending on a `condition (true/false)`.

In our project, `*ngIf` is used in the ProductLookupComponent
to decide whether to show “Product Not Found” or actual product details.


## Here we have Example `ProductLookupComponent`

```js
// src/app/pages/product-lookup/product-lookup.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-lookup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-lookup.component.html',
  styleUrls: ['./product-lookup.component.css'],
})
export class ProductLookupComponent {
  product?: Product;
  qty?: number;
  totalPrice?: number;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
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

    const found = this.productService.getById(id);
    if (!found) {
      this.notFound = true;
      return;
    }

    this.product = found;

    if (qtyParam !== null) {
      if (Number.isNaN(qty!) || qty! <= 0) {
        this.notFound = true;
        return;
      }
      this.qty = qty!;
      this.totalPrice = this.qty * this.product.unit_price;
    }
  }
}
```

## Here we Expected like 

- If ID is invalid or product not found → notFound = true.

- If valid product (and optional valid qty) → product and totalPrice are set.

- Template will use notFound, product, qty, totalPrice to decide what to show.

