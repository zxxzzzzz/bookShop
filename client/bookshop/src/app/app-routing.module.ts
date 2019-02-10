import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RegiComponent } from './regi/regi.component';
import { ShopComponent } from './shop/shop.component';
import { HotComponent } from './hot/hot.component'
import { CartComponent } from './cart/cart.component'
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CenterComponent } from './center/center.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'regi',
    component: RegiComponent
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'hot',
    component: HotComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'detail',
    component: BookDetailComponent
  },
  {
    path: 'center',
    component: CenterComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
