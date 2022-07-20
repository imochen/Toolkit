import chalk, { Chalk } from 'chalk';
import dayjs from 'dayjs';

interface LoggerOptions {
  name: string;
  time?: boolean;
}

type Args = ((c: Chalk) => string)[] | string[];

const resolveChalk = (arr: Args, fn?: Function): string[] => {
  const result: string[] = [];
  arr.forEach((element, index) => {
    if (typeof element === 'function') {
      result[index] = element(chalk);
      return;
    }
    if (fn && typeof fn === 'function') {
      result[index] = fn(element);
      return;
    }
    result[index] = element;
  });
  return result;
};

export const getLogger = (options: LoggerOptions) => {
  const { time = true, name } = options;
  const prefix: string[] = [];
  if (time) prefix.push(`{${dayjs().format('HH:mm:ss')}}`);

  const makeText = (symbol: string, fn: chalk.Chalk, args: string[]): string[] => {
    const result = [fn(symbol), fn(`[${name}]`)];
    if (prefix.length > 0) result.push(chalk.gray(prefix.join(' ')));
    result.push(...args);
    return result;
  };

  const info = (...args: Args) => console.log(...makeText('ℹ', chalk.blue, resolveChalk(args)));
  const error = (...args: Args) => {
    console.log(...makeText('✘', chalk.red, resolveChalk(args, (item: string) => chalk.red(item))));
  };
  const success = (...args: Args) => {
    console.log(...makeText('✔', chalk.green, resolveChalk(args, (item: string) => chalk.green(item))));
  };

  const warn = (...args: Args) => {
    const custom = resolveChalk(args, (item: string) => chalk.yellowBright(` ${item}`));
    const result = ['\n', chalk.bgYellowBright('WARNING:'), '\n', ...custom, '\n'];
    console.log(...result);
  };

  return {
    info,
    error,
    success,
    warn
  };
};

export default {};
