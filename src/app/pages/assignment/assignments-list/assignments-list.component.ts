import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentService } from 'src/app/core/http/assignment.service';
import { ErrorService } from 'src/app/core/http/error.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assignments-list',
  templateUrl: './assignments-list.component.html',
  styleUrls: ['./assignments-list.component.scss']
})
export class AssignmentsListComponent implements OnInit {

  filter4: any;  
  page: number = 1;
  assignments: any[] = [];

  number: number = 10;
  pageSize = 10;
  pageSizes = [10,20,30,50,100];
  sizeI:number;

  constructor(
    private assignmentService: AssignmentService,
    private errorService: ErrorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showAll();
  }

  seleccion(sizeI:number){
    console.log(sizeI);
    this.number = sizeI;
    console.log(sizeI);
  }

  showAll(){
    this.assignmentService.showAll().subscribe(data => {      
      Object.assign(this.assignments, data);
    }, error => {
      Swal.fire({
        icon: [401, 403].indexOf(error.status) ? 'info' : 'error',
        title: [401, 403].indexOf(error.status) ? 'Información' : 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      })
    });
  }

  editAssignment(IdAssignment:number){
    this.router.navigate(['/Assets/Assignments/Edit/', IdAssignment]);
  }

  validateAssignment(IdAssignment:number){
    this.router.navigate(['/Assets/Assignments/Validate/', IdAssignment]);
  }

  detailsAssignment(IdAssignment:number){
    this.router.navigate(['/Assets/Assignments/Details/', IdAssignment]);
  }

  reAssignment(IdAssignment:number){
    this.router.navigate(['/Assets/Assignments/Reasign/', IdAssignment]);
  }

}
