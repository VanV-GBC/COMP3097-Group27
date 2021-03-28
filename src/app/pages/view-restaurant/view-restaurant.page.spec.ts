import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ViewRestaurantPageRoutingModule } from './view-restaurant-routing.module';

import { ViewRestaurantPage } from './view-restaurant.page';

describe('ViewRestaurantPage', () => {
  let component: ViewRestaurantPage;
  let fixture: ComponentFixture<ViewRestaurantPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ViewRestaurantPage],
        imports: [
          IonicModule.forRoot(),
          ViewRestaurantPageRoutingModule,
          RouterModule.forRoot([]),
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ViewRestaurantPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
