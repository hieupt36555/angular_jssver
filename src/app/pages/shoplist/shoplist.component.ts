import { ProductService } from './../../services/product.service';
import { IProducts } from './../../types/Iproducts';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import Swal from 'sweetalert2';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-shoplist',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent , NgFor, RouterLink,FormsModule, NgIf ],
  templateUrl: './shoplist.component.html',
  styleUrl: './shoplist.component.css'
})
export class ShoplistComponent {
  
  products : IProducts[] = []

  productsService = inject(ProductService);

  ngOnInit(){
    this.productsService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        Swal.fire({
          title: "Mất Kiết Nối Với Server !",
          text: "Lỗi : "+error.message,
          icon: "error"
        });
        // console.error(error.message);
      },
    });
  }

 

}
