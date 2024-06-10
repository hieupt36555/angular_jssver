import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from '../../../services/product.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  route = inject(ActivatedRoute);
  productService = inject(ProductService); 
  router = inject(Router);
  productsId! : string | undefined;

  addProductForm : FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    image: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    isShow: new FormControl(false),
  });

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.productsId = params['id'];
      this.productService.getDetailProduct(params['id']).subscribe(
        {
            next: (data) => {
                this.addProductForm.patchValue(data)
              },
              error: (error) => {
                this.router.navigate(["**"]);
              },
        }
      )
    });
    
  }

  handleSubmit() {
    if(!this.productsId) return;
    this.productService.editProduct(this.productsId,this.addProductForm.value).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Sửa Sản Phẩm Thành Công!",
          showConfirmButton: false,
          timer: 1100
        })
        this.router.navigate(["/admin"]);
      },
      error: (error) => {
        Swal.fire({
          title: "Sửa Sản Phẩm Thất Bại",
          icon: "warning",
        })
      },
    });
  }
}
