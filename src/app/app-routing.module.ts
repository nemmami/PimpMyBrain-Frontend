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
import { ProfileComponent } from './pages/public/profile/profile.component';
import { AppointmentDetailsComponent } from './pages/users/appointment-details/appointment-details.component';



const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent,  canActivate: [CanActivateViaNotAuthenticationGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [CanActivateViaNotAuthenticationGuard] },
  { path: 'notification', component: NotificationComponent },
  { path: 'rendezvous', component: AppointmentComponent },
  { path: 'creerCours', component: CreateCourseComponent},
  { path: 'my_courses', component: MyCoursesComponent },
  { path: 'logout', component: LogoutComponent },
  { path: "course_details/:id_course", component: CourseDetailsComponent }, //TODO update to match with id_course asked
  { path: "favorites", component: FavoriteComponent },
  { path: 'ratings', component: RatingsPageComponent },
  { path: 'rendezvous/:id_course', component: AppointmentDetailsComponent },
  { path: 'ratings/:id_teacher', component: RatingsPageComponent },
  { path: 'profile/:id_user', component: ProfileComponent },
  { path: '**', redirectTo: '' } // must be the last one route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
