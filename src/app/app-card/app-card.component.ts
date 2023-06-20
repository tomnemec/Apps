import { Component, Input } from '@angular/core';
import { App } from '../services/apps.service';

@Component({
  selector: 'app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.css'],
})
export class AppCardComponent {
  @Input() app: App = {} as App;
}
