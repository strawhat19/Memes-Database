import { Types } from '../../types/types';

type RuntimeCrypto = {
  randomUUID?: () => string;
  getRandomValues?: (values: Uint8Array) => Uint8Array;
};

const createUUID = (): string => {
  const runtimeCrypto = (globalThis as unknown as { crypto?: RuntimeCrypto }).crypto;
  if (runtimeCrypto?.randomUUID) return runtimeCrypto.randomUUID();

  const bytes = new Uint8Array(16);
  if (runtimeCrypto?.getRandomValues) {
    runtimeCrypto.getRandomValues(bytes);
  } else {
    // Record IDs are non-secret; native runtimes may not provide Web Crypto.
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, value => value.toString(16).padStart(2, `0`)).join(``);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

export const createRecordId = (
  type: Types,
  number: number,
  name: string,
  createdAt: string,
): string => {
  if (!Number.isSafeInteger(number) || number < 1) {
    throw new Error(`A record needs a positive safe integer number`);
  }
  const slug = name
    .normalize(`NFKD`)
    .replace(/[\u0300-\u036f]/g, ``)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, `-`)
    .replace(/^-|-$/g, ``)
    .slice(0, 48) || `untitled`;
  return `${type}_${number}_${slug}_${createdAt.slice(0, 10)}_${createUUID()}`;
};

export const parseRecordId = (id: string) => {
  const match = /^(Meme|SampleMeme)_([1-9]\d*)_([a-z0-9-]+)_(\d{4}-\d{2}-\d{2})_([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12})$/i.exec(id);
  if (!match) return null;
  const number = Number(match[2]);
  if (!Number.isSafeInteger(number)) return null;
  return { number, type: match[1], date: match[4] };
};
