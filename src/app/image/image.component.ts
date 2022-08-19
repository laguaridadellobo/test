import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
//import {PostI} from "../../../shared/models/post.interface";
import { HttpClient } from '@angular/common/http';
import { ServiceImagenService } from '../service/service-imagen.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  [x: string]: any;
  private image:any;
  public prev: any;
  public archivos:any = [];
  public previsualizacion:string = '';

  
    shortLink: string = "";
    loading: boolean = false;
    file: string = ""; // Variable to store file
  
  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private imagenService: ServiceImagenService) { }

  public newPostGroup = new FormGroup({
    imagePost: new FormControl('', Validators. required),
  });
  ngOnInit(): void {
  }
  extraerBase64 = async($event :any) => new Promise((resolve, reject) => {
    try{
      const unsafeImg  = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    }catch(e){
    }
  });

  onChange(event: any) {
   this.file = event.target.files[0];
    
    this.extraerBase64(this.file).then( (imagen: any) => {
      this.prev = imagen.base;
      console.log(imagen);
    })
     
  }


  onUpload() {
    this.loading = !this.loading;
    console.log("imagens");
    console.log(this.file);
    this.imagenService.upload(this.file).subscribe(auctionfindSpecificSaleDB =>{
      console.log("exitosss");
      this.loading = false; // Flag variable

      this.extraerBase64(this.file).then( (imagen: any) => {

        console.log(imagen);
        this.previsualizacion = imagen.base;
      });
    }
  );
}


  
}