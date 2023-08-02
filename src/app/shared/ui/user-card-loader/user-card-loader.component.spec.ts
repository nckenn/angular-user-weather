import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardLoaderComponent } from './user-card-loader.component';

describe('UserCardLoaderComponent', () => {
  let component: UserCardLoaderComponent;
  let fixture: ComponentFixture<UserCardLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserCardLoaderComponent]
    });
    fixture = TestBed.createComponent(UserCardLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
