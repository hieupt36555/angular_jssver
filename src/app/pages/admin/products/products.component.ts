import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { IProducts } from '../../../types/Iproducts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,NgFor, CommonModule, RouterLink, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: IProducts[] = []
  productService = inject(ProductService);

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        Swal.fire({
          title: "Mất Kiết Nối Với Server !",
          text: "Lỗi : " + error.message,
          icon: "error"
        });
        // console.error(error.message);
      },
    });
  }

  filterValue: string = '';
  filter() {
    this.products = this.products.filter(p => p.title.includes(this.filterValue))
  }

  handleDelete(id: number) {
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
          this.productService.deleteProduct(id).subscribe({
            next: () => {
              this.products = this.products.filter((data) => data.id !== id);
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
  // showToast() {
  //   Swal.fire({
  //     title: "Bạn Có Muốn Xóa Vĩnh Viễn Sản Phẩm Này?",
  //     // text: "Bạn Sẽ !",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!"
  //   })
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         Swal.fire({
  //           title: "Deleted!",
  //           text: "Your file has been deleted.",
  //           icon: "success"
  //         });
  //       }
  //     });

  // }
}
