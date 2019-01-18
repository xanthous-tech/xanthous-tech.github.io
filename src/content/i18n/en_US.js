/* eslint-disable no-restricted-syntax */
import data from './data.json';

const en = {};

for (const k in data) {
  /* eslint-disable no-prototype-builtins */
  if (data.hasOwnProperty(k)) {
    // eslint-disable-next-line prefer-destructuring
    en[k] = data[k].en;
  }
}

export default en;
