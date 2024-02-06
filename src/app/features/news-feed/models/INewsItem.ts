import { Person } from 'src/app/core/models/person.model';

export interface INewsItem {
  id: string;
  author: Person;
  authoredDate: Date;
  content: string;
  comments: number;
  likes: number;
}
