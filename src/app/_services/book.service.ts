import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { map } from "rxjs/operators";
import {Book} from "@/_models";

@Injectable({ providedIn: 'root' })
export class BookService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Book[]>(`${config.apiUrl}/book`)
            .pipe(map(response => {
                return response;
            }));
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/book/${id}`);
    }

    addBook(book) {
        return this.http.post(`${config.apiUrl}/book/`, book);
    }
}