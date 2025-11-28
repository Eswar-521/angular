

# Angular Material Tutorial (Using Our Product App)

## 1. What is Angular Material?

**Angular Material** is a UI component library built by the Angular team.  
It gives ready-made, professional looking components like:

- Toolbar, buttons, icons
- Cards, lists, tables
- Form fields, inputs, selects, dialogs, snackbars, etc.

All components follow **Google’s Material Design** guidelines: spacing, colors, typography, accessibility, responsiveness.

---

## 2. Why use Angular Material?

Angular Material helps us:

- Build **beautiful UI faster** – no need to design every button or card.
- Keep **consistent design** across the app.
- Get **built-in accessibility** (keyboard, ARIA).
- Work perfectly with **Angular, DI, Routing, Forms, HttpClient**.

In our **Product Routing** app, Material fits very well:

- Top navigation bar (`mat-toolbar`) for Home / Products / Categories.
- Product list as nice cards (`mat-card`).
- Product Lookup form using Material form fields (`mat-form-field`, `mat-input`, Material button).

---

## 3. Where do we use Angular Material in our project?

We will use Angular Material in these files:

1. **Global configuration**  
   - File: `src/app/app.config.ts`  
   - Enable **animations** for Material components.

2. **Root Shell (Layout + Navbar)**  
   - File: `src/app/app.component.ts`  
   - File: `src/app/app.component.html`  
   - Use `mat-toolbar` + `mat-button` for the top navigation.

3. **Products Page (All Products)**  
   - File: `src/app/pages/products/products.component.ts`  
   - File: `src/app/pages/products/products.component.html`  
   - Show products in `mat-card` grid.

4. **Reactive Lookup Page**  
   - File: `src/app/pages/lookup-reactive/lookup-reactive.component.ts`  
   - File: `src/app/pages/lookup-reactive/lookup-reactive.component.html`  
   - Use `mat-form-field`, `matInput`, `mat-raised-button` for the reactive form.

---

## 4. Step 1 – Install Angular Material

In the project root (where `package.json` is):

```bash
ng add @angular/material
```

This command will

- Install `@angular/material` and `@angular/cdk`.

- Ask theme / typography / animations questions.

- Automatically configure some things (like global styles).

## 5 step 2 Enable Animations in app.config.ts

Angular Material components (like dialogs, buttons ripples, etc.) use Angular animations.

Because we are using `bootstrapApplication` with standalone components, we enable animations in `app.config.ts`.

`File: src/app/app.config.ts`

```js
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// 👇 Import animations provider for Angular Material
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // 👇 Enable Angular animations (needed by Angular Material)
    provideAnimations()
  ]
};
```

**Why here?**

- `app.config.ts` already configures `router` and `HttpClient`.

- Material components need animations to be fully functional.

- Adding `provideAnimations()` here enables animations for the entire app.


## 6 Step 3 – Using Angular Material in AppComponent (Toolbar & Nav)

We convert our plain header into a Material toolbar with Material buttons.

**6.1 Root Component TypeScript**

`File: src/app/app.component.ts`

```js
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

// Angular Material modules for layout + nav
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  appName = 'Angular Product Routing Demo';
}
```

**Why did we write this here?**

- `app.component.ts` is the root shell of the app – perfect place for a global toolbar.

- We import `MatToolbarModule` and `MatButtonModule` in this component because:

  - We use <mat-toolbar> and `mat-button` only in this component’s template.

  - We are using standalone components, so we add Material modules to the `imports` array of the component.



### Root Component Template

**File**: `src/app/app.component.html`

```js
<mat-toolbar color="primary" class="app-toolbar">
  <span>{{ appName }}</span>

  <!-- Push nav links to the right -->
  <span class="spacer"></span>

  <a mat-button routerLink="/">Home</a>
  <a mat-button routerLink="/all_products">All Products</a>
  <a mat-button routerLink="/all_product_catgories">All Categories</a>
  <a mat-button routerLink="/reactive-lookup">Reactive Lookup</a>
  <a mat-button routerLink="/http-products">HTTP Products</a>
</mat-toolbar>

<main class="app-content">
  <router-outlet></router-outlet>
</main>
```

You can add a simple CSS rule in `app.component.css`
```js
.app-toolbar .spacer {
  flex: 1 1 auto;
}

.app-content {
  padding: 16px;
}
```

## 7 Step 4 – Using Angular Material in Products Page (Cards)

Now we display each product inside a **Material Card**.

**7.1 ProductsComponent TypeScript**

`File: src/app/pages/products/products.component.ts`

(We extend our existing ProductsComponent to use Material.)

```js
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Load all 25 products
    this.products = this.productService.getAll();
  }
}
```

**Why did we add Material modules here?**

- `MatCardModule` because we will use `<mat-card>`.

- `MatButtonModule` for Material buttons inside each card.

- This keeps Material usage local to this page component.


## 8. Step 5 – Using Angular Material in Reactive Lookup Form

We now style our Reactive Form page using Material form controls.

### 8.1 LookupReactiveComponent TypeScript

**File**: `src/app/pages/lookup-reactive/lookup-info.component.ts`
(Updated to include Angular Material modules.)
```js
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lookup-reactive',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './lookup-reactive.component.html',
  styleUrls: ['./lookup-reactive.component.css'],
})
export class LookupReactiveComponent {
  lookupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.lookupForm = this.fb.group({
      productId: [
        '',
        [Validators.required, Validators.min(1), Validators.max(25)],
      ],
      quantity: [
        1,
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  get productId() {
    return this.lookupForm.get('productId');
  }

  get quantity() {
    return this.lookupForm.get('quantity');
  }

  onSubmit(): void {
    if (this.lookupForm.invalid) {
      this.lookupForm.markAllAsTouched();
      return;
    }

    const id = Number(this.productId?.value);
    const qty = Number(this.quantity?.value);

    if (!id || !qty || qty <= 0) {
      return;
    }

    this.router.navigate(['/product_lookup', id, qty]);
  }
}
```

**Why Material modules here?**

- `MatFormFieldModule` → `<mat-form-field>`

- `MatInputModule` → `matInput` on `<input>`

- `MatButtonModule` → Material button for submit



## 9 Where did we use it in our Product app?

**Global config**: `app.config.ts` – `provideAnimations()` for Material animations.

**Layout & Nav:** `app.component.ts` / `app.component.html` – `mat-toolbar`, `mat-button`.

**Product list**: `products.component.ts` / `.html` – `mat-card`, `Material buttons`.

**Reactive form**: `lookup-reactive.component.ts` / `.html` – `mat-form-field`, `matInput`, `mat-raised-button`.


## 9 How do we use it (steps)?

Install: 
```js
ng add @angular/material
```

- Enable animations in app.config.ts with provideAnimations().

- Import Material modules into the standalone components that need them.

- Use Material tags in templates:

  - `<mat-toolbar>`, `<button mat-button>`, `<mat-card>`, `<mat-form-field>`, `<input matInput>`…

- Style slightly with CSS for grid / spacing.