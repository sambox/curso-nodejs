interface User {
  id: number;
  name: string;
}

const users: User[] = [
  {
    id: 1,
    name: 'John Doe'
  },
  {
    id: 2,
    name: 'Jane Doe'
  }
];

export function getUserById(id: number, cb: (err?: string, user?: User) => void) {
  const user = users.find(user => user.id === id);
  if (!user) {
    setTimeout(() => {
      cb(`user not found with id ${id}`)
    }, 1000);
    return ;
  }
  return cb(undefined, user)
}
