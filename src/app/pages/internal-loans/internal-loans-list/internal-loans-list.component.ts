import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/core/http/error.service';
import { RequestService } from 'src/app/core/http/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-internal-loans-list',
  templateUrl: './internal-loans-list.component.html',
  styleUrls: ['./internal-loans-list.component.scss']
})
export class InternalLoansListComponent implements OnInit {

  filter5: any;  
  page: number = 1;
  requests: any[] = [];

  constructor(
    private requestService: RequestService,
    private errorService: ErrorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showAll();
  }

  showAll(){
    this.requestService.showAll('Interno').subscribe(data => {      
      Object.assign(this.requests, data);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      })
    });
  }


  validateRequest(IdRequest:number){
    this.router.navigate(['/Assets/Internal-Loans/Validate/', IdRequest]);
  }

  detailsRequest(IdRequest:number){
    this.router.navigate(['/Assets/Internal-Loans/Details/', IdRequest]);
  }

}
