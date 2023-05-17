import { Person } from "src/app/core/models/person";

export class NewsItem {
    id: string | undefined;
    date: Date | undefined;
    author: Person | undefined;
    content: string | undefined;
}