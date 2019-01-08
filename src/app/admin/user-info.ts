export class UserInfo {
    name: string;
    username: string;
    email: string;
    role: string[];

    constructor(name: string, username: string, email: string, role: string[]) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.role = role;
    }
}
