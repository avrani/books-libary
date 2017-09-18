"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var books_libary_service_1 = require("../services/books-libary.service");
var book_1 = require("../types/book");
require("rxjs/add/operator/toPromise");
var AppComponent = (function () {
    function AppComponent(booksLibaryService) {
        this.booksLibaryService = booksLibaryService;
        this.bookObject = new book_1.Book;
        this.newBookObject = new book_1.Book;
        this.newTitleAllreadyExist = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.booksLibaryService.getLibraryBooksFromServer()
            .then(function (libraryBooks) { return _this.handleResponse(libraryBooks); });
    };
    AppComponent.prototype.bindSelectedBookToDeleteModal = function (bookObjectToDelete) {
        this.bookObject = bookObjectToDelete;
    };
    AppComponent.prototype.bindSelectedBookToEditModal = function (bookObjectToEdit, index) {
        this.bookObject = bookObjectToEdit;
        this.indexSelectedBook = index;
    };
    AppComponent.prototype.handleResponse = function (libraryBooks) {
        this.libraryBooks = libraryBooks;
    };
    AppComponent.prototype.deleteBook = function (bookObjectToDelete) {
        for (var i in this.libraryBooks) {
            if (this.libraryBooks[i].title == bookObjectToDelete.title) {
                this.libraryBooks.splice(i, 1);
            }
        }
    };
    AppComponent.prototype.preventDupTitleInEdit = function () {
        this.duplicateTitle = false;
        this.bookObject.title = this.bookObject.title.charAt(0).toUpperCase() + this.bookObject.title.slice(1).toLowerCase();
        this.bookObject.title = this.bookObject.title.replace(/[^a-zA-Z ]/g, "");
        for (var i in this.libraryBooks) {
            this.libraryBooks[i].title = this.libraryBooks[i].title.charAt(0).toUpperCase() + this.libraryBooks[i].title.slice(1).toLowerCase();
            this.libraryBooks[i].title = this.libraryBooks[i].title.replace(/[^a-zA-Z ]/g, "");
            if ((this.libraryBooks[i].title == this.bookObject.title) && (i != this.indexSelectedBook)) {
                this.duplicateTitle = true;
            }
        }
    };
    AppComponent.prototype.isTitleAllreadyExist = function () {
        this.newTitleAllreadyExist = false;
        this.newBookObject.title = this.newBookObject.title.charAt(0).toUpperCase() + this.newBookObject.title.slice(1).toLowerCase();
        this.newBookObject.title = this.newBookObject.title.replace(/[^a-zA-Z ]/g, "");
        for (var i in this.libraryBooks) {
            this.libraryBooks[i].title = this.libraryBooks[i].title.charAt(0).toUpperCase() + this.libraryBooks[i].title.slice(1).toLowerCase();
            this.libraryBooks[i].title = this.libraryBooks[i].title.replace(/[^a-zA-Z ]/g, "");
            if (this.libraryBooks[i].title == this.newBookObject.title) {
                this.newTitleAllreadyExist = true;
            }
        }
    };
    AppComponent.prototype.addNewBook = function () {
        this.libraryBooks.push(this.newBookObject);
    };
    AppComponent.prototype.clearAddForm = function () {
        this.newBookObject = new book_1.Book;
    };
    AppComponent.prototype.saveEdit = function () {
        this.libraryBooks[this.indexSelectedBook] = this.bookObject;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        styleUrls: ['app/css/app.component.css'],
        templateUrl: 'app/html/app.component.html',
        providers: [books_libary_service_1.BooksLibaryService]
    }),
    __metadata("design:paramtypes", [books_libary_service_1.BooksLibaryService])
], AppComponent);
exports.AppComponent = AppComponent;
