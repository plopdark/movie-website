import { Component, Input } from '@angular/core';
import { Media } from '../../../utils/interfaces/media.interface';
import { MediaShowListItemComponent } from '../media-show-list/media-show-list-item/media-show-list-item.component';
import { MediaColumnListItemComponent } from './media-column-list-item/media-column-list-item.component';

@Component({
  selector: 'app-media-column-list',
  standalone: true,
  imports: [MediaShowListItemComponent, MediaColumnListItemComponent],
  templateUrl: './media-column-list.component.html',
  styleUrl: './media-column-list.component.scss',
})
export class MediaColumnListComponent {
  @Input() public medias: Media[] = [];
}
