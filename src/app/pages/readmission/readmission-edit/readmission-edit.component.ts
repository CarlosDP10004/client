import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/core/http/error.service';
import { ReadmisionService } from 'src/app/core/http/readmision.service';

@Component({
  selector: 'app-readmission-edit',
  templateUrl: './readmission-edit.component.html',
  styleUrls: ['./readmission-edit.component.scss']
})
export class ReadmissionEditComponent implements OnInit {
  editReadmisionForm: FormGroup;
  event: EventEmitter<any>=new EventEmitter();
  id: number;

  constructor(
    private bsModalRef: BsModalRef,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private readmisionService: ReadmisionService,
    private errorService: ErrorService
  ) {
    this.editReadmisionForm = this.builder.group({     
      EsDevuelto: new FormControl(false, []),
      Comentarios: new FormControl('', [])
    });
    

    this.readmisionService.IdReadmision.subscribe(data => {
      this.id = data;      
    });
   }

  ngOnInit(): void {
  }

  guardarSeguimiento(){
    let postData = {
      'EsDevuelto': this.editReadmisionForm.get('EsDevuelto').value,
      'Comentarios': this.editReadmisionForm.get('Comentarios').value
    };
    this.readmisionService.editReadmision(this.id, postData).subscribe(data=>{
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
