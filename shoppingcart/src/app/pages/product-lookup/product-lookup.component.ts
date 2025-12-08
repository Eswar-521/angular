import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";

@Component({
  selector: "app-product-lookup",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./product-lookup.component.html",
})
export class ProductLookupComponent {
  product?: Product;
  qty?: number;
  totalPrice?: number;
  notFound = false;   // 👈 new flag

  constructor(
    private route: ActivatedRoute,
    private ps: ProductService
  ) {
    const idParam = this.route.snapshot.paramMap.get("id");
    const qtyParam = this.route.snapshot.paramMap.get("qty");

    const id = idParam ? Number(idParam) : NaN;
    const qty = qtyParam ? Number(qtyParam) : undefined;

    // id invalid aithe -> product not found
    if (Number.isNaN(id)) {
      this.notFound = true;
      return;
    }

    const found = this.ps.getById(id);
    if (!found) {
      // 👇 earlier: router.navigateByUrl("/not-found")
      // ippudu: product page lo ne "Product Not Found" chupistham
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
