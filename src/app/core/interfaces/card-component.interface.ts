import { CardSize } from "src/app/shared/models/card-size";

export interface ICardComponent {
    model?: any;
    cardSize: CardSize | string;
    loading: boolean;
}