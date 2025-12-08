import { Injectable } from "@angular/core";
import { PRODUCTS } from "../data/products.data";
import { Product } from "../models/product.model";

@Injectable({ providedIn: "root" })
export class ProductService {
  
  getAll(): Product[] {
    return PRODUCTS;
  }

  getById(id: number): Product | undefined {
    return PRODUCTS.find(p => p.product_id === id);
  }

  // ✅ get unique categories
  getAllCategories(): string[] {
    return [...new Set(PRODUCTS.map(p => p.product_category))];
  }

  // ✅ filter by category (case-insensitive)
  getByCategory(category: string): Product[] {
    const c = category.trim().toLowerCase();
    return PRODUCTS.filter(p => p.product_category.toLowerCase() === c);
  }
}
