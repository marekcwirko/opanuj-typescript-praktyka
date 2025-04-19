export class User {
  // id: string | number;
  id: number;
  name: string;
  // [key: string]: any;
  constructor(id: number, name: string) {
    this.id =id;
    this.name = name;
  }
};

export class FilterResult {
  isValid: boolean;
  id: number;
  name: string;
  // [key: string]: any;
  constructor(  isValid: boolean, id: number, name: string) {
      this.isValid = isValid;
      this.id = id;
      this.name = name;
    }
};

type FilterFn = (user: User) => FilterResult;

export class UserModule {
  private users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
  }

  removeUser(userId: string | number): void {
    this.users = this.users.filter(user => user.id !== userId);
  }

  getUser(userId: string | number) : User | null {
    return this.users.find(user => user.id === userId) || null;
  }

  filterUsers(filterFn: (user: User) => FilterResult) : User[] {
    return this.users.filter(user => filterFn(user).isValid);
  }

}

const userModule = new UserModule();
export const { addUser, removeUser, getUser, filterUsers } = userModule;
