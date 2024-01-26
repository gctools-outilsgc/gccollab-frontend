import { INewsItem } from 'src/app/features/news-feed/models/INewsItem';
import { Person } from './person.model';

export class Poll implements INewsItem {
  constructor(
    public id: string,
    public author: Person,
    public authoredDate: Date,
    public content: string,
    public comments: number,
    public likes: number,
  ) {}
}
