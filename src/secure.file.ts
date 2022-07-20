import os from 'os';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs-extra';

const keyGen = () => new Array(4)
  .fill(0)
  .map(() => Math.random().toString(16).slice(2))
  .join('')
  .slice(2, 18);

const encrypt = (salt: string, iv: string, data: string) => {
  const cipher = crypto.createCipheriv('aes-128-cbc', salt, iv);
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
};

const decrypt = (salt: string, iv: string, crypted: string) => {
  const cipher = crypto.createDecipheriv('aes-128-cbc', salt, iv);
  return cipher.update(crypted, 'hex', 'utf8') + cipher.final('utf8');
};

const createFile = (filePath: string) => {
  if (!fs.pathExistsSync(filePath)) {
    fs.mkdirpSync(path.dirname(filePath));
    fs.writeFileSync(filePath, '', { encoding: 'utf-8' });
    return true;
  }
  return false;
};

const writeConfig = (filePath: string, content: Record<string, any>) => {
  createFile(filePath);
  const iv = keyGen();
  const salt = keyGen();
  fs.writeFileSync(
    filePath,
    salt + encrypt(salt, iv, JSON.stringify(content)) + iv,
    { encoding: 'utf-8' }
  );
  return content;
};

const readConfig = (filePath: string) => {
  if (createFile(filePath)) {
    return writeConfig(filePath, {});
  }
  const source = fs.readFileSync(filePath, { encoding: 'utf-8' });
  return JSON.parse(decrypt(
    source.slice(0, 16),
    source.slice(-16),
    source.slice(16, -16)
  ));
};

export const getSecureFile = (name: string) => {
  const basePath = `${os.homedir()}/.${name}`;
  const configPath = `${basePath}/config`;
  return {
    setConfig: (content: Record<string, any>) => writeConfig(configPath, content),
    getConfig: <T>() => readConfig(configPath,) as T,
  };
};