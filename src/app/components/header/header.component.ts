import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IProducts } from '../../types/Iproducts';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SidebarComponent, RouterLink, FormsModule, NgIf, NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  query = '';

  products : IProducts[] = []

  productsService = inject(ProductService);

  
}
