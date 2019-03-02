import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegiComponent } from './regi/regi.component';
import { ShopComponent } from './shop/shop.component';
import { BookComponent } from './customCom/book/book.component';
import { HotComponent } from './hot/hot.component';
import { CartComponent } from './cart/cart.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CenterComponent } from './center/center.component';
import { AdminComponent } from './admin/admin.component';
import { AddBookComponent } from './admin/children/add-book/add-book.component';
import { BookPanComponent } from './customCom/book/children/book-pan/book-pan.component';
import { UpdateBookComponent } from './admin/children/update-book/update-book.component';
import { AdminBookComponent } from './admin/children/admin-book/admin-book.component';
import { AdminOrderComponent } from './admin/children/admin-order/admin-order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegiComponent,
    ShopComponent,
    BookComponent,
    HotComponent,
    CartComponent,
    BookDetailComponent,
    CenterComponent,
    AdminComponent,
    AddBookComponent,
    BookPanComponent,
    UpdateBookComponent,
    AdminBookComponent,
    AdminOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
