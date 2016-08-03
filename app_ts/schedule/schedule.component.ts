import {Component, OnInit, ChangeDetectorRef, Input} from '@angular/core';
import {HTTP_PROVIDERS}    from '@angular/http';
import {
  Schedule, Button, InputText, Calendar, Dialog, Checkbox, TabPanel, TabView,
  CodeHighlighter
} from "primeng/primeng";
import {EventService} from '../service/calendar.service';
import { Event} from '../content/order/event';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';


@Component({
  templateUrl: 'app_ts/schedule/schedule.html',
  styleUrls:['src/css/fullcalendar.css'],
  directives: [Schedule, Button, InputText, Calendar,
    Dialog, Checkbox, TabPanel, TabView, Button, CodeHighlighter, ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, EventService],

  styles: [`
        .ui-grid-row div {
          padding: 4px 10px
        }
        
        .ui-grid-row div label {
          font-weight: bold;
        }
  `]
})

export class ScheduleDemo implements OnInit {

  private events:Event[];
  header:any;
  moment:any;
  event:MyEvent;
  eve:any [];
  dialogVisible:boolean = false;
  idGen:number = 100;
  private errorMessage:string;
  private date:Date;

 
  constructor(private _eventService:EventService,
              private cd:ChangeDetectorRef,
              private _router: Router,
              private route: ActivatedRoute) {
  }


  getEvents() {
    this._eventService.getEvents()
      .subscribe(
        categories=>this.events = categories,
        error=>this.errorMessage = <any>error
      )
  }

  ngOnInit() {
    // this._eventService.getEvents().then(events => {this.events = events;});
    this.getEvents();

    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };
    this.date = new Date();
   
    console.log('date:'+this.date)
  
    

    // let event1: Event = new Event();
    // event1.id = 1;
    // event1.end='';
    // event1.start = '2016-01-13 18:10:00';
    // event1.title = 'eventTitle';
    // this.events=[];
    // this.events.push(event1);

    // this.events = [
    //   {
    //     "title": "Repeating Event",
    //     "start": "2016-07-13T18:10:00"
    //   },
    //   {
    //     "title": "All Day Event",
    //     "start": "2016-01-01"
    //   },
    //   {
    //     "title": "Long Event",
    //     "start": "2016-01-07",
    //     "end": "2016-01-10"
    //   },
    //   {
    //     "title": "Repeating Event",
    //     "start": "2016-01-09T16:00:00"
    //   }, 
    //   {
    //     "title": "MyEvent2",
    //     "start": "2016-01-16T16:00:00"
    //   },
    //   {
    //     "title": "MyEvent1",
    //     "start": "2016-01-19T16:00:00"
    //   },
    //   {
    //     "title": "Repeating Event",
    //     "start": "2016-01-16T16:00:00"
    //   },
    //   {
    //     "title": "Conference",
    //     "start": "2016-01-11",
    //     "end": "2016-01-13",
    //     "url": "http://localhost:3000/login"
    //   }
    // ];
  }

  handleDayClick(event:any) {
    console.log('handleDayClick');
    this.event = new MyEvent();
    this.event.start = event.date.format();
    this.dialogVisible = true;

    //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
    this.cd.detectChanges();
  }

  handleEventClick(e:any) {
    console.log('handleEventClick');
    this.event = new MyEvent();
    this.event.title = e.calEvent.title;

    let start = e.calEvent.start;
    let end = e.calEvent.end;
    if (e.view.name === 'month') {
      start.stripTime();
    }

    if (end) {
      end.stripTime();
      this.event.end = end.format();
    }

    this.event.id = e.calEvent.id;
    this.event.start = start.format();
    this.event.allDay = e.calEvent.allDay;
    // this.dialogVisible = true;
    console.log('url:'+ e.calEvent.url);
      console.log('id:'+ e.calEvent.orderId);
     this._router.navigate(['/content/manager', e.calEvent.orderId]);
  }

  saveEvent() {
    //update
    if (this.event.id) {
      let index:number = this.findEventIndexById(this.event.id);
      if (index >= 0) {
        // this.events[index] = this.event;
      }
    }
    //new
    else {
      this.event.id = this.idGen;
      // this.events.push(this.event);
      this.event = null;
    }

    this.displayEvents();

    this.dialogVisible = false;
  }

  private displayEvents() {
    this.events.forEach(element => {
      console.log('event:' + element.title + ', start:' + element);
    });
  }

  deleteEvent() {
    let index:number = this.findEventIndexById(this.event.id);
    if (index >= 0) {
      this.events.splice(index, 1);
    }
    this.dialogVisible = false;
  }

  findEventIndexById(id:number) {
    // console.log('findEventIndexById' + id);
    let index = -1;
    // for (let i = 0; i < this.events.length; i++) {
    //   if (id == this.events[i].id) {
    //     index = i;
    //     break;
    //   }
    // }

    return index;
  }
}

export class MyEvent {
  id:number;
  title:string;
  start:string;
  end:string;
  allDay:boolean = true;
}


