import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import { CategoryType, CategoryTypeShow } from '../../../types/Iproducts';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categorys: CategoryTypeShow[] = []
  categoryService = inject(CategoryService);
  router = inject(Router);

  categorySelect: FormGroup = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),
  });


  ngOnInit(){
    this.categoryService.listCategory().subscribe({
      next: (data) => {
        this.categorys = data;
      },
      error: (error) => {
        Swal.fire({
          title: "Mất Kiết Nối Với Server !",
          text: "Lỗi : " + error.message,
          icon: "error"
        });
      },
    });
  }


  handleSubmit(){
    this.categoryService.addCategory(this.categorySelect.value).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Thêm Thành Công!",
          showConfirmButton: false,
          timer: 1100
        });
        this.router.navigate(["/admin/category"]);
      },
      error: (error) => {
        Swal.fire({
          title: "Thêm Sản Phẩm Thất Bại",
          icon: "warning",
        })
      },
    });
    
  }
  handleDelete(id: string) {
    Swal.fire({
      title: "Bạn Có Muốn Xóa Vĩnh Viễn Sản Phẩm Này?",
      // text: "Bạn Sẽ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa Vĩnh Viễn !"
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.categoryService.deleteCategory(id).subscribe({
            next: () => {
              this.categorys = this.categorys.filter((data) => data.id !== id);
              Swal.fire({
                icon: "success",
                title: "Đã Xóa Thành Công!",
                showConfirmButton: false,
                timer: 1100
              });
            },
            error: (error) => {
              Swal.fire({
                title: "Xóa Thất Bại!",
                text: error.message,
                icon: "error"
              });
            },
          });
        }
      });
  }
}
