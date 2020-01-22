import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

import {User} from "@/_models";
import {AuthenticationService} from "@/_services";
import {BookService} from "@/_services/book.service";

@Component({ templateUrl: 'books.component.html' })
export class BookComponent implements OnInit {
  bookForm = this.fb.group({
    name: [ '', Validators.required ],
    pages_count: [ '', Validators.required ],
    author: [ '', Validators.required ],
    publisher : [ '', Validators.required ]
  });

  public books = [];
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private bookService: BookService,
    private fb: FormBuilder
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.bookService.getAll()
      .subscribe(
        data => {
          this.books = data;
        },
        error => {
          console.log(error);
        });
  }

  deleteBook(id: number) {
    this.bookService.delete(id)
      .pipe(first());
  }

  onSubmit() {
    const book = {
      name: this.bookForm.controls.name.value,
      pages_count: this.bookForm.controls.pages_count.value,
      author: this.bookForm.controls.author.value,
      publisher: this.bookForm.controls.publisher.value
    };

    this.bookService.addBook(book)
      .subscribe(
        data => {
          this.books.push(data);
        },
        error => {
          console.log(error);
        });
  }
}
