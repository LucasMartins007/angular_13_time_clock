import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPfComponent } from './cadastrar-pf.component';

describe('CadastrarPfComponent', () => {
  let component: CadastrarPfComponent;
  let fixture: ComponentFixture<CadastrarPfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarPfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarPfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
