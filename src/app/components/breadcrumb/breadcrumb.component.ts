import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.sass']
})
export class BreadcrumbComponent implements OnInit {

  @Input() breadCrumbArray2: Array<any> = [];
  private breadCrumbArray = ['Home','Cadastros'];
  public html = "";
  private count: number = 0;

  constructor() {

  }

  ngOnInit(): void {
    this.count = this.breadCrumbArray2.length;
  }

  addPage(page: string) {
    this.breadCrumbArray2.push(page);
  }

  removePage() {
    this.breadCrumbArray2.pop();
  }
}
