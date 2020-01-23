import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

import {User} from "@/_models";
import {AuthenticationService} from "@/_services";
import {BookService} from "@/_services/book.service";
import {Router} from "@angular/router";

import "./book.component.css";

@Component({ templateUrl: 'books.component.html' })
export class BookComponent implements OnInit {
  bookForm = this.fb.group({
    first_name: [ '', Validators.required ],
    last_name: [ '', Validators.required ],
    patronymic_name: [ '', Validators.required ],
    phone : [ '', Validators.required ],
    subject: [ '', Validators.required ],
    about: [ '', Validators.required ]

  });

  public books = [];
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private bookService: BookService,
    private router: Router,
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
      .subscribe(first());
       this.router.navigate(['/']);
  }

  onSubmit() {
    const book = {
      first_name: this.bookForm.controls.first_name.value,
      last_name: this.bookForm.controls.last_name.value,
      patronymic_name: this.bookForm.controls.patronymic_name.value,
      phone: this.bookForm.controls.phone.value,
       subject: this.bookForm.controls.subject.value,
        about: this.bookForm.controls.about.value
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
