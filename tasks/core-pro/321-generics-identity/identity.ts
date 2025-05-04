interface GoogleIdentity {
  id: string;
  provider: 'google';
  userName: string;
}

interface AppleIdentity {
  id: string;
  provider: 'apple';
  userName: string;
}

interface RedditIdentity {
  id: string;
  provider: 'reddit';
  userName: string;
}

type Identity = GoogleIdentity | AppleIdentity | RedditIdentity;
type Provider = Identity['provider'];

const users: ReadonlyArray<Identity> = [
  { id: '1', provider: 'google', userName: 'John Doe' },
  { id: '2', provider: 'apple', userName: 'Kate Williams' },
  { id: '3', provider: 'google', userName: 'Jane Doe' },
  { id: '4', provider: 'reddit', userName: 'Alex Smith' },
  { id: '5', provider: 'google', userName: 'Mike Johnson' },
  { id: '6', provider: 'reddit', userName: 'John Doe' },
];

export class IdentityProcessor<T extends Identity> {
  constructor(protected provider: Provider) {}

  protected filterByProvider(): T[] {
    return users.filter((user): user is T => user.provider === this.provider);
  }

  findById(id: string): T | undefined {
    return this.filterByProvider().find(user => user.id === id);
  }

  findByUserName(userName: string): T | undefined {
    return this.filterByProvider().find(user => user.userName === userName);
  }
}

export class GoogleIdentityProcessor extends IdentityProcessor<GoogleIdentity> {
  constructor() {
    super('google');
  }
}

export class AppleIdentityProcessor extends IdentityProcessor<AppleIdentity> {
  constructor() {
    super('apple');
  }
}

export class RedditIdentityProcessor extends IdentityProcessor<RedditIdentity> {
  constructor() {
    super('reddit');
  }
}
