import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { RegistrationService } from '../services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event: any = {}
  tags: any = []
  registeredEvent: any = false

  constructor(
    private eventsService: EventsService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: TokenStorageService,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventsService.getEvent(params['id'])
      .subscribe(
        res => {
          this.event = res.eventTags.event
          this.tags = res.eventTags.tags
          this.registeredEvent = this.registrationService.registeredEvent(this.event.id)
          // console.log(this.eventTags)
        },
        err => {
          console.log(err)
        }
      )
    })
  }

  registerEvent() {
    if (this.auth.loggedIn()) {
      const user = this.auth.getUser()
      console.log(user);
      this.registrationService.registerEvent(user.id, this.event.id)
      .subscribe(
        res => {
          console.log(res.messages)
          window.location.reload()
        },
        err => {
          console.log(err)
        }
      )
    } 
    else {
      this.router.navigate(['/login'])
    }
  }

}
