import { Component, OnInit } from '@angular/core';
import { AdminEventsService } from '../../services/admin-events.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {

  events: any = []

  constructor(
    private eventService: AdminEventsService
  ) {
    this.eventService.getAllEvents()
    .subscribe(
      res => {
        this.events = res.events
        // console.log(this.events)
      },
      err => {
        console.log(err)
      }
    )
  }

  ngOnInit(): void {
  }


}
