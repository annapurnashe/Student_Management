import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  student: Student = {
    first_name: '',
    last_name: '',
    email: '',
    roll_number: '',
    course: ''
  };

  isEdit = false;
  studentId = 0;
  loading = false;
  error = '';

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.studentId = params['id'];
        this.loadStudent();
      }
    });
  }

  loadStudent() {
    this.loading = true;
    this.studentService.getStudent(this.studentId).subscribe({
      next: (data) => {
        this.student = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading student:', error);
        this.loading = false;
        alert('Failed to load student data.');
      }
    });
  }

  onSubmit() {
    this.error = '';
    this.loading = true;

    if (this.isEdit) {
      this.studentService.updateStudent(this.studentId, this.student).subscribe({
        next: () => {
          this.router.navigate(['/students']);
        },
        error: (error) => {
          this.error = 'Error updating student';
          this.loading = false;
          alert('Failed to update student.');
        }
      });
    } else {
      this.studentService.createStudent(this.student).subscribe({
        next: () => {
          this.router.navigate(['/students']);
        },
        error: (error) => {
          this.error = 'Error creating student';
          this.loading = false;
          alert('Failed to create student.');
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/students']);
  }
}