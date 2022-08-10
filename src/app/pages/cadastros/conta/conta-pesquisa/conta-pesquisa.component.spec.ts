import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaPesquisaComponent } from './conta-pesquisa.component';

describe('ContaPesquisaComponent', () => {
  let component: ContaPesquisaComponent;
  let fixture: ComponentFixture<ContaPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContaPesquisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
