import { Person } from "src/app/core/models/person";

export class NewsItem {
    id: string | undefined;
    date: Date | undefined;
    author: Person | undefined;
    content: string | undefined;
    comments: number = 0; // TODO: Comments should be its own class not a number
    likes: number = 0;
}