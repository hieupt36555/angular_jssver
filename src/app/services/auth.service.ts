import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { signIn, signUp } from '../types/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000';
  constructor() { }

  SignUpSevice(data: signUp) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }
  SignInSevice(data : signIn){
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getAllUser(){
    return this.http.get<signUp[]>(`${this.apiUrl}/users`); 
  }

  deleteUser(id : number | string)  {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
/////
  setUser(user: signIn): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): signIn {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('user');
  }

  
  isLoggedIn(): boolean {
    return !!this.getUser();
  }
}
