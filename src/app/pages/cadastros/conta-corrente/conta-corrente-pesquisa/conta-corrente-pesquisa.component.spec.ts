import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaCorrentePesquisaComponent } from './conta-corrente-pesquisa.component';

describe('ContaCorrentePesquisaComponent', () => {
  let component: ContaCorrentePesquisaComponent;
  let fixture: ComponentFixture<ContaCorrentePesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContaCorrentePesquisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaCorrentePesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
