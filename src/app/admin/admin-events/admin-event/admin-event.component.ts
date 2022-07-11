import { Component, OnInit } from '@angular/core';
import { AdminEventsService } from '../../services/admin-events.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['./admin-event.component.css']
})
export class AdminEventComponent implements OnInit {

  participants: any = []

  constructor(
    private eventService: AdminEventsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventService.getAllParticipants(params['id'])
      .subscribe(
        res => {
          this.participants = res.registrations
          console.log(this.participants)
        },
        err => {
          console.log(err)
        }
      )
    })
  }

}
