import { Component, Input } from '@angular/core';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  @Input() notificationContent: string | null = null;
  @Input() loaderColor: string | null = null;
  @Input() header: string | null = null;
}
