import { Component, OnInit, Input ,Output,EventEmitter} from '@angular/core';
import { TitlePipe } from '../pipes/title-pipe.pipe';
import { Book } from '../types/book';

@Component({
  selector:'book',
  styleUrls: ['app/css/app.component.css'],
  templateUrl:'app/html/book.component.html',
})

export class BookComponent{
  @Input() singleBook : Book;
  @Output() deleteBookObject = new EventEmitter();
  @Output() editBookObject = new EventEmitter();

  bookObject=new Book;

  emitSelectedBookToDelete(bookObject){
    this.deleteBookObject.emit(bookObject);
  }
  emitSelectedBookToEdit(bookObject,index){
    this.editBookObject.emit(bookObject);
  }
}
