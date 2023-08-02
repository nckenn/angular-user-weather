import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map, switchMap } from 'rxjs';
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

@Component({
  selector: 'app-random-users-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent, UserCardLoaderComponent],
  templateUrl: './random-users-list.component.html',
  styleUrls: ['./random-users-list.component.scss'],
})
export default class RandomUsersListComponent {
  #userApi = inject(UserService);
  #storageService = inject(LocalStorageService);
  #dialog = inject(DialogService);

  users$ = this.#userApi.getRandomUsers().pipe(
    map((users: UsersResponse) => {
      const existingUsers = this.#storageService.has('users')
        ? (this.#storageService.get('users') as User[])
        : [];
      users?.results.forEach((user: User) => {
        const matchedUser = existingUsers.find(
          (existingUser: User) => existingUser.login.uuid === user?.login.uuid
        );

        if (matchedUser) {
          user.isAdded = true;
        }
      });

      return {
        ...users,
      };
    })
  ) as Observable<UsersResponse>;

  readonly trackById = trackById;

  addUser(user: User) {
    const existingUsers = this.#storageService.has('users')
      ? (this.#storageService.get('users') as User[])
      : [];
    existingUsers.push(user);
    this.#storageService.set('users', existingUsers);
  }

  showWeather(user: User) {
    const dialogRef = this.#dialog.open(WeatherDetailsComponent, {
      closeButton: true,
      enableClose: false,
      windowClass: 'dialog',
      size: 'lg',
      // data is typed based on the passed generic
      data: {
        user: user,
      },
    });
  }
}
