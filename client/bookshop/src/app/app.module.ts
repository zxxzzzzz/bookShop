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
    CenterComponent
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
