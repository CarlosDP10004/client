import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AssignmentService } from 'src/app/core/http/assignment.service';
import { ErrorService } from 'src/app/core/http/error.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assignment-remove',
  templateUrl: './assignment-remove.component.html',
  styleUrls: ['./assignment-remove.component.scss']
})
export class AssignmentRemoveComponent implements OnInit {
  removeAssignmentForm: FormGroup;
  event: EventEmitter<any>=new EventEmitter();
  id: number;

  constructor(
    private bsModalRef: BsModalRef,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private assignmentService: AssignmentService,
    private errorService: ErrorService
  ) {
    this.removeAssignmentForm = this.builder.group({      
      Comentario: new FormControl('', [])
    });
    

    this.assignmentService.IdAsignacion.subscribe(data => {
      this.id = data;      
      console.log(this.id);
    });
   }

  ngOnInit(): void {
  }

  removerAsignacion(){
    let postData = {
      'Comentario': this.removeAssignmentForm.get('Comentario').value
    };
    this.assignmentService.removeAssignment(this.id, postData).subscribe(data=>{
      if(data!=null){
        this.event.emit('OK');        
        this.toastr.success(data.toString());
        this.bsModalRef.hide();
      }
    }, (error)=>{      
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
