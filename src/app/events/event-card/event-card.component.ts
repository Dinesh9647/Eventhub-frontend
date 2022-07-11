import { Component, OnInit, Input } from '@angular/core';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  @Input() eventTags: any;
  registered: Boolean = false;

  constructor(
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.registered = this.registrationService.registeredEvent(this.eventTags.event.id)
  }

}
