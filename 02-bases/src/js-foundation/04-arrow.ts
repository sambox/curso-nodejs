interface User {
  id: number;
  name: string;
}

const users = [
  {
    id: 1,
    name: 'John Doe'
  },
  {
    id: 2,
    name: 'Jane Doe'
  }
]

export const getUserById = (id: number, cb: (err?: string, user?: User) => void) => {
  const user = users.find(user => user.id === id);
  (user) ? cb(undefined, user) : cb(`user not found with id ${id}`);
}
