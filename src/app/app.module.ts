import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './shared/components/home/home.component';
import { AboutComponent } from './shared/components/about/about.component';
import { CourseCardComponent } from './shared/components/course-card/course-card.component';
import { CourseComponent } from './shared/components/course/course.component';
import { HttpClientModule } from '@angular/common/http';
import { CourseDialogComponent } from './shared/components/course-dialog/course-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseFormComponent } from './shared/components/course-form/course-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CourseCardComponent,
    CourseComponent,
    CourseDialogComponent,
    CourseFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
