/* eslint-disable no-restricted-syntax */
import data from './data.json';

const cn = {};

for (const k in data) {
  /* eslint-disable no-prototype-builtins */
  if (data.hasOwnProperty(k)) {
    // eslint-disable-next-line prefer-destructuring
    cn[k] = data[k].zh;
  }
}

export default cn;