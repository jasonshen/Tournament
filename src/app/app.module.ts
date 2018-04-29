import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { ProcessImageService } from './process-image.service';
import { ApiService } from './api.service';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
    ],
    providers: [
        ProcessImageService,
        ApiService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
