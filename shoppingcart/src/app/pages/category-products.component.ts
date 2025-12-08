import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ProductService } from "../services/product.service";
import { Product } from "../models/product.model";

@Component({
  selector: "app-category-products",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./category-products.component.html",
})
export class CategoryProductsComponent {
  categoryName = "";
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ps: ProductService
  ) {
    const catParam = this.route.snapshot.paramMap.get("category");

    if (!catParam) {
      this.router.navigateByUrl("/not-found");
      return;
    }

    this.categoryName = catParam;
    this.products = this.ps.getByCategory(catParam);

    // if no products in that category → 404
    if (this.products.length === 0) {
      this.router.navigateByUrl("/not-found");
    }
  }

  trackById(_: number, p: Product) {
    return p.product_id;
  }
}
