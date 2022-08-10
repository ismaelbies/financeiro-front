import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaCorrenteCadastroComponent } from './conta-corrente-cadastro.component';

describe('ContaCorrenteCadastroComponent', () => {
  let component: ContaCorrenteCadastroComponent;
  let fixture: ComponentFixture<ContaCorrenteCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContaCorrenteCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaCorrenteCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
