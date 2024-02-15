interface Hero {
  id: number;
  name: string;
  owner: string;
}

export const heroes: Hero[] = [
  {
    id: 1,
    name: 'superman',
    owner: 'DC',
  },
  {
    id: 2,
    name: 'flash',
    owner: 'DC',
  },
  {
    id: 3,
    name: 'batman',
    owner: 'DC',
  },
];