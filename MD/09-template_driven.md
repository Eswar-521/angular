
# Template Driven Forms in Angular

In Angular we have **two ways** to build forms:

- **Template Driven Forms** – form structure, validation and bindings are written mainly in the **HTML template** using directives like `ngForm` and `ngModel`.
- **Reactive Forms** – form structure is created in **TypeScript** using `FormGroup`, `FormControl`, etc.

In this chapter we focus only on **Template Driven Forms**, using an example from **our Product project**:  
a **Product Lookup form** that lets the user enter **Product ID** and **Quantity**, and then navigates to:

```js
/product_lookup/<id>/<qty>
```

## What is a Template Driven Form?

- A `Template Driven` Form is an Angular form where:

- The form is defined in the HTML template using:

```js
<form #myForm="ngForm">
```

- `[(ngModel)]` for two-way binding

- Validation attributes like `required`, `min`, `maxlength`

- Angular automatically creates a NgForm object behind the scenes.

- Each field gets form state:

  - valid, invalid, touched, dirty, pristine, etc.

- We usually use this style for simple forms, because:

  - Less TypeScript code

  - Easy to see the form structure directly in the HTML

In our project we use a template driven form on the `Lookup Info` page

## Enabling Template Driven Forms in Our Project

- To use template driven forms we must import `FormsModule` into the component that owns the form.

- Because we use `standalone components`, we import FormsModule directly in the component.

## Component File

`File: src/app/pages/lookup-info/lookup-info.component.ts`

```js
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lookup-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lookup-info.component.html',
  styleUrls: ['./lookup-info.component.css'],
})
export class LookupInfoComponent {
  // Model object used by the template form
  model = {
    productId: '',
    quantity: 1,
  };

  constructor(private router: Router) {}

  // This method is called when the form is submitted
  onLookup(form: NgForm) {
    if (form.invalid) {
      // Mark all controls so that validation messages are shown
      form.form.markAllAsTouched();
      return;
    }

    const id = Number(this.model.productId);
    const qty = Number(this.model.quantity);

    // Extra safety check
    if (!id || !qty || qty <= 0) {
      return;
    }

    // Use our existing route: /product_lookup/:id/:qty
    this.router.navigate(['/product_lookup', id, qty]);
  }
}
```

## Key points

- `imports: [CommonModule, FormsModule]`
   FormsModule is required for `ngForm` and `ngModel`.

- `model` holds the form data.

- `onLookup(form: NgForm)` receives the template form object.

- If the form is valid, we navigate to `/product_lookup/:id/:qty`,
which is defined in `app.routes.ts`.



## Template File

`File: src/app/pages/lookup-info/lookup-info.component.html`

```js
<h2>Product Lookup (Template Driven Form)</h2>
<p>
  Enter a <strong>Product ID</strong> and <strong>Quantity</strong>. On submit we will navigate to:<br />
  <code>/product_lookup/&lt;id&gt;/&lt;qty&gt;</code>
</p>

<form
  #lookupForm="ngForm"
  (ngSubmit)="onLookup(lookupForm)"
  novalidate
  class="lookup-form"
>
  <!-- Product ID field -->
  <div class="form-group">
    <label for="productId">Product ID</label>

    <input
      id="productId"
      name="productId"
      type="number"
      required
      min="1"
      max="25"
      [(ngModel)]="model.productId"
      #productIdCtrl="ngModel"
    />

    <!-- Validation message for Product ID -->
    <small class="error" *ngIf="productIdCtrl.invalid && productIdCtrl.touched">
      Product ID is required and must be between 1 and 25.
    </small>
  </div>

  <!-- Quantity field -->
  <div class="form-group">
    <label for="quantity">Quantity</label>

    <input
      id="quantity"
      name="quantity"
      type="number"
      required
      min="1"
      [(ngModel)]="model.quantity"
      #qtyCtrl="ngModel"
    />

    <!-- Validation message for Quantity -->
    <small class="error" *ngIf="qtyCtrl.invalid && qtyCtrl.touched">
      Quantity is required and must be at least 1.
    </small>
  </div>

  <!-- Submit button -->
  <button type="submit" [disabled]="lookupForm.invalid">
    Lookup Product
  </button>
</form>

<!-- Optional: debug section to understand template driven forms -->
<p class="debug">
  Form valid? {{ lookupForm.valid }} |
  ProductId: {{ model.productId }} |
  Quantity: {{ model.quantity }}
</p>
```

