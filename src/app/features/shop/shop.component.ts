import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/models/product';
import { MatCardModule } from '@angular/material/card';
import { ProductItemComponent } from "./product-item/product-item.component";
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { shopParams } from '../../shared/models/shopParams';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { Pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    MatCardModule,
    ProductItemComponent,
    MatButtonModule,
    MatIcon,
    MatMenuModule,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
    MatPaginatorModule,
    FormsModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  private dialogService = inject(MatDialog);
  private shopService = inject(ShopService);
  products?: Pagination<Product>;

  selectedBrands: string[] = [];
  selectedTypes: string[] = [];
  shopParams: shopParams = new shopParams();
  selectedSort: string = "Default";
  sortOptions = [
    { name: 'None', value: "Default" },
    { name: 'Alphabetical', value: "nameAsc" },
    { name: 'Price: Low-High', value: "priceAsc" },
    { name: 'Price: High-Low', value: "priceDes" }
  ];
  pageSizeOptions = [5, 10, 15, 20];


  ngOnInit(): void {
    
    this.getProducts(this.shopParams);
    this.shopService.getBrands();
    this.shopService.getTypes();
  }

  getProducts(shopParams?: shopParams) {
    this.shopService.getProducts(shopParams).subscribe({
      next: response => {
        console.log(response);
        this.products = response;
      },
      error: error => console.error(error),
      complete: () => {
        console.log("complete")
      }
    });
  }


  openFilterDialog(): void {
    const dialog = this.dialogService.open(FilterDialogComponent, {
      minWidth: '500px',
      data: {
        selectedBrands: this.selectedBrands,
        selectedTypes: this.selectedTypes
      }
    });

    dialog.afterClosed().subscribe({
      next: result => {
        if (result) {
          console.log(result);
          this.selectedBrands = result.selectedBrands;
          this.selectedTypes = result.selectedTypes;
          this.shopParams.brands = this.selectedBrands;
          this.shopParams.types = this.selectedTypes;
          this.shopParams.page = 1;
          this.getProducts(this.shopParams);
        }
      }
    })
  }


  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];
    if (selectedOption) {
      this.selectedSort = selectedOption.value.value;
      this.shopParams.sortType = this.selectedSort;
      this.shopParams.page = 1;
      this.getProducts(this.shopParams);
    }
  }

  handlePageEvent(event: PageEvent) {
    this.shopParams.page = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this.getProducts(this.shopParams);
  }

  onSearchChange() {
    this.shopParams.page = 1;
    console.log(this.shopParams.search);
    this.getProducts(this.shopParams);
  }
}
