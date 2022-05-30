import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor() { }
  public loadJsFile(url:any) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }
  showErrorDialog() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please Login !!!',
    });
  }
}
