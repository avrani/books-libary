import { Injectable }     from '@angular/core';
import { Http} from '@angular/http';

@Injectable()

export class BooksLibaryService{
  constructor(protected http: Http) {}
  getLibraryBooksFromServer() {
    return this.http.get('http://www.avrani.com/booksLibary.php').toPromise().then(response => this.handleResponse(response));
  }
  handleResponse(response){
    return response.json();
  }
}
