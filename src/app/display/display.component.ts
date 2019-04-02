import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock';
import { User, DisplayService } from './display.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  heroes = HEROES;
  selectedHero: Hero;
  user: User;
  constructor(
  private displayService: DisplayService,

  ){

  }

  ngOnInit() {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  showJson() {
    this.displayService.getJson().subscribe((data: User) =>{
        debugger
        this.user = {
          name: data['name'],
          age: data['Age'],
          address: data['Address']
        }
      } 
      );
  }
  

}
