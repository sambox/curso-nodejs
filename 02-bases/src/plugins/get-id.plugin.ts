// const { v4: uuidV4 } = require('uuid');
import { v4 as uuid } from 'uuid'

export const getId = () => {
  return uuid();
}