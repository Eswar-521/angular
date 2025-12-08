
# Reactive Forms in Angular

In Angular we have **two main ways** to build forms:

- **Template Driven Forms** – form structure mostly in HTML (`ngForm`, `ngModel`)
- **Reactive Forms** – form structure created in **TypeScript** (`FormGroup`, `FormControl`, `FormBuilder`)

In this tutorial we focus on **Reactive Forms**, using an example from **our Product project**:

> A **Product Lookup (Reactive)** page where the user enters  
> **Product ID** and **Quantity**, and we navigate to:
>
> ```text
> /product_lookup/<id>/<qty>
> ```


## 1. What is a Reactive Form?

**Reactive Form** in Angular means:

- The form is created and managed in **TypeScript**, not only in HTML.
- We use classes like:
  - `FormGroup` – a group of controls (the whole form)
  - `FormControl` – a single form field
  - `FormBuilder` – helper to build forms
- Validation is normally configured in **TypeScript** using `Validators`.
- The HTML template binds to the form using:
  - `[formGroup]` on `<form>`
  - `formControlName` on `<input>`

**Key idea:**

> The **form is a TypeScript model**, and the template is just a **view** of that model.

---

## 2. Why Reactive Forms?

Reactive forms are useful when:

- You need **more control** over form logic.
- You want **complex validation** (cross-field validation, dynamic validation).
- You want to **test** form logic easily (everything is in TypeScript).
- You prefer a **more explicit and predictable** way of working with forms.

In our Product app we use a **reactive form** to:

- Let the user enter `productId` and `quantity`.
- Validate them in TypeScript.
- If valid, navigate to `/product_lookup/:id/:qty`.

---

## 3. Our Reactive Form Example – LookupReactiveComponent

We will create a new **page component**:

- **File name:** `src/app/pages/lookup-reactive/lookup-reactive.component.ts`
- **Purpose:**  
  A page that contains a **reactive form** for product lookup.

We keep this file in the `pages` folder because it is a **route-level page** (like products, categories, etc.).

---

## 4. Component TypeScript  Building the Reactive Form

### 4.1 Component File

**File:** `src/app/pages/lookup-reactive/lookup-reactive.component.ts`

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lookup-reactive',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lookup-reactive.component.html',
  styleUrls: ['./lookup-reactive.component.css'],
})
export class LookupReactiveComponent {
  // 1) Declare the FormGroup
  lookupForm: FormGroup;

  // 2) Inject FormBuilder and Router using DI
  constructor(private fb: FormBuilder, private router: Router) {
    // 3) Build the form structure (controls + validators)
    this.lookupForm = this.fb.group({
      productId: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(25),
        ],
      ],
      quantity: [
        1,
        [
          Validators.required,
          Validators.min(1),
        ],
      ],
    });
  }

  // Convenience getters for template
  get productId() {
    return this.lookupForm.get('productId');
  }

  get quantity() {
    return this.lookupForm.get('quantity');
  }

  // 4) Method called when the form is submitted
  onSubmit(): void {
    if (this.lookupForm.invalid) {
      // Mark all fields so error messages are visible
      this.lookupForm.markAllAsTouched();
      return;
    }

    const id = Number(this.productId?.value);
    const qty = Number(this.quantity?.value);

    if (!id || !qty || qty <= 0) {
      return;
    }

    // Use the existing route in our project:
    // /product_lookup/:id/:qty  -> handled by ProductLookupComponent
    this.router.navigate(['/product_lookup', id, qty]);
  }
}
```

## Why we wrote this code in this file?

- This is a `page component` file, so it lives in `src/app/pages/lookup-reactive/`.

- It is responsible for

 - Defining the `form structure` (FormGroup) in TypeScript.

 - Handling `form` submission (onSubmit()).

 - Using the `router` to navigate to our existing product lookup route.

- The HTML template for this component is kept separately in `lookup-reactive.component.html`.


## 5 Template HTML – Binding to the Reactive Form

**Template File**

`File: src/app/pages/lookup-reactive/lookup-reactive.component.html`
```js
<h2>Reactive Product Lookup</h2>

