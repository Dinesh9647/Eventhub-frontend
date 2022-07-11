import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TagsService } from '../services/tags.service';

@Component({
  selector: 'app-events-filter',
  templateUrl: './events-filter.component.html',
  styleUrls: ['./events-filter.component.css']
})
export class EventsFilterComponent implements OnInit {

  categories: Array<String> = ["Coding", "Bootcamp", "Webinar", "Workshop"]
  allStatus: Array<String> = ["Upcoming", "Archived"]
  activeCategory: String = ''
  activeStatus: String = 'Upcoming'
  tags: any = []
  checkedTags = new Set()

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private tagsService: TagsService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        console.log("Here")
        if (params.hasOwnProperty('category')) { this.activeCategory = params['category'] }
        else this.activeCategory = ''
        if (params.hasOwnProperty('sub_category')) { this.activeStatus = params['sub_category'] }
        else this.activeStatus = 'Upcoming'
        this.checkedTags.clear()
        if (params.hasOwnProperty('tags')) {
          const tagIds = params['tags']
          for(let i = 0; i < tagIds.length; i++) {
            this.checkedTags.add(Number(tagIds[i]))
          }
        }
      }
    );
    this.tagsService.getTags()
    .subscribe(
      res => {
        this.tags = res.tags
        // console.log(this.tags)
      },
      err => {
        // console.log(err)
      }
    )
  }

  addCategory(event: any) {
    this.router.navigate(
      ['/events'], 
      { 
        queryParams: { category: event.target.value }, 
        queryParamsHandling: 'merge'
      }
    );
  }

  addStatus(event: any) {
    this.router.navigate(
      ['/events'], 
      { 
        queryParams: { sub_category: event.target.value }, 
        queryParamsHandling: 'merge'
      }
    );
  }

  addTags(event: any) {
    if(event.target.checked) {
      this.checkedTags.add(Number(event.target.id))
    }
    else {
      this.checkedTags.delete(Number(event.target.id))
    }
    this.router.navigate(
      ['/events'], 
      { 
        queryParams: { tags: (this.checkedTags.size > 0 ? [...this.checkedTags] : null) }, 
        queryParamsHandling: 'merge'
      }
    )
  }
}
