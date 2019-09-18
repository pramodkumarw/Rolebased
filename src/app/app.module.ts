import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RoutingModule} from "./app.routing"
import { HttpClientModule} from  "@angular/common/http"


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
   RoutingModule,
   HttpClientModule,
  ],
  providers: [
   ],
  bootstrap: [AppComponent]
})
export class AppModule { } 