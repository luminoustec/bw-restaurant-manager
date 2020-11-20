import { NgModule } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { StreamsComponent } from '../components/streams/streams.component';
import { AuthGuard } from '../services/auth.guard';
import { CommentsComponent } from '../components/comments/comments.component';
import { PeopleComponent } from '../components/people/people.component';
import { FollowingComponent } from '../components/following/following.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { ChatComponent } from '../components/chat/chat.component';
import { ImagesComponent } from '../components/images/images.component';
import { ViewUserComponent } from '../components/view-user/view-user.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { RestaurantsComponent } from '../components/restaurants/restaurants.component';
import { RestaurantManageComponent } from '../components/restaurant-manage/restaurant-manage.component';
import { CategoryViewComponent } from '../components/category-view/category-view.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { ItemManageComponent } from '../components/item-manage/item-manage.component';
import { ItemsComponent } from '../components/items/items.component';
import { RestaurantInfoComponent } from '../components/restaurant-info/restaurant-info.component';
import { RestaurantEditComponent } from '../components/restaurant-edit/restaurant-edit.component';
import { CategoryEditComponent } from '../components/category-edit/category-edit.component';
import { CategoryInfoComponent } from '../components/category-info/category-info.component';
import { ItemInfoComponent } from '../components/item-info/item-info.component';
import { ItemEditComponent } from '../components/item-edit/item-edit.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { OrderInfoComponent } from '../components/order-info/order-info.component';
import { OrderStatusComponent } from '../components/order-status/order-status.component';
import { CityViewComponent } from '../components/city-view/city-view.component';
import { CityFormComponent } from '../components/city-form/city-form.component';
import { CitiesComponent } from '../components/cities/cities.component';
import { CityInfoComponent } from '../components/city-info/city-info.component';
import { CityEditComponent } from '../components/city-edit/city-edit.component';

import { DistrictViewComponent } from '../components/district-view/district-view.component';
import { DistrictFormComponent } from '../components/district-form/district-form.component';
import { DistrictsComponent } from '../components/districts/districts.component';
import { DistrictInfoComponent } from '../components/district-info/district-info.component';
import { DistrictEditComponent } from '../components/district-edit/district-edit.component';

import { StreetsComponent } from '../components/streets/streets.component';
import { StreetEditComponent } from '../components/street-edit/street-edit.component';
import { StreetFormComponent } from '../components/street-form/street-form.component';
import { StreetInfoComponent } from '../components/street-info/street-info.component';
import { StreetViewComponent } from '../components/street-view/street-view.component';

import { ApartmentEditComponent } from '../components/apartment-edit/apartment-edit.component';
import { ApartmentFormComponent } from '../components/apartment-form/apartment-form.component';
import { ApartmentInfoComponent } from '../components/apartment-info/apartment-info.component';
import { ApartmentsComponent } from '../components/apartments/apartments.component';
import { ApartmentViewComponent } from '../components/apartment-view/apartment-view.component';
import { DeliveredOrdersComponent } from '../components/delivered-orders/delivered-orders.component';
import { CanceledOrdersComponent } from '../components/canceled-orders/canceled-orders.component';
import { OrderDetailsComponent } from '../components/order-details/order-details.component';

const routes: Routes = [
  {
    path: 'streams',
    component: StreamsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    component: CommentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'people',
    component: PeopleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'people/following',
    component: FollowingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'people/followers',
    component: FollowersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:name',
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'images/:name',
    component: ImagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':name',
    component: ViewUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurants/all',
    component: RestaurantsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurants/manage',
    component: RestaurantManageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'category/manage',
    component: CategoryViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'category/all',
    component: CategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'item/all',
    component: ItemsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'item/manage',
    component: ItemManageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurant/:id',
    component: RestaurantInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurant-edit/:id',
    component: RestaurantEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'category-edit/:id',
    component: CategoryEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'category-info/:id',
    component: CategoryInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'item-info/:id',
    component: ItemInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'item-edit/:id',
    component: ItemEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order/all',
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order-info/:id',
    component: OrderInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order-status/:id',
    component: OrderStatusComponent,
    canActivate: [AuthGuard]
  },
   {
    path: 'address/city/manage',
    component: CityViewComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'address/city/all',
    component: CitiesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'city/:id',
    component: CityInfoComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'city-edit/:id',
    component: CityEditComponent,
    canActivate: [AuthGuard]
  },   
  {
    path: 'address/district/manage',
    component: DistrictViewComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'address/district/all',
    component: DistrictsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'district/:id',
    component: DistrictInfoComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'district-edit/:id',
    component: DistrictEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'address/street/manage',
    component: StreetViewComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'address/street/all',
    component: StreetsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'street/:id',
    component: StreetInfoComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'street-edit/:id',
    component: StreetEditComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'address/apartment/manage',
    component: ApartmentViewComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'address/apartment/all',
    component: ApartmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'apartment/:id',
    component: ApartmentInfoComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'apartment-edit/:id',
    component: ApartmentEditComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'delivered/orders',
    component: DeliveredOrdersComponent,
    canActivate: [AuthGuard]
  },   
  {
    path: 'canceled/orders',
    component: CanceledOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'details/:id',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard]
  },    
  {
    path: '**',
    redirectTo: 'streams'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class StreamsRoutingModule { }
