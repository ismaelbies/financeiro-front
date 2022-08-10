import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagamentoPesquisaComponent } from './forma-pagamento-pesquisa.component';

describe('FormaPagamentoPesquisaComponent', () => {
  let component: FormaPagamentoPesquisaComponent;
  let fixture: ComponentFixture<FormaPagamentoPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaPagamentoPesquisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormaPagamentoPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
