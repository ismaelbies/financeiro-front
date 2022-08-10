import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoCreditoCadastroComponent } from './cartao-credito-cadastro.component';

describe('CartaoCreditoCadastroComponent', () => {
  let component: CartaoCreditoCadastroComponent;
  let fixture: ComponentFixture<CartaoCreditoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaoCreditoCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaoCreditoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
