import { NgModule } from '@angular/core';
import { LoginUserComponent } from './login-user/login-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { SharedModule } from 'app/core/modules/shared.module';


@NgModule({
  declarations: [
    LoginUserComponent, 
    RegisterUserComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    LoginUserComponent, 
    RegisterUserComponent
  ]
})
export class AuthPagesModule { }
