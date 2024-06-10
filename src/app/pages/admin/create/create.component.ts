import { min } from 'rxjs';
import { ProductService } from './../../../services/product.service';
import { addProductForm } from './../../../types/Iproducts';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  productService = inject(ProductService); 
  router = inject(Router);
  category: any[] = [];

  addProductForm : FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    desc: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    image: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    isShow: new FormControl(false),
  });

  ngOnInit(): void {
    this.productService.getCategories().subscribe(data => {
      this.category = data;
    });
  }


  handleSubmit() {
    // console.log(this.addProductForm.value);
    
    this.productService.addProduct(this.addProductForm.value).subscribe({
      next: () => {
        Swal.fire({
          title: "Đã thêm Thành Công, Bạn Có Muốn Quay Về Trang Chủ Không ?",
          // text: "Bạn Sẽ !",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Quay Lại Trang Danh Sách"
        })
          .then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(["/admin"]);
            }
          });
      },
      error: (error) => {
        Swal.fire({
          title: "Thêm Sản Phẩm Thất Bại",
          icon: "warning",
        })
      },
    });
  }
}
