import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  loading = false;
  searchTerm = '';
  filterCourse = '';
  filterSemester = '';

  courses: string[] = [];
  semesters: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.filteredStudents = data;
        this.extractCourses();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.loading = false;
        alert('Failed to load students. Make sure backend is running.');
      }
    });
  }

  extractCourses() {
    const courseSet = new Set(this.students.map(s => s.course));
    this.courses = Array.from(courseSet);
  }

  filterStudents() {
    this.filteredStudents = this.students.filter(student => {
      const matchSearch = 
        student.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.last_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.roll_number.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchCourse = this.filterCourse ? student.course === this.filterCourse : true;
      const matchSemester = this.filterSemester ? student.semester === parseInt(this.filterSemester) : true;

      return matchSearch && matchCourse && matchSemester;
    });
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          this.loadStudents();
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          alert('Failed to delete student.');
        }
      });
    }
  }

  viewStudent(id: number) {
    this.router.navigate(['/students', id]);
  }

  editStudent(id: number) {
    this.router.navigate(['/students/edit', id]);
  }

  addStudent() {
    this.router.navigate(['/students/add']);
  }
}