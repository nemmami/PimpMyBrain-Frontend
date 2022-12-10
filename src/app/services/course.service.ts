import {environement} from "../../environement/environement";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Course} from "../models/course";
import {catchError, tap} from "rxjs/operators";
import {handleError} from "../utils/handle_error";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CourseService {
  private ROOT_URL = environement.ROOT_URL;
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(private http: HttpClient) {

  }
  createOneCourse(course: Course): Observable<Course>{
    return this.http.post<Course>(`${environement.ROOT_URL}/courses/`, course, this.httpOptions).pipe(
      catchError(handleError<Course>('createOneCourse')))
   }

  getAllTeacherCourses(idTeacher: number): Observable<Course[]> {
    const url: string = `${this.ROOT_URL}/courses/teacher/${idTeacher}`;
    return this.http.get<Course[]>(url, this.httpOptions).pipe(
        catchError(handleError<Course[]>('getAllTeacherCourses'))
    );
  }


}