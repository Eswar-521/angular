![project_structure](./images/project_structure.png)

![project_structure1](./images/project_structure1.png) 


# Project structure

This document explains the **entire Angular “Product” project** .

Focus is on:

- **What each important file is**
- **Where it fits in the app**
- **How it connects to Routing and Components**

**conceptual explanations**

## 1. Angular Project  

This Angular project is a **Product Catalog & Lookup App** used to learn **Routing**:

- Shows all products
- Shows products by category
- Looks up a specific product by ID
- Calculates total price for a quantity
- Handles 404 (Page Not Found) and “Product Not Found”

we have created this app with Angular CLI (steps from: `01-installation.md` and `02-create-project.md`).

---

## 2. Core Angular Entry Files

These files are responsible for **starting the Angular app** and **connecting routing**.

### 2.1 `index.html`

**What it is:**

- The **single HTML file** that the browser first loads.
- It contains a root tag like `<app-root></app-root>` where Angular will inject the app.

**Role in the app:**

- The browser never changes `index.html` during navigation.
- All “page changes” happen **inside** this file by Angular’s routing.

**Key idea:**

> `index.html` = outer shell of the SPA  
> Angular fills it with the app dynamically.

---

### 2.2 `main.ts`

**What it is:**

- The **entry point** for Angular.
- It starts (bootstraps) the Angular application.

**What it does:**

- Tells Angular:  
  “Start the app using `AppComponent` and configuration from `app.config.ts`.”

**Key idea:**

> `main.ts` = “Start button” of the Angular application.

---

### 2.3 `src/app/app.config.ts`

**What it is:**

- A configuration file that defines **providers** for the application.
- In this project, it connects **routing** using `provideRouter(routes)`.

**What it does:**

- Imports the routes from `app.routes.ts`.
- Registers them with Angular so that the router knows which URLs belong to which components.

**Key idea:**

> `app.config.ts` says:  
> “Use these routes (`app.routes.ts`) for navigation in this app.”

---

### 2.4 `src/app/app.routes.ts`

**What it is:**

- The **routing map** of the entire project.
- Contains an array of route definitions (`Routes`).

**What it does:**

- Maps **URL paths** to **components**.
- Handles:
  - Home route (`/`)
  - All products (`/all_products`)
  - All categories (`/all_product_catgories`)
  - Category-based products (`/all_product_catgory/:category`)
  - Product lookup (`/product_lookup/:id`, `/product_lookup/:id/:qty`)
  - Not found (`/not-found` and wildcard `**`)

**Key idea:**

> `app.routes.ts` = “If URL is X, show component Y”.

---

### 2.5 `src/app/app.component.ts`

**What it is:**

- The **root component** of the Angular app.
- Represented by the `<app-root>` tag in `index.html`.

**What it does:**

- Provides global layout (like header, nav) for the whole app.
- Holds the `<router-outlet>` in its HTML template.

**Key idea:**

> `AppComponent` = main layout / shell where all routed pages appear.

---

### 2.6 `src/app/app.component.html`

**What it is:**

- The HTML template for `AppComponent`.

**What it does:**

- Usually has:
  - A header or navbar (e.g., “Product App” title)
  - `<router-outlet>` where the **current routed page** is displayed

**Key idea:**

> `router-outlet` = placeholder where Angular inserts the page for the current URL.

---

## 3. Shared Data & Logic

These files provide **data and services** used by multiple pages.

### 3.1 `src/app/models/product.model.ts`

**What it is:**

- A TypeScript **interface** that defines the structure of a product.

**Fields:**

- `product_id`
- `product_category`
- `product_name`
- `unit_price`
- `image`

**What it does:**

- Ensures **consistent shape** for all product objects used in the app.

**Key idea:**

> `product.model.ts` = formal definition of a “Product”.

---

### 3.2 `src/app/data/products.data.ts`

**What it is:**

- A file that contains an array of **25 product objects** (in memory).

**What it does:**

- Acts like a small **fake database**.
- Supports:
  - all products list
  - category-based lists
  - product lookup by ID

**Key idea:**

> `products.data.ts` = in-memory product table.

---

### 3.3 `src/app/services/product.service.ts`

**What it is:**

- A **service** that provides functions to work with product data.

**What it does:**

- Reads from `PRODUCTS` array in `products.data.ts`.
- Provides methods like:
  - `getAll()` – return all products
  - `getById(id)` – return one product by ID
  - `getAllCategories()` – return unique product categories
  - `getByCategory(category)` – return products in a given category

**Key idea:**

> `product.service.ts` = “brain” for product-related data operations.

---

## 4. Page Components (Routed Screens)

Each “page” in the app is a **standalone component** typically placed under `src/app/pages/`.  
Routing decides **which of these pages is shown** for each URL.

---

### 4.1 Landing Home Page

**Component name:** `LandingHomeComponent`  
**Typical path:** `src/app/pages/landing-home/`  
**URL:** `/`  
**Routing concept:** Default route / home page

**What it shows:**

- A welcome message for the Product App.
- Buttons or links to:
  - **All Products** (`/all_products`)
  - **All Categories** (`/all_product_catgories`)

**Why it’s important:**

- This is the **starting point** for users.
- Demonstrates how `path: ""` (empty path) becomes the default home page.

---

### 4.2 All Categories Page

**Component name:** `AllCategoriesComponent`  
**URL:** `/all_product_catgories`  
**Routing concept:** Regular / static route

**What it shows:**

- List of all **unique product categories**, such as:
  - FROZEN  
  - OFFICE SUPPLIES  
  - Kitchen  
  - FRUITS  
  - Home Goods  

- Each category is usually a link to the **Category Products** page.

**User flow example:**

- User clicks **“FRUITS”** → navigates to `/all_product_catgory/FRUITS`.

