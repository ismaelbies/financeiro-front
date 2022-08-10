import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoCreditoPesquisaComponent } from './cartao-credito-pesquisa.component';

describe('CartaoCreditoPesquisaComponent', () => {
  let component: CartaoCreditoPesquisaComponent;
  let fixture: ComponentFixture<CartaoCreditoPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaoCreditoPesquisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaoCreditoPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
