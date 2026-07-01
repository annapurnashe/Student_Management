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
  searchTerm: string = '';

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
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.loading = false;
        alert('Failed to load students.');
      }
    });
  }

  filterStudents() {
    this.filteredStudents = this.students.filter(student =>
      student.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.last_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.roll_number.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
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