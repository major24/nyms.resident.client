import { Injectable } from '@angular/core';
import { ApiService } from '../../services/index';
import { Observable } from 'rxjs';
import { SpendMasterCategory, SpendCategory } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SpendCategoryService {

  constructor(private apiService: ApiService) { }

  loadMasterCategories(): Observable<SpendMasterCategory[]> {
    return this.apiService.loadMasterCategories();
  }

  loadCategories(): Observable<SpendCategory[]> {
    return this.apiService.loadCategories();
  }

  createCategory(spendCategory: SpendCategory): Observable<SpendCategory> {
    return this.apiService.createCategory(spendCategory);
  }

  updateCategory(spendCategory: SpendCategory): Observable<SpendCategory> {
    return this.apiService.updateCategory(spendCategory.id, spendCategory);
  }
}
