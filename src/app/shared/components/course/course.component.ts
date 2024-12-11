import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, EventType } from '@angular/router';
import { Observable, debounce, debounceTime, distinctUntilChanged, of, startWith, switchMap, tap } from 'rxjs';
import { ICourse, Ilession } from '../../models/courses';
import { CoursesService } from '../../services/courses.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courseId !: string;
  courseObj$ !: Observable<ICourse>;
  lessons$ !: Observable<Ilession[]>;

  lessionForm !: FormGroup

  constructor(
    private _routes: ActivatedRoute,
    private _courseService: CoursesService
  ) { }

  ngOnInit(): void {
    this.lessionForm = new FormGroup({
      lesson: new FormControl("")
    })
    this.courseId = this._routes.snapshot.params['id'];
    this.courseObj$ = this._courseService.getCourseInfo(this.courseId)
    // .subscribe(res => {
    //   console.log(res);
    // })

    this.lessons$ = this._courseService.getCourseLessions(this.courseId, 10, "")
        this.lessons$ = this.lessionForm.get('lesson')
          ?.valueChanges
          .pipe(
            startWith(''),
            tap(val => console.log(val)),
            debounceTime(1000),
            distinctUntilChanged(),
            switchMap(val => this._courseService.getCourseLessions(this.courseId, 10, val))
          ) as Observable<Ilession[]>
  }

  onSearch(eve: Event) {
    // let val = (eve.target as HTMLInputElement).value as string;
    // // console.log(val);
    // let val$ = of(val)
    // // API call on each keyup event
    // // this._courseService.getCourseLessions(this.courseId, 10, val)
    // //   .subscribe(res => {
    // //     console.log(res);
    // //   })

    // val$
    //   .pipe(
    //     switchMap(str => this._courseService.getCourseLessions(this.courseId, 10, str))
    //   )
    //   .subscribe(res => {
    //     console.log(res);
    //   })
  }

}



// .subscribe(val => {
//   this._courseService.getCourseLessions(this.courseId, 10, val)
//     .subscribe(res => {
//       console.log(res);
//     })
// })