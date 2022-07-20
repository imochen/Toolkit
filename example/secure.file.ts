import { getSecureFile } from '../src/secure.file';

const seFile = getSecureFile('mytext');

seFile.setConfig({
  a: 1,
  b: 2,
});

console.log('x', seFile.getConfig());