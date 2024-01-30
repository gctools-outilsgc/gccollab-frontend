export enum GroupStatus {
  Open = 'Open',
  Closed = 'Closed',
}

export class Group {
  id: string | undefined;
  name: string | undefined;
  displayPicture: string | undefined;
  groupStatus: GroupStatus | undefined;

  constructor(id: string, name: string, displayPicture: string, groupStatus: GroupStatus = GroupStatus.Open) {
    this.id = id;
    this.name = name;
    this.displayPicture = displayPicture;
    this.groupStatus = groupStatus;
  }
}
