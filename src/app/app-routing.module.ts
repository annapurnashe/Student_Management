import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './components/students/students.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  { path: 'students/add', component: StudentFormComponent },
  { path: 'students/edit/:id', component: StudentFormComponent },
  { path: 'students/:id', component: StudentDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }