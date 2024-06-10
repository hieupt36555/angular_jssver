import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IProducts, addProductForm } from '../types/Iproducts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
//tạo instane
http = inject(HttpClient);
apiUrl = 'http://localhost:3000';
  constructor() { 
  }

  

  // searchProducts(query: string): Observable<any[]> {
  //   const url = `${this.apiUrl}?q=${query}`;
  //   return this.http.get<any[]>(url);
  // }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category`);
  }

  addProduct(product: addProductForm) {
    return this.http.post<addProductForm>(`${this.apiUrl}/products`, product);
  }
  editProduct(id: string, data: addProductForm){
    return this.http.put(`${this.apiUrl}/products/${id}`, data);
  }
  getAllProducts() {
    return this.http.get<IProducts[]>(`${this.apiUrl}/products`);   
  }
  deleteProduct(id : number | string)  {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }
  getDetailProduct(id : number | string){
    return this.http.get<IProducts>(`${this.apiUrl}/products/${id}`);
  }
}
