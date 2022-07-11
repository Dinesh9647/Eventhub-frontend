import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: any = []
  errorMessage = ''
  p: number = 1
  qParams: any = {}
  isEmpty: Boolean = false

  constructor(
    private eventService: EventsService, 
    private route: ActivatedRoute
  ) { 
    this.route.queryParams.subscribe((params) => {
      this.eventService.getEvents(params)
      .subscribe(
        res => {
          this.events = res.events
          this.isEmpty = (this.events.length === 0)
          // console.log(res.events)
        },
        err => {
          // console.log(err)
          this.errorMessage = err.error.errors[0]
        }
      )
    })
  }

  ngOnInit(): void {
  }
}
