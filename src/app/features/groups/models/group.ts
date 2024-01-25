
export enum GroupStatus {
    Open = 'Open',
    Closed = 'Closed'
}

export class Group {
    id: string | undefined;
    name: string | undefined;
    displayPicture: string | undefined;
    groupStatus: GroupStatus | undefined;
}