**Why it’s important:**

- Shows how a **simple, static route** can act as a menu for entering a **dynamic route** (category-based).

---

### 4.3 All Products Page

**Component name:** `ProductsComponent`  
**URL:** `/all_products`  
**Routing concept:** Regular / static route

**What it shows:**

- A card/list view of **all 25 products**.
- Each card displays:
  - Product name
  - Category
  - Unit price
  - Product image
  - A link like “View Product” that leads to `/product_lookup/:id`

**User flow example:**

- User clicks “View Product” for item with ID 25 → navigates to `/product_lookup/25`.

**Why it’s important:**

- Demonstrates a **“catalog” page** that navigates to **detail pages** using routing.

---

### 4.4 Category Products Page

**Component name:** `CategoryProductsComponent`  
**URL pattern:** `/all_product_catgory/:category`  
**Routing concept:** Dynamic route with **one parameter**

**What it shows:**

- A filtered list of products for **one specific category**.
- Category name is taken from the URL:
  - `/all_product_catgory/FROZEN`
  - `/all_product_catgory/FRUITS`

- Page usually has a heading:  
  `Category: FROZEN`  
  and then shows only the matching products.

**Invalid category case:**

- If category does not exist (like `/all_product_catgory/XYZ`):
  - No products will be found.
  - Component can decide to show “No products found” or redirect to NotFound page.

**Why it’s important:**

- Teaches how to:
  - read a **route parameter** (`:category`)
  - use that value to **filter data** and decide what to show.

---

### 4.5 Product Lookup Page

**Component name:** `ProductLookupComponent`  
**URL patterns:**

- `/product_lookup/:id`
- `/product_lookup/:id/:qty`

**Routing concept:** Dynamic route with **one or two parameters**

**What it shows:**

1. For URL `/product_lookup/:id` (e.g. `/product_lookup/25`):
   - Shows details of the **product whose ID equals `id`**.
   - Includes:
     - Name
     - Category
     - Unit price
     - Image

2. For URL `/product_lookup/:id/:qty` (e.g. `/product_lookup/23/5`):
   - Shows the same details as above.
   - Reads `qty` from the URL.
   - Calculates and displays **total price = qty × unit_price**.

3. Invalid ID or qty:
   - If no product found for ID (e.g. `/product_lookup/30`):
     - Component may show **“Product Not Found / Invalid Product ID”**.
   - If qty is invalid (like 0 or negative):
     - Component may also treat it as “Product/Quantity not valid”.

**Why it’s important:**

- Demonstrates **multiple route parameters** in one component.
- Shows how routing is used for **search/lookup behavior** without forms.
- Helps learners understand how URL values drive component logic.

---

### 4.6 Lookup Info Page (Optional)

**Component name:** `LookupInfoComponent`  
**URL:** `/lookup-info`  
**Routing concept:** Simple static route used as a “help” page

**What it shows:**

- Instructions for using dynamic routes:
  - Example URLs:
    - `/product_lookup/20`
    - `/product_lookup/23/5`
  - Explanation of `:id` and `:qty` meaning.

**Why it’s important:**

- Helps students understand the **URL patterns** used in the project.
- Demonstrates how to create **documentation / help pages** inside an app.

---

### 4.7 Not Found Page (404)

**Component name:** `NotFoundComponent`  
**URL:** `/not-found` (also shown by wildcard `**`)  
**Routing concept:** 404 Handling + wildcard route

**What it shows:**

- A friendly message like:
  - “404 – Page Not Found”
  - “Requested page / product not available.”
- A link to go back to Home (`/`) or All Products.

**When it is shown:**

1. When user types an **unknown URL**, e.g:
   - `/xbyz`
   - `/abcd/efg`
   - `/random_xyz`
2. When the wildcard route (`**`) doesn’t match any other defined route.
3. Optionally, when some component does a **manual redirect** to `/not-found`.

**Why it’s important:**

- Teaches error handling for URLs.
- Shows the purpose of the **wildcard route** in `app.routes.ts`.

---

## 5. Styles & Global Configuration

These are not directly about routing, but they affect how the app looks.

### 5.1 `src/styles.css`

**What it is:**

- A global stylesheet applied to the entire application.

**What it does:**

- Common styles for:
  - layout (container, grid, cards)
  - headings
  - buttons
  - 404 page styling

**Key idea:**

> `styles.css` = global design layer for all pages.

---

### 5.2 Angular Configuration Files (High Level)

These files are usually generated by Angular CLI and rarely touched at beginner level:

- `angular.json` – project build configuration (how to build/serve the app)
- `package.json` – list of dependencies (Angular version, libraries) + scripts (`ng serve`, `ng build`)
- `tsconfig.json` – TypeScript configuration (compiler options)
- `tsconfig.app.json` – specific TS config for the app code

**Key idea:**

> These files tell Angular and the tooling **how to compile, bundle, and run** the project.

---

## 6. Routing Overview (URL → Component)

For quick recap 

| URL / Pattern | Component | Explanation |
|---------------|-----------|-------------|
| `/` | `LandingHomeComponent` | Home page with links to other pages |
| `/all_product_catgories` | `AllCategoriesComponent` | All categories list |
| `/all_products` | `ProductsComponent` | All 25 products list |
| `/all_product_catgory/:category` | `CategoryProductsComponent` | Products filtered by category |
| `/product_lookup/:id` | `ProductLookupComponent` | One product details |
| `/product_lookup/:id/:qty` | `ProductLookupComponent` | One product details + total price |
| `/lookup-info` | `LookupInfoComponent` | Help page explaining routes (optional) |
| `/not-found` | `NotFoundComponent` | 404 Page Not Found |
| `**` | `NotFoundComponent` (via redirect) | Any unknown URL → 404 |



