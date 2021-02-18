import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddgametresPage } from './addgametres.page';

describe('AddgametresPage', () => {
  let component: AddgametresPage;
  let fixture: ComponentFixture<AddgametresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddgametresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddgametresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
