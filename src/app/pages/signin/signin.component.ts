import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SidebarComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  authService = inject(AuthService);
  router = inject(Router);

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  handleSubmit() {
    
    this.authService.SignInSevice(this.signInForm.value).subscribe({
      next: (data) => {
        Swal.fire({
          title: "Đăng Nhập Thành Công!",
          icon: "success",
          timer: 1100,
          showConfirmButton: false
        })
        localStorage.setItem('user', (data as {accessToken: string}).accessToken);
        this.router.navigate(["/"]);
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
