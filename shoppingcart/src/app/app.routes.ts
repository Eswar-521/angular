
import { Routes } from "@angular/router";
import { LandingHomeComponent } from "./pages/landing-home/landing-home.component";
import { ProductsComponent } from "./pages/products/products.component";
import { ProductLookupComponent } from "./pages/product-lookup/product-lookup.component";
import { AllCategoriesComponent } from "./pages/all-categories.component";
import { CategoryProductsComponent } from "./pages/category-products.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

export const routes: Routes = [
  { path: "", component: LandingHomeComponent },

  { path: "all_product_catgories", component: AllCategoriesComponent },
  { path: "all_products", component: ProductsComponent },
  { path: "all_product_catgory/:category", component: CategoryProductsComponent },

  { path: "product_lookup/:id", component: ProductLookupComponent },
  { path: "product_lookup/:id/:qty", component: ProductLookupComponent },
  

  { path: "not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "not-found" }
];