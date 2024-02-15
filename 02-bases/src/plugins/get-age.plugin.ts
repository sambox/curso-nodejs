// const getAgePlugin = require('get-age');

export const getAge = (bod: string) => {
  return new Date().getFullYear() - new Date(bod).getFullYear();
}

