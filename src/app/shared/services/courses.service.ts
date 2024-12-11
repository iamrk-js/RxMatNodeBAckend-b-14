import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICourse, ICourseResp, Ilession, IlessonRes } from '../models/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  changeInCat$ : Subject<boolean> = new Subject()
  courseUrl: string = `${environment.baseUrl}/courses`
  constructor(
    private _http: HttpClient
  ) { }

  fetchAllCourses(): Observable<ICourse[]> {
    return this._http.get<ICourseResp>(this.courseUrl)
      .pipe(
        map(res => res['payload']),
        shareReplay()
      )
  }

  updateCourse(course: ICourse): Observable<ICourse> {
    let updateUrl = `${this.courseUrl}/${course.id}`;
    return this._http.put<ICourse>(updateUrl, course)
  }

  getCourseInfo(courseId: string): Observable<ICourse> {
    let courseUrl = `${this.courseUrl}/${courseId}`;
    return this._http.get<ICourse>(courseUrl)
  }

  getCourseLessions(courseId: string, pageSize: number = 15, filter=''):Observable<Ilession[]> {
    let courseLessions = `${environment.baseUrl}/lessons`;

    let params = new HttpParams()
      .set("courseId", courseId)
      .set("pageSize", pageSize)
      .set("filter", filter)

    return this._http.get<IlessonRes>(courseLessions, {
      params: params
    })
    .pipe(
      map(res => {
        return res['payload']
      })
    )
  }
}
