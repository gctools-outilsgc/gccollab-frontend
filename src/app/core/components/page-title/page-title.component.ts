import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {

  // TODO: Change to breadcrumb
  public title: string[] = [];
  
  constructor(public router: Router, private activatedRoute: ActivatedRoute) {  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.title = this.getTitle(this.activatedRoute.root));
  }

  private getTitle(route: ActivatedRoute): string[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return [];
    }

    let title: string[] = [];
    for (const child of children) {

      const label = child.snapshot.data["breadcrumb"];

      if (label != undefined && label != null) {
        title.push(label);
      }
    }

    return title;
  }
}
