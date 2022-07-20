<div align="center">
  <h1>
    <br/>
    🧰
    <br />
    <br />
    @mochen/toolkit
    <br />
    <br />
  </h1>
  <br />
  <pre>npm i <a href="https://www.npmjs.com/package/@mochen/toolkit">@mochen/toolkit</a></pre>
  <br/>
  <br />
  <br />
</div>


## logger

```
import { getLogger } from '../logger';

getLogger({ name: 'ToolKit' }).info('Hello');
```

## secure.file

```
import { getLogger } from '../secure.file';

const seFile = getSecureFile('mycli');

seFile.setConfig({
  a: 1,
  b: 2,
});

console.log('x', seFile.getConfig());
```