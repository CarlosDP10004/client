import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/core/http/error.service';
import { RequestService } from 'src/app/core/http/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-external-loans-list',
  templateUrl: './external-loans-list.component.html',
  styleUrls: ['./external-loans-list.component.scss']
})
export class ExternalLoansListComponent implements OnInit {

  filter5: any;  
  page: number = 1;
  requests: any[] = [];

  number: number = 10;
  pageSize = 10;
  pageSizes = [10,20,30,50,100];
  sizeI:number;

  constructor(
    private requestService: RequestService,
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
    this.requestService.showAll('Externo').subscribe(data => {      
      Object.assign(this.requests, data);
      console.log(this.requests);
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

  validateRequest(IdRequest:number){
    this.router.navigate(['/Assets/External-Loans/Validate/', IdRequest]);
  }

  detailsRequest(IdRequest:number){
    this.router.navigate(['/Assets/External-Loans/Details/', IdRequest]);
  }

}
