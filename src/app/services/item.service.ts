import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  
  url:string='http://localhost:3000/items/';

  httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  items:Item[] = [
    {
      id: 0,
      title: 'manzana',
      price: 20,
      quantity: 4,
      completed: false
    },
    {
      id: 1,
      title: 'leche',
      price: 20,
      quantity: 4,
      completed: true
    }
  ];

  constructor(private http:HttpClient) { }

  //Observable
  //Metodos HTTP
  getItems():Observable<Item[]>{
    //return this.items;
    return this.http.get<Item[]>(this.url);
  }

  addItem(item:Item):Observable<Item>{
    //this.items.unshift(item);
    console.log('holaaaa')
    return this.http.post<Item>(this.url, item, this.httpOptions);
  }

  toggleItem(item:Item):Observable<Item>{
    return this.http.put<Item>(this.url + item.id, item, this.httpOptions);
  }

  deleteItem(item:Item):Observable<Item>{
    return this.http.delete<Item>(this.url + item.id);
  }
}
