import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  timeout: number = 2000

  constructor(public toasterService: MatSnackBar) { 
    
  }

  displayMessage(message: string) {
    this.toasterService.open(message, "x", {
      duration: this.timeout
    })
  }

}
