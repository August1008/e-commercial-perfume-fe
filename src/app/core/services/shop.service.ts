import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { shopParams } from '../../shared/models/shopParams';
import { config } from '../../shared/configs/config';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl: string = config.BASE_URL;
  private http = inject(HttpClient);

  types: string[] = [];
  brands: string[] = [];

  shopParams: shopParams = new shopParams();
  
  getProducts(shopParams?: shopParams) {
    console.log(shopParams);
    let params = new HttpParams();
    if (shopParams && shopParams.brands.length > 0) {
      params = params.append('brand', shopParams.brands.join(','));
    }
    if (shopParams && shopParams.types.length > 0) {
      params = params.append("type", shopParams.types.join(","));
    }
    if (shopParams) {
      params = params.append('sortType', shopParams.sortType);
      params = params.append('search', shopParams.search);
      params = params.append('pageSize', shopParams.pageSize);
      params = params.append('page', shopParams.page);
    }
    
    console.log(params.toString());
    return this.http.get<Pagination<Product>>(this.baseUrl + 'Products?' + params.toString());
  }

  getProduct(id: string) {
    return this.http.get<Product>(this.baseUrl + 'Products/' + id);
  }

  getBrands() {
    if (this.brands.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'Products/brands').subscribe({
      next: response => this.brands = response,
      error: error => console.error(error)
    });
  }

  getTypes() {
    if (this.types.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'Products/types').subscribe({
      next: response => this.types = response,
      error: error => console.error(error)
    });
  }
}
