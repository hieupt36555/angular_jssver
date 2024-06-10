import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CategoryType, CategoryTypeShow } from '../types/Iproducts';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/category';
  constructor() { }

  addCategory(category: CategoryType){
    return this.http.post<CategoryType>(this.apiUrl, category);
  }
  listCategory(){
    return this.http.get<CategoryTypeShow[]>(this.apiUrl);
  }
  deleteCategory(id: string){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
