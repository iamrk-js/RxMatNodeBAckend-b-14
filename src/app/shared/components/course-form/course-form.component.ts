import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ICourse } from '../../models/courses';
import { CoursesService } from '../../services/courses.service';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  courseData !: ICourse;
  courseForm !: FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private course: ICourse,
    private _courseService : CoursesService,
    private _matDialog : MatDialogRef<CourseDialogComponent>
  ) {
    this.createForm()
    // console.log(course);
    this.courseData = course;
    this.courseForm.patchValue(course)
  }

  ngOnInit(): void {
      console.log(this.courseForm.value);
  }

  get f(){
   return this.courseForm.controls 
  }
  createForm(){
    this.courseForm = this.fb.group({
      description : ["", Validators.required],
      category : ["", Validators.required],
      releasedAt : ["", Validators.required],
      longDescription : ["", Validators.required],
    })
  }
  saveCourse(){
    if(this.courseForm.valid){
      let updatedCourse = {...this.courseForm.value, id : this.courseData.id};
      this._courseService.updateCourse(updatedCourse)
        .subscribe(res => {
          console.log(res);  // msg true
          this._courseService.changeInCat$.next(true)
          this._matDialog.close(updatedCourse)
        })
    }
  }
}
