import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cast } from '../../../utils/interfaces/media.interface';

@Component({
  selector: 'app-media-show-page-credits',
  standalone: true,
  imports: [],
  templateUrl: './media-show-page-credits.component.html',
  styleUrl: './media-show-page-credits.component.scss',
})
export class MediaShowPageCreditsComponent {
  @Input() credits: Cast[] = [];

  @Output() actorClick = new EventEmitter<number>();

  selectActor(id: number) {
    this.actorClick.emit(id);
  }
}
