import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { signUp } from '../types/User';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [RouterLink, NgFor, CommonModule, FormsModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {
  products: signUp[] = []
  authService = inject(AuthService);

  ngOnInit() {
    this.authService.getAllUser().subscribe({
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


  handleDelete(id: number | string) {
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
          this.authService.deleteUser(id).subscribe({
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
}
