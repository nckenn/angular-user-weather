import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../data-access/user.service';
import { LocalStorageService } from 'src/app/shared/services/storage.service';
import { User } from 'src/app/shared/data-access/api/models/user.interface';
import { UserCardComponent } from 'src/app/shared/ui/user-card/user-card.component';
import { trackById } from 'src/app/shared/utils';
import { Observable, Subject, of, startWith, switchMap } from 'rxjs';
import { DialogService } from '@ngneat/dialog';
import { WeatherDetailsComponent } from '../weather-details/weather-details.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersListComponent {
  #userApi = inject(UserService);
  #storageService = inject(LocalStorageService);
  #cdr = inject(ChangeDetectorRef);
  #dialog = inject(DialogService);

  readonly trackById = trackById;

  removeUser$ = new Subject<void>();

  users$ = this.removeUser$.pipe(
    startWith(''),
    switchMap(() =>
      of(
        this.#storageService.has('users')
          ? (this.#storageService.get('users') as User[])
          : []
      )
    )
  ) as Observable<User[]>;

  deleteUser(user: User) {
    const existingUsers = this.#storageService.has('users')
      ? (this.#storageService.get('users') as User[])
      : [];

    const newUsers = existingUsers.filter(
      (existingUser: User) => existingUser.login.uuid !== user?.login.uuid
    );

    this.#storageService.set('users', newUsers);
    this.removeUser$.next();
    this.#cdr.markForCheck();
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
