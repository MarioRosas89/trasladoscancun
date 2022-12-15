import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, forkJoin, map, Observable, shareReplay, startWith, switchMap } from 'rxjs';
import * as moment from 'moment';
import { MatOption, ThemePalette } from '@angular/material/core';
import { Places } from './Places';
import { MatDialog } from '@angular/material/dialog';
import { MyModalComponent } from '../my-modal/my-modal.component';
import { Ticket } from './Ticket';
import { NavigationExtras, Router } from '@angular/router';
import { PlacesService } from './place.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.css']
})

export class HomeComponent implements OnInit {
  myControl = new FormControl();
  optionsPlaces: string[] = [];
   tickets!: Ticket[];
   places!: Places[];
  optionsFull: string[] = []
  filteredOptions!: Observable<string[]>;
  @ViewChild('picker') picker: any;
  @ViewChild('pickerFrom') pickerFrom: any;

  //Empieza datepicker
  todayDate:Date = new Date();
  public dateFrom = "";
  public dateTo = "";
  public from = "";
  public to = "";
  public date!: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate!: moment.Moment;
  public maxDate!: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public dateControl = new FormControl(new Date(2021,9,4,5,6,7));
  public dateControlMinMax = new FormControl(new Date());
  //Termina datepicker
  private _placesData$ = new BehaviorSubject<void>(undefined);
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, public dialog: MatDialog
  ,private _router: Router, private userService: PlacesService){
    
  }

  public placesRequest$ = this.http.get<string[]>(this.baseUrl + 'transports').pipe(
    map((value: any) => {
      return value?.data.map((player: any) => ({
        name: player.name,
      }));
    }),
    shareReplay(1),
  );

  public places$ = this._placesData$.pipe(
    switchMap(() => this.placesRequest$),
    shareReplay(1)
  );

  getPlaces(){
    this.userService.getPlaces().subscribe({
      next : (result) => {this.optionsPlaces = result.map(x => x.name)
        this.optionsFull = result.map(x => x.name)
        this.places = result;
      }, 
      error : (error) => console.error(error)
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '250px',
      data: { color: this.color }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.color = res;
    });
  }
  
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.getPlaces();
    const currentYear = moment().year();
    this.minDate = moment([currentYear, 0, 1]);
  }

  OnHumanSelectedFrom(option: MatOption) {
    console.log(option.value);
    this.from = option.value;
    this.searchTransport();
  }

  OnSelectedTo(option: MatOption) {
    console.log(option.value);
    this.to = option.value;
    this.searchTransport();
  }

  searchTransport(){
    if(this.to != "" && this.from != ""){
      let response1 = this.http.get<Ticket[]>(this.baseUrl + 'ticket?fromPlace='+this.from+"&toPlace="
      +this.to);
      
     forkJoin([response1
    ]).pipe(map(([tickets]) => tickets.map(ticket => 
        {
          return {
            "id": ticket.id,
            "price": ticket.price,
            "fromIdPlace": +this.from,
            "toIdPlace": +this.to,
            "from": this.from,
            "to": this.to,
            "name": "",
            "dateFrom": new Date(),
            "phoneNumber": ""
          } 
        })
    )).subscribe(res => {
      this.tickets = res;
      console.log ('User and Post', res);
    });
    }
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const index = this.optionsPlaces.indexOf(value);
    if (index > -1) {
      this.optionsPlaces.splice(index, 1);
    }
    return this.optionsPlaces.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onKeyPress(event: KeyboardEvent): void {
    var k = event.key;
    if(k == "Backspace"){
      this.optionsPlaces = this.optionsFull;
    }
    if(this.optionsFull.length == 0)
      this.getPlaces();
 }
  save() { 
    var datef = this.dateFrom;
    var dateTo = this.dateTo;
    var from = this.from;
    var to = this.to;
    if(this.to == "" || this.from == "" || this.dateFrom == ""){
      
      this.openDialog();
      return;
    }
    else {
      this._router.navigate(['create-reservation'], {
        queryParams: {
          dateFrom: datef, dateTo: dateTo, from: from, to: to, name: '', price: this.tickets[0].price
        }
      });
    }
    
    
  }
}


