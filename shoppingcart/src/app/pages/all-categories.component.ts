import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ProductService } from "../services/product.service";

@Component({
  selector: "app-all-categories",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./all-categories.component.html",
})
export class AllCategoriesComponent {
  categories: string[] = [];

  constructor(private ps: ProductService) {
    this.categories = this.ps.getAllCategories();
  }
}
