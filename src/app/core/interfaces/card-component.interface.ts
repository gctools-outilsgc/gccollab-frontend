import { CardSize } from 'src/app/shared/models/card-size';

export interface ICardComponent {
  //eslint-disable-next-line
  model?: any;
  cardSize: CardSize | string;
  loading: boolean;
}
