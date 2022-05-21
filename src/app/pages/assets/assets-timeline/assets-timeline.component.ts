import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AssetsService } from 'src/app/core/http/assets.service';
import { ErrorService } from 'src/app/core/http/error.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assets-timeline',
  templateUrl: './assets-timeline.component.html',
  styleUrls: ['./assets-timeline.component.scss']
})
export class AssetsTimelineComponent {
  detailTrace: FormGroup;
  trace: any[] = [];

  constructor(
    private assetService: AssetsService,
    private route: ActivatedRoute,
    private errorService: ErrorService,
  ) { 
    this.showAll();
  }

  showAll() {
    let IdAsset = this.route.snapshot.paramMap.get("id");
    this.assetService.getTraceAsset(IdAsset).subscribe(data => {
      Object.assign(this.trace, data);
      console.log(this.trace);
    }, error =>{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });
  }


}
