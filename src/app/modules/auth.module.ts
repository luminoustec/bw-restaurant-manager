import { AuthTabsComponent } from './../components/auth-tabs/auth-tabs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { AuthService } from '../services/auth.service';
import { ToolbarsComponent } from '../components/toolbars/toolbars.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AuthTabsComponent, LoginComponent, SignupComponent,ToolbarsComponent],
  exports: [
    AuthTabsComponent,
    LoginComponent,
    SignupComponent,
    ToolbarsComponent,
  ],
  providers: [AuthService]
})
export class AuthModule { }
