import { Component, Input, OnInit } from '@angular/core';
import { ICourse } from '../../models/courses';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseFormComponent } from '../course-form/course-form.component';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
@Input() getCourse !: ICourse
  constructor(
    private _matDialog : MatDialog
  ) { }

  ngOnInit(): void {
  }
  onEdit(){
    let dialogConf = new MatDialogConfig();

    dialogConf.data = this.getCourse;
    dialogConf.width = "500px";
    dialogConf.disableClose = false;
    dialogConf.autoFocus = false;

    const dialogRef = this._matDialog.open(CourseFormComponent, dialogConf)

    dialogRef.afterClosed()
        .subscribe(course => {
          console.log(`Updated Course `, course);
          this.getCourse = course;
        })
  }
}
