import { Routes, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';

// import { MenuComponent } from '../menu/menu.component';
// import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { RegisterformComponent } from '../registerform/registerform.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  {path: 'contactus', component: ContactComponent},
  {path: 'aboutus' , component: AboutComponent, canActivate: [AuthGuard]},
  { path: 'form',     component: RegisterformComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
