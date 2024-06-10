import { Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { CreateComponent } from './pages/admin/create/create.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ShoplistComponent } from './pages/shoplist/shoplist.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { EditComponent } from './pages/admin/edit/edit.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { guardsGuard } from './guards/guards.guard';
import { ListUserComponent } from './list-user/list-user.component';

export const routes: Routes = [
    {
        path: "admin",
        component: AdminComponent,
        canActivate: [guardsGuard],
        children: [
            {path: "", component: ProductsComponent},
            {path: "create", component: CreateComponent},
            {path: "product/edit/:id", component: EditComponent},
            {path: "category", component: CategoryComponent},
            {path: "users", component: ListUserComponent}
        ]
    },
    {
        path: "",
        component: HomeComponent
    },
    {path: 'product/:id', component: DetailComponent},
    {path: 'list', component: ShoplistComponent},
    {path: "signin", component: SigninComponent},
    {path: "signup", component: SignupComponent},
    { path: '**', pathMatch: 'full', component: NotfoundComponent },
];
