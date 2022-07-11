import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { EventsService } from '../services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  form!: FormGroup
  categories: any = ["Coding", "Bootcamp", "Webinar", "Workshop"]
  selectedImage: File | null = null

  constructor(
    private fb: FormBuilder,
    private currecnyPipe: CurrencyPipe,
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      venue: ['', Validators.required],
      amount: ['', Validators.required],
      fees: [0],
      reg_start: ['', Validators.required],
      reg_end: ['', Validators.required],
      file: ['', Validators.required],
      image: [null]
    });

    this.form.valueChanges.subscribe((form) => {
      if (form.amount) {
        this.form.patchValue({
          amount: this.currecnyPipe.transform(form.amount.replace(/\D/g, ''), 'INR', 'symbol', '1.0-0')
        }, {emitEvent: false})
      }
    })
  }

  onFileChanged(event: any) {
    this.selectedImage = event.target.files[0]
    if(this.selectedImage) {
    const file_reader = new FileReader();
    file_reader.readAsDataURL(this.selectedImage);
    file_reader.onload = (e: any) => {
      if(this.form)
        this.form.value.image = file_reader.result;
    }
  }
  }

  submit() {
    const fees = parseFloat(this.form.value.amount.replace(/[₹,]+/g,""))
    this.form.value.fees = fees;
    // this.form.value.image = this.selectedImage
    // console.log(this.selectedImage);
    this.eventsService.createEvent(this.form.value)
    .subscribe(
      res => {
        // console.log(res)
        this.router.navigate(['admin/events', res.event.id, 'tags'])
      },
      err => {
        console.log(err)
      }
    )
  }

}
