import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  products: Product[] = [];

  constructor(private ps: ProductService) {
    this.products = this.ps.getAll();
  }

  trackById(_: number, p: Product) {
    return p.product_id;
  }
}
