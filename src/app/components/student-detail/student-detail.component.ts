import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  student: Student = {
    first_name: '',
    last_name: '',
    email: '',
    roll_number: '',
    course: ''
  };
  loading = false;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadStudent(params['id']);
      }
    });
  }

  loadStudent(id: number) {
    this.loading = true;
    this.studentService.getStudent(id).subscribe({
      next: (data) => {
        this.student = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading student:', error);
        this.loading = false;
        alert('Failed to load student details.');
      }
    });
  }

  editStudent() {
    this.router.navigate(['/students/edit', this.student.id]);
  }

  deleteStudent() {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(this.student.id!).subscribe({
        next: () => {
          this.router.navigate(['/students']);
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          alert('Failed to delete student.');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/students']);
  }
}