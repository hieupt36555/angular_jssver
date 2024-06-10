import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const guardsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('user');
  if (!token) {
    Swal.fire({
      title: "Bạn Chưa Đăng Nhập!",
      icon: "warning",
    })
    router.navigateByUrl('/signin');
    return false;
  }
  
  return true;
};
