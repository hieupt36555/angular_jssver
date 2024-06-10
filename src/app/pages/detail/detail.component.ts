import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IProducts } from '../../types/Iproducts';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SidebarComponent, NgIf],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  constructor(private router: Router) { }

  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  product : IProducts | undefined;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.productService.getDetailProduct(params['id']).subscribe(
        {
            next: (data) => {
                console.log(data);
                this.product = data
              },
              error: (error) => {
                // alert('Page Not Found');
                this.router.navigate(["**"]);
              },
        }
      )
    });
    
  }
}
