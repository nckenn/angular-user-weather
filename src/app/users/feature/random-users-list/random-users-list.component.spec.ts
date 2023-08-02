import { ComponentFixture, TestBed } from '@angular/core/testing';

import RandomUsersListComponent from './random-users-list.component';

describe('RandomUsersListComponent', () => {
  let component: RandomUsersListComponent;
  let fixture: ComponentFixture<RandomUsersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RandomUsersListComponent],
    });
    fixture = TestBed.createComponent(RandomUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
