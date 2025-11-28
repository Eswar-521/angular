

# Angular Components

## 1. What is a Component in Angular?

### Definition

A **Component** in Angular is a **reusable UI block** that controls a part of the screen.

Every component has:

1. A **TypeScript class** → _logic and data 
2. A **HTML template** → _what the user see
3. Optional **CSS styles** → _how it look
4. A **`@Component` decorator** → _tells Angular how to connect all this

You can think of a Component like:

> “One small screen or widget inside your app”  
> Example: Home page, Product list, Product card, 404 page, etc.

### How Components are used in Angular

- **AppComponent** – root component, main shell of the app  
- **Page components** – used for different routes (Home, Products, Categories…)  
- **Reusable components** – small pieces like a product card used many times  

In our **Product Routing App**, each page (Home, All Products, Product Lookup, 404) is a separate component.

---

## 2. Root Component – `AppComponent`

This is the **main / root** component of the entire Angular app.  
Angular puts this inside `<app-root>` in `index.html`.

### 2.1 `app.component.ts`

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

**What is happening here?**

- `@Component({...})` → tells Angular this class is a Component.

- `selector: 'app-root'` → in HTML we can use `<app-root></app-root>`.

- `standalone: true` → this component does not need an NgModule (new style).

- `imports: [RouterOutlet, RouterLink]` → this component’s template can use:

- `<router-outlet>` – where routed pages will appear

- `routerLink` – for navigation links

- appName → a property on the class, used in the HTML template.


**`app.component.html`**

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
  <!-- Routed pages will be rendered here -->
  <router-outlet></router-outlet>
</main>
```

**What is happening here?**

- `{{ appName }}` → shows the `appName` value from `AppComponent` class.

- `routerLink="/"` → clicking “Home” loads the component mapped to /.

- `<router-outlet>` → Angular injects the current page component here based on URL.

**Result in our project**

- `AppComponent` wraps all other pages.

- Header (title + menu) is always visible.

Inside `<router-outlet>` Angular shows.

- Home page

- All Products page

- Categories page

- Product Lookup page

- 404 page
depending on the current URL.


**Page Component** – Home / Landing Page

- This is the first screen when user opens the app.

**landing-home.component.ts**

`// src/app/pages/landing-home/landing-home.component.ts`

```js
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.css'],
})
export class LandingHomeComponent {
  title = 'Welcome to the Product App';
  introText = 'Use the links below to explore products and categories.';
}
```


**What this shows about components**

- Component can hold text/data (title, introText).

- It can import RouterLink to create navigation links in the template.


**landing-home.component.html**

<!-- src/app/pages/landing-home/landing-home.component.html -->
```js
<section class="home">
  <h2>{{ title }}</h2>
  <p>{{ introText }}</p>

  <div class="home-actions">
    <a routerLink="/all_products" class="btn">All Products</a>
    <a routerLink="/all_product_catgories" class="btn">All Categories</a>
  </div>
</section>
```

**How it is useful in Angular**

This component is mapped to / in app.routes.ts.

- It is a page-level component (one full screen).

- It helps user navigate to other parts of the app.


## Reusable Component – Product Card

- Instead of writing card HTML inside `ProductsComponent`,
- we can create a `reusable component` to display a single product.

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
**What this shows**

- @Input() → parent component can pass data to this child component.

- Component becomes `reusable` for different products.




