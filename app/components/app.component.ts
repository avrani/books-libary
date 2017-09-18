import { Component, OnInit, Input } from '@angular/core';
import { BooksLibaryService }from '../services/books-libary.service';
import { TitlePipe } from '../pipes/title-pipe.pipe';
import { Book } from '../types/book';
import 'rxjs/add/operator/toPromise';

@Component({
  selector:'my-app',
  styleUrls: ['app/css/app.component.css'],
  templateUrl:'app/html/app.component.html',
  providers: [ BooksLibaryService ]
})

export class AppComponent implements OnInit{

  libraryBooks:any;
  bookObject=new Book;
  newBookObject=new Book;
  indexSelectedBook;
  duplicateTitle:boolean;
  newTitleAllreadyExist=false;

  constructor (private booksLibaryService:BooksLibaryService){}

  ngOnInit(){
    this.booksLibaryService.getLibraryBooksFromServer()
    .then(libraryBooks =>this.handleResponse(libraryBooks));
  }

  bindSelectedBookToDeleteModal(bookObjectToDelete){
    this.bookObject=bookObjectToDelete;
  }
  bindSelectedBookToEditModal(bookObjectToEdit,index){
    this.bookObject=bookObjectToEdit;
    this.indexSelectedBook=index;
  }
  handleResponse(libraryBooks){
    this.libraryBooks=libraryBooks;
  }

  deleteBook(bookObjectToDelete){
    for(let i in this.libraryBooks){
      if(this.libraryBooks[i].title==bookObjectToDelete.title){
        this.libraryBooks.splice(i,1);
      }
    }
  }

  preventDupTitleInEdit(){
    this.duplicateTitle=false;
    this.bookObject.title=this.bookObject.title.charAt(0).toUpperCase() + this.bookObject.title.slice(1).toLowerCase();
    this.bookObject.title=this.bookObject.title.replace(/[^a-zA-Z ]/g,"");
    for(let i in this.libraryBooks){
      this.libraryBooks[i].title=this.libraryBooks[i].title.charAt(0).toUpperCase() + this.libraryBooks[i].title.slice(1).toLowerCase();
      this.libraryBooks[i].title=this.libraryBooks[i].title.replace(/[^a-zA-Z ]/g,"");
      if((this.libraryBooks[i].title==this.bookObject.title )&& (i!=this.indexSelectedBook )){
        this.duplicateTitle=true;
      }
    }
  }

  isTitleAllreadyExist(){
    this.newTitleAllreadyExist=false;
    this.newBookObject.title=this.newBookObject.title.charAt(0).toUpperCase() + this.newBookObject.title.slice(1).toLowerCase();
    this.newBookObject.title=this.newBookObject.title.replace(/[^a-zA-Z ]/g,"");
    for(let i in this.libraryBooks){
      this.libraryBooks[i].title=this.libraryBooks[i].title.charAt(0).toUpperCase() + this.libraryBooks[i].title.slice(1).toLowerCase();
      this.libraryBooks[i].title=this.libraryBooks[i].title.replace(/[^a-zA-Z ]/g,"");
      if(this.libraryBooks[i].title==this.newBookObject.title){
        this.newTitleAllreadyExist=true;
      }
    }
  }

  addNewBook(){
    this.libraryBooks.push(this.newBookObject);
  }
  clearAddForm(){
    this.newBookObject=new Book;
  }
  saveEdit(){
    this.libraryBooks[this.indexSelectedBook]=this.bookObject;
  }
}