## Important Template Driven Concepts in Our Example

- `ngForm` – **Template Form Object**

From the template:

```js
<form #lookupForm="ngForm" (ngSubmit)="onLookup(lookupForm)" novalidate>
```

- `#lookupForm="ngForm"`
Creates a `template reference variable` that points to a NgForm instance.

- We can access like in 

  - lookupForm.valid

  - lookupForm.invalid

  - lookupForm.value

- `(ngSubmit) ="onLookup(lookupForm)"`
Calls the `onLookup()` method in the component when the form is submitted.

- `novalidate`
  - Disables default browser validation popups so we can show our own messages.

**[(ngModel)] – Two-Way Binding**

Example: Product ID field
```js
<input
  id="productId"
  name="productId"
  type="number"
  required
  min="1"
  max="25"
  [(ngModel)]="model.productId"
  #productIdCtrl="ngModel"
/>
```

 `name="productId"`
  - Required so Angular can register this control inside the form.

- [(ngModel)]="model.productId"
  - Connects the input with model.productId in the component:

 - Changes in the input update the model.

  - Changes in the model update the input.

`#productIdCtrl="ngModel"`

Template variable for this control.
We can check:

- `productIdCtrl.valid`

- `productIdCtrl.invalid`

- `productIdCtrl.touched`

- `productIdCtrl.dirty`

## Validation in Template Driven Forms

We use `HTML attributes + control state`

```js
<input
  name="productId"
  required
  min="1"
  max="25"
  [(ngModel)]="model.productId"
  #productIdCtrl="ngModel"
/>
```
```js
<small *ngIf="productIdCtrl.invalid && productIdCtrl.touched">
  Product ID is required and must be between 1 and 25.
</small>

```

- `required`, `min`, `max` → built-in validators.

- `productIdCtrl.invalid` → `true` when any validation fails.

- `productIdCtrl.touched` → `true` after the user enters and leaves the field.

Quantity validation is similar:
```js
<input
  name="quantity"
  type="number"
  required
  min="1"
  [(ngModel)]="model.quantity"
  #qtyCtrl="ngModel"
/>

<small *ngIf="qtyCtrl.invalid && qtyCtrl.touched">
  Quantity is required and must be at least 1.
</small>
```

## Disabling Submit When Form is Invalid

```js
<button type="submit" [disabled]="lookupForm.invalid">
  Lookup Product
</button>

```

- `lookupForm.invalid` is `true` if any field fails validation.

- The user cannot submit until all required fields are valid.


## Using `NgForm` in TypeScript

From the component 
```js
onLookup(form: NgForm) {
  if (form.invalid) {
    form.form.markAllAsTouched();
    return;
  }

  const id = Number(this.model.productId);
  const qty = Number(this.model.quantity);

  if (!id || !qty || qty <= 0) {
    return;
  }

  this.router.navigate(['/product_lookup', id, qty]);
}
```

- `form.invalid` → same as `lookupForm.invalid` in the template.

- `markAllAsTouched()` → forces all validation messages to show.

- On success, we use the router to navigate to:

`// File: src/app/app.routes.ts`

```js
{ path: 'product_lookup/:id/:qty', component: ProductLookupComponent }
```


## How This Fits in the Whole Project

- The `Template Driven` Form lives in:

 - `src/app/pages/lookup-info/lookup-info.component.ts`

 - `src/app/pages/lookup-info/lookup-info.component.html`

- It uses the existing dynamic routing:

 - Route file: `src/app/app.routes.ts`

 - Route: `/product_lookup/:id/:qty`

 - Component: `src/app/pages/product-lookup/product-lookup.component.ts`

So this single page connects `Forms + Routing + Services`

- User fills the template driven form.

- Angular validates using template rules.

- If valid, we navigate to `/product_lookup/id/qty`.

- `ProductLookupComponent` uses `ProductService` to show product and total price.