<p>
  This page uses a <strong>Reactive Form</strong> to capture Product ID and Quantity.
  When the form is valid and submitted, we navigate to:
  <code>/product_lookup/&lt;id&gt;/&lt;qty&gt;</code>.
</p>

<form [formGroup]="lookupForm" (ngSubmit)="onSubmit()" class="lookup-form">
  <!-- Product ID -->
  <div class="form-group">
    <label for="productId">Product ID</label>

    <input
      id="productId"
      type="number"
      formControlName="productId"
      placeholder="Enter product ID (1 - 25)"
    />

    <small class="error" *ngIf="productId?.invalid && productId?.touched">
      <!-- Different error messages based on which validator failed -->
      <span *ngIf="productId?.errors?.['required']">
        Product ID is required.
      </span>
      <span *ngIf="productId?.errors?.['min'] || productId?.errors?.['max']">
        Product ID must be between 1 and 25.
      </span>
    </small>
  </div>

  <!-- Quantity -->
  <div class="form-group">
    <label for="quantity">Quantity</label>

    <input
      id="quantity"
      type="number"
      formControlName="quantity"
      placeholder="Enter quantity (>= 1)"
    />

    <small class="error" *ngIf="quantity?.invalid && quantity?.touched">
      <span *ngIf="quantity?.errors?.['required']">
        Quantity is required.
      </span>
      <span *ngIf="quantity?.errors?.['min']">
        Quantity must be at least 1.
      </span>
    </small>
  </div>

  <!-- Submit -->
  <button type="submit" [disabled]="lookupForm.invalid">
    Lookup Product (Reactive)
  </button>
</form>

<!-- Optional debug view -->
<p class="debug">
  Form valid? {{ lookupForm.valid }}<br />
  Value: {{ lookupForm.value | json }}
</p>
```

**Why we wrote this code in this file?**

- This file contains only `HTML + Angular template syntax`.

- It binds to the `lookupForm` defined in `lookup-reactive.component.ts` using

  - `[formGroup]="lookupForm"`

  - `formControlName="productId"` and `formControlName="quantity"`

This separation keeps

- **logic in TypeScript TS file**

- **view in HTML template file**

## 6 Using Reactive Forms Module

Reactive forms require ReactiveFormsModule.

Because we are using a standalone component, we import ReactiveFormsModule directly in the component metadata (imports), not in a separate module.


`// File: src/app/pages/lookup-reactive/lookup-reactive.component.ts`

```js
@Component({
  ...
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  ...
})
export class LookupReactiveComponent { ... }
```

## 7 Connecting Reactive Form Page to Routing

- To actually use this page in our app, we can add a route and an optional link in the `navbar`.

**7.1 Route Configuration**

`File: src/app/app.routes.ts`

```js
import { Routes } from '@angular/router';
import { LandingHomeComponent } from './pages/landing-home/landing-home.component';
import { AllCategoriesComponent } from './pages/all-categories/all-categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { ProductLookupComponent } from './pages/product-lookup/product-lookup.component';
import { LookupReactiveComponent } from './pages/lookup-reactive/lookup-reactive.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: LandingHomeComponent },
  { path: 'all_product_catgories', component: AllCategoriesComponent },
  { path: 'all_products', component: ProductsComponent },
  { path: 'all_product_catgory/:category', component: CategoryProductsComponent },

  // existing lookups
  { path: 'product_lookup/:id', component: ProductLookupComponent },
  { path: 'product_lookup/:id/:qty', component: ProductLookupComponent },

  // NEW: reactive lookup page
  { path: 'reactive-lookup', component: LookupReactiveComponent },

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
```
**Why we updated this file?**

- `app.routes.ts` is the `central place` where all URLs are defined.

- To open our reactive form page using a URL, we must:

 - Import `LookupReactiveComponent`.

 - Add a route: `{ path: 'reactive-lookup', component: LookupReactiveComponent }`.
 
```js
http://localhost:4000/reactive-lookup
```

- Angular will show our `LookupReactiveComponent` which uses a `Reactive Form`.

