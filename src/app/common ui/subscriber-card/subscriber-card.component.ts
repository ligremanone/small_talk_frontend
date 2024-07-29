import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input() profile: Profile;
}
