import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './pages/users/appointment/appointment.component';
import { CreateCourseComponent } from './pages/users/create-course/create-course.component';
import { HomeComponent } from './pages/public/home/home.component';
import { LoginComponent } from './pages/public/login/login.component';
import { NotificationComponent } from './pages/users/notification/notification.component';
import { RegisterComponent } from './pages/public/register/register.component';
import { MyCoursesComponent } from "./pages/users/my-courses/my-courses.component";
import { CanActivateViaNotAuthenticationGuard } from './guards/CanActivateViaNotAuthentication.guard'; 
import { LogoutComponent } from './pages/users/logout/logout.component';
import { CourseDetailsComponent } from "./pages/users/course-details/course-details.component";
import { FavoriteComponent } from './pages/users/favorites/favorite.component';
import { CanActivateViaAuthenticationGuard } from './guards/CanActivateViaAuthentication.guard'; 
import { RatingsPageComponent } from './pages/public/ratings-page/ratings-page.component';
import { AppointmentDetailsComponent } from './pages/users/appointment-details/appointment-details.component';



const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent,  canActivate: [CanActivateViaNotAuthenticationGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [CanActivateViaNotAuthenticationGuard] },
  { path: 'notification', component: NotificationComponent, canActivate: [CanActivateViaAuthenticationGuard]},
  { path: 'rendezvous', component: AppointmentComponent, canActivate: [CanActivateViaAuthenticationGuard] },
  { path: 'creerCours', component: CreateCourseComponent, canActivate: [CanActivateViaAuthenticationGuard]},
  { path: 'my_courses', component: MyCoursesComponent, canActivate: [CanActivateViaAuthenticationGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [CanActivateViaAuthenticationGuard] },
  { path: "course_details/:id_course", component: CourseDetailsComponent, canActivate: [CanActivateViaAuthenticationGuard] }, //TODO update to match with id_course asked
  { path: "favorites", component: FavoriteComponent, canActivate: [CanActivateViaAuthenticationGuard] },
  { path: 'ratings', component: RatingsPageComponent, canActivate: [CanActivateViaAuthenticationGuard] },
  { path: 'rendezvous/:id_course', component: AppointmentDetailsComponent, canActivate: [CanActivateViaAuthenticationGuard] },
  { path: 'ratings/:id_teacher', component: RatingsPageComponent, canActivate: [CanActivateViaAuthenticationGuard] },
  { path: 'profile/:id_teacher', component: HomeComponent, canActivate: [CanActivateViaAuthenticationGuard] }, //TODO update component
  { path: '**', redirectTo: '' } // must be the last one route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
