import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../models/courses';
import { CoursesService } from '../../services/courses.service';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  coursesArr !: Array<ICourse>;
  beginnerCoursesArr !: Array<ICourse>;
  advanceCoursesArr !: Array<ICourse>;
  allCourses$ !: Observable<Array<ICourse>>;
  beginnerCourses$ !: Observable<Array<ICourse>>;
  advanceCourses$ !: Observable<Array<ICourse>>;

  constructor(
    private _coursesService: CoursesService
  ) { }

  ngOnInit(): void {

    this.fetchAllCourses();

    this._coursesService.changeInCat$
      .subscribe(res => {
        if (res) {
          this.fetchAllCourses();
        }
      })
    // this.allCourses$ = this._coursesService.fetchAllCourses()
    // this.advanceCourses$ = this.allCourses$
    //   .pipe(
    //     map(coursesArr => {
    //       return coursesArr.filter(c => c.category === "ADVANCED")
    //     })
    //   )

    //   this.beginnerCourses$ = this.allCourses$
    //                           .pipe(
    //                             map(arr => {
    //                               return arr.filter(c => c.category === "BEGINNER")
    //                             })
    //                           )
    // this._coursesService.fetchAllCourses()
    //   .subscribe(courses => {
    //     // this.coursesArr = courses
    //     this.beginnerCoursesArr = courses.filter(c => c.category === "BEGINNER");
    //     this.advanceCoursesArr = courses.filter(c => c.category === "ADVANCED" );
    //   })
  }
  fetchAllCourses() {
    this._coursesService.fetchAllCourses()
      .subscribe(courses => {
        this.beginnerCoursesArr = courses.filter(c => c.category === "BEGINNER");
        this.advanceCoursesArr = courses.filter(c => c.category === "ADVANCED");
      })
  }
}
