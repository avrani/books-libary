import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }  from '@angular/http';
import { AppComponent }   from './components/app.component';
import { BookComponent }   from './components/book.component';
import { TitlePipe } from './pipes/title-pipe.pipe';
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,BookComponent,TitlePipe
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
