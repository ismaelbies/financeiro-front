import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaCadastroComponent } from './conta-cadastro.component';

describe('ContaCadastroComponent', () => {
  let component: ContaCadastroComponent;
  let fixture: ComponentFixture<ContaCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContaCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
