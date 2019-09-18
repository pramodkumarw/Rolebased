import { Component , OnInit, OnDestroy, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef } from "@angular/core";
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnDestroy {

  constructor(private title:Title,private route:Router){
  }  
  ngOnDestroy(){}

 

}






