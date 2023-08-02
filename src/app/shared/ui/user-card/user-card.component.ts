import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../data-access/api/models/user.interface';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input({ required: true }) user?: User;
  @Output() addUser = new EventEmitter();
  @Output() deleteUser = new EventEmitter();
  @Output() viewWeather = new EventEmitter();
  @Input() showSave: boolean = true;
  @Input() showDelete: boolean = false;

  saveUser() {
    this.addUser.emit(this.user);
  }

  removeUser() {
    this.deleteUser.emit(this.user);
  }

  showWeather() {
    this.viewWeather.emit(this.user);
  }
}
