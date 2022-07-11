import { Component, OnInit } from '@angular/core';
import { TagsService } from '../services/tags.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: any = []
  chosenTags: Array<number> = []
  event_id: number | null = null

  constructor(
    private tagsService: TagsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.event_id = Number(params['id'])
    })
    this.tagsService.getTags()
    .subscribe(
      res => {
        this.tags = res.tags
        // console.log(this.tags)
      },
      err => {
        console.log(err)
      }
    )
  }

  addTag(event: any) {
    if (event.target.checked) {
      this.chosenTags.push(Number(event.target.id))
    }
    else {
      this.chosenTags = this.chosenTags.filter((tag: number) => tag !== Number(event.target.id))
    }
  }

  addTagstoEvent() {
    this.tagsService.setTags(this.event_id, this.chosenTags)
    .subscribe(
      res => {
        // console.log(res.event)
        this.router.navigate(['/admin/events'])
      },
      err => {
        console.log(err)
      }
    )
  }

}
