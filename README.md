# Toolkit

## logger

```
import { getLogger } from '../logger';

getLogger({ name: 'ToolKit' }).info('Hello');
```

## logger

```
import { getLogger } from '../secure.file';

const seFile = getSecureFile('mycli');

seFile.setConfig({
  a: 1,
  b: 2,
});

console.log('x', seFile.getConfig());
```