import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';

// ✅ Navbar Component REMOVE केला (कारण तो बरोबर नाही)

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentFormComponent,
    StudentDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }