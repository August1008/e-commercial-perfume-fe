import { Component, inject } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import {MatListModule, MatListOption, MatSelectionList, MatSelectionListChange} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDivider,
    MatSelectModule,
    MatSelectionList,
    MatListOption,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss'
})
export class FilterDialogComponent {
  shopService = inject(ShopService);
  private dialog = inject(MatDialogRef<FilterDialogComponent>);
  data = inject(MAT_DIALOG_DATA);
  isApplyFilterButtonDisabled: boolean = true;

  selectedBrands: string[] = this.data.selectedBrands;
  selectedTypes: string[] = this.data.selectedTypes;

  applyFilters() {
    this.dialog.close({
      selectedBrands: this.selectedBrands,
      selectedTypes: this.selectedTypes
    });
    this.isApplyFilterButtonDisabled = true;
  }

  cancelFilter(){
    this.dialog.close();
  }

  onFilterChange(event: MatSelectionListChange) {
    this.isApplyFilterButtonDisabled = false;
  }

}
