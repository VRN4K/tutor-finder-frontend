import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { StudentComponent } from "@/student/student.component";
import { BookComponent} from "@/book";
import { RegComponent } from "@/registration";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'registration', component: RegComponent },
    { path: 'students', component: StudentComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'book', component: BookComponent , canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
