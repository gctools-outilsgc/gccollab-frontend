import { Location } from "./location";

export class Person {
    id: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    jobTitle: string | undefined;
    profilePicture: string = 'https://img.freepik.com/free-icon/user_318-563642.jpg';
    address: Location | undefined;

    constructor(id: string, firstName: string, lastName: string, jobTitle: string, address: Location, profilePicture: string = 'https://img.freepik.com/free-icon/user_318-563642.jpg') {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
        this.profilePicture = profilePicture;
        this.address = address;
    }
}