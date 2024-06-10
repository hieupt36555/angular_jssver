import { signUp } from './../../types/User';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SidebarComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  authService = inject(AuthService);
  router = inject(Router);

  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    firstname: new FormControl('',[Validators.required]),
    confirm: new FormControl('',[Validators.required]),
  });

  handleSubmit() {
    this.authService.SignUpSevice(this.signUpForm.value).subscribe({
      next: () => {
        Swal.fire({
          title: "Đăng Ký Thành Công!",
          // text: "Bạn Sẽ !",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đến Trang Đăng Nhập"
        })
          .then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(["/signin"]);
            }
          });
      },
      error: (error) => {
        Swal.fire({
          title: "Đăng Ký Thất Thất Bại",
          icon: "warning",
        })
      },
    });
  }
}
