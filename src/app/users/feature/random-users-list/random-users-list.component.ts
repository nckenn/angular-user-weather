import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BehaviorSubject,
  Observable,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { UserCardComponent } from '../../../shared/ui/user-card/user-card.component';
import { trackById } from '../../../shared/utils';
import { LocalStorageService } from '../../../shared/services/storage.service';
import { UserService } from '../../data-access/user.service';
import {
  User,
  UsersResponse,
} from 'src/app/shared/data-access/api/models/user.interface';
import { UserCardLoaderComponent } from 'src/app/shared/ui/user-card-loader/user-card-loader.component';
import { DialogService } from '@ngneat/dialog';
import { WeatherDetailsComponent } from '../weather-details/weather-details.component';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-random-users-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent, UserCardLoaderComponent],
  templateUrl: './random-users-list.component.html',
  styleUrls: ['./random-users-list.component.scss'],
})
export default class RandomUsersListComponent implements OnInit {
  #userApi = inject(UserService);
  #storageService = inject(LocalStorageService);
  #dialog = inject(DialogService);
  #toast = inject(HotToastService);

  allUsers$ = new BehaviorSubject<User[]>([]);
  pagination$ = new BehaviorSubject<number>(1);

  users$ = this.pagination$.pipe(
    switchMap((page) => {
      return this.#userApi.getRandomUsers(page).pipe(
        map((users: UsersResponse) => {
          const existingUsers = this.#storageService.has('users')
            ? (this.#storageService.get('users') as User[])
            : [];
          users?.results.forEach((user: User) => {
            const matchedUser = existingUsers.find(
              (existingUser: User) =>
                existingUser.login.uuid === user?.login.uuid
            );

            if (matchedUser) {
              user.isAdded = true;
            }
          });

          return {
            ...users,
          };
        }),
        tap((users: UsersResponse) => {
          this.allUsers$.next([...this.allUsers$.value, ...users?.results]);
        })
      );
    })
  );
  readonly trackById = trackById;

  ngOnInit(): void {}

  addUser(user: User) {
    const existingUsers = this.#storageService.has('users')
      ? (this.#storageService.get('users') as User[])
      : [];

    const matchedUser = existingUsers.find(
      (existingUser: User) => existingUser.login.uuid === user?.login.uuid
    );

    if (matchedUser) {
      this.#toast.warning('User already saved.');
      return;
    }

    existingUsers.push(user);
    this.#storageService.set('users', existingUsers);

    this.#toast.success('Successfully saved.');
  }

  showWeather(user: User) {
    const dialogRef = this.#dialog.open(WeatherDetailsComponent, {
      closeButton: true,
      enableClose: false,
      size: 'lg',
      data: {
        user: user,
      },
    });
  }

  loadMore() {
    this.pagination$.next(this.pagination$.value + 1);
  }
}
