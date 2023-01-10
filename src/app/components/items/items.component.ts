import { Component, OnInit } from '@angular/core';
import {Item} from '../../models/item';
import { ItemService } from 'src/app/services/item.service';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  //Variables para este componente
  //El tipo de dato es Item es personalizado en un modelo
  items: Item[] = [];
  total:number = 0;

  //Dar de alta las importaciones
  constructor(private itemService:ItemService) { }

  //Metodo del ciclo de vida de Angular para inicializar
  ngOnInit(): void {
    //this.items = [];
    //this.items = this.itemService.getItems();
    this.itemService.getItems().subscribe(
      data => {
        this.items = data;
        this.getTotal();
      }
    )
  }

  //Metodos
  deleteItem(item:Item){
    this.items = this.items.filter(data => data.id != item.id);
    this.itemService.deleteItem(item).subscribe();
    this.getTotal();
  }

  toggleItem(item:Item){
    this.itemService.toggleItem(item).subscribe();
    this.getTotal();
  }

  getTotal(){
    this.total = this.items
    .filter(item => !item.completed)
    .map(item => item.quantity * item.price)
    .reduce((acc, item)=> acc+=item, 0);
  }

}
