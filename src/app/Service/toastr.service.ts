import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class Toastr {

  constructor(private toastr: ToastrService,) { }
  update(){
    this.toastr.success('Updated successfully!', 'Success',{ timeOut:3000,
      progressBar:true,
      progressAnimation:'decreasing',
      positionClass:'toast-top-right', 
      closeButton:true});
  
  }
  delete(){
    this.toastr.success('Delete successfully!', 'Delete',{ timeOut:3000,
      progressBar:true,
      progressAnimation:'decreasing',
      positionClass:'toast-top-right', 
      closeButton:true});
  
  }
  add(){
    this.toastr.success('Added successfully!', 'Added',{ timeOut:3000,
      progressBar:true,
      progressAnimation:'decreasing',
      positionClass:'toast-top-right', 
      closeButton:true});
  
  }

}
