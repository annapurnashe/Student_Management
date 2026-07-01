import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  roll_number: string;
  course: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://192.168.1.40:8000/api/students/create/';
;

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}${id}/`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.baseUrl, student);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}${id}/`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }
}