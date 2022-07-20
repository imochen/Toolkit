import { getLogger } from '../src/logger';

getLogger({ name: 'ToolKit' }).info('Hello');

getLogger({ name: 'ToolKit', time: false }).info('No Time');

getLogger({ name: 'ToolKit' }).info((chalk) => chalk.cyan('Cyan Hello'));

getLogger({ name: 'ToolKit' }).error('Error Hello');

getLogger({ name: 'ToolKit' }).success('Success Hello');

getLogger({ name: 'ToolKit' }).warn('Warn Hello');
