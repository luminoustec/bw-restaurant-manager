import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from '../components/streams/streams.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { TokenService } from '../services/token.service';
import { SideComponent } from '../components/side/side.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts.component';
import { CommentsComponent } from '../components/comments/comments.component';
import { PostService } from '../services/post.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PeopleComponent } from '../components/people/people.component';
import { UsersService } from '../services/users.service';
import { FollowingComponent } from '../components/following/following.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { TopStreamsComponent } from '../components/top-streams/top-streams.component';
import { ChatComponent } from '../components/chat/chat.component';
import { MessageComponent } from '../components/message/message.component';
import { MessageService } from '../services/message.service';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { EmojiPickerModule } from 'ng2-emoji-picker';
import { ImagesComponent } from '../components/images/images.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ViewUserComponent } from '../components/view-user/view-user.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { RestaurantFormComponent } from '../components/restaurant-form/restaurant-form.component';
import { RestaurantsComponent } from '../components/restaurants/restaurants.component';
import { RestaurantManageComponent } from '../components/restaurant-manage/restaurant-manage.component';
import { RestaurantService } from '../services/restaurant.service';
import { CategoryFormComponent } from '../components/category-form/category-form.component';
import { CategoryViewComponent } from '../components/category-view/category-view.component';
import { CategoryService } from '../services/category.service';
import { CategoriesComponent } from '../components/categories/categories.component';
import { ItemManageComponent } from '../components/item-manage/item-manage.component';
import { ItemFormComponent } from '../components/item-form/item-form.component';
import { ItemsComponent } from '../components/items/items.component';
import { ItemService } from '../services/item.service';
import { RestaurantInfoComponent } from '../components/restaurant-info/restaurant-info.component';
import { RestaurantEditComponent } from '../components/restaurant-edit/restaurant-edit.component';
import { CategoryEditComponent } from '../components/category-edit/category-edit.component';
import { CategoryInfoComponent } from '../components/category-info/category-info.component';
import { ItemInfoComponent } from '../components/item-info/item-info.component';
import { ItemEditComponent } from '../components/item-edit/item-edit.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { OrderService } from '../services/order.service';
import { OrderInfoComponent } from '../components/order-info/order-info.component';
import { OrderStatusComponent } from '../components/order-status/order-status.component';
import { CityViewComponent } from '../components/city-view/city-view.component';
import { CityFormComponent } from '../components/city-form/city-form.component';
import { CityService } from '../services/city.service';
import { CitiesComponent } from '../components/cities/cities.component';
import { CityInfoComponent } from '../components/city-info/city-info.component';
import { CityEditComponent } from '../components/city-edit/city-edit.component';
import { DistrictViewComponent } from '../components/district-view/district-view.component';
import { DistrictFormComponent } from '../components/district-form/district-form.component';
import { DistrictsComponent } from '../components/districts/districts.component';
import { DistrictEditComponent } from '../components/district-edit/district-edit.component';
import { DistrictInfoComponent } from '../components/district-info/district-info.component';

import { DistrictService } from '../services/district.service';

import { StreetsComponent } from '../components/streets/streets.component';
import { StreetEditComponent } from '../components/street-edit/street-edit.component';
import { StreetFormComponent } from '../components/street-form/street-form.component';
import { StreetInfoComponent } from '../components/street-info/street-info.component';
import { StreetViewComponent } from '../components/street-view/street-view.component';

import { StreetService } from '../services/street.service';

import { ApartmentEditComponent } from '../components/apartment-edit/apartment-edit.component';
import { ApartmentFormComponent } from '../components/apartment-form/apartment-form.component';
import { ApartmentInfoComponent } from '../components/apartment-info/apartment-info.component';
import { ApartmentsComponent } from '../components/apartments/apartments.component';
import { ApartmentViewComponent } from '../components/apartment-view/apartment-view.component';

import { DeliveredOrdersComponent } from '../components/delivered-orders/delivered-orders.component';
import { CanceledOrdersComponent } from '../components/canceled-orders/canceled-orders.component';
import { OrderDetailsComponent } from '../components/order-details/order-details.component';

import { ApartmentService } from '../services/apartment.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxAutoScrollModule,
    FileUploadModule,
    EmojiPickerModule.forRoot()
  ],
  declarations: [
    StreamsComponent,
    ToolbarComponent,
    SideComponent,
    PostFormComponent,
    PostsComponent,
    CommentsComponent,
    PeopleComponent,
    FollowingComponent,
    FollowersComponent,
    NotificationsComponent,
    TopStreamsComponent,
    ChatComponent,
    MessageComponent,
    ImagesComponent,
    ViewUserComponent,
    ChangePasswordComponent,
    RestaurantFormComponent,
    RestaurantsComponent,
    RestaurantManageComponent,
    CategoryFormComponent,
    CategoryViewComponent,
    CategoriesComponent,
    ItemManageComponent,
    ItemFormComponent,
    ItemsComponent,
    RestaurantInfoComponent,
    RestaurantEditComponent,
    CategoryEditComponent,
    CategoryInfoComponent,
    ItemInfoComponent,
    ItemEditComponent,
    OrdersComponent,
    OrderInfoComponent,
    OrderStatusComponent,
    CityViewComponent,
    CityFormComponent,
    CitiesComponent,
    CityInfoComponent,
    CityEditComponent,
    DistrictViewComponent,
    DistrictFormComponent,
    DistrictsComponent,
    DistrictEditComponent,
    DistrictInfoComponent,
    StreetsComponent,
    StreetEditComponent,
    StreetFormComponent,
    StreetInfoComponent,
    StreetViewComponent,
    ApartmentEditComponent,
    ApartmentFormComponent,
    ApartmentInfoComponent,
    ApartmentsComponent,
    ApartmentViewComponent,
	DeliveredOrdersComponent,
	CanceledOrdersComponent,
	OrderDetailsComponent],
  exports: [StreamsComponent, ToolbarComponent],
  providers: [TokenService,
    PostService,
    UsersService,
    MessageService ,
    RestaurantService,
    CategoryService,
    ItemService,
    OrderService,
	CityService,
	DistrictService,
	StreetService,
	ApartmentService,

   ]
})
export class StreamsModule { }
