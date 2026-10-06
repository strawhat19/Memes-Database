import { Data } from '../Data';
import { parseRecordId } from '../../common/ids';
import { isISODate, isObject } from '../../common/values';
import { memeCategories, Types } from '../../../types/types';
import type { MemeCategory, MemeInput, MemeRecord } from '../../../types/types';

const isCategory = (value: unknown): value is MemeCategory =>
  typeof value === `string` && memeCategories.some(category => category === value);

const isImage = (value: unknown): value is string => {
  if (typeof value !== `string` || !value || value.length > 2_200_000) return false;
  if (/^\/[a-z0-9/_\-.]+$/i.test(value) && !value.startsWith(`//`)) return true;
  if (/^data:image\/(png|jpeg|webp|gif);base64,[a-z0-9+/=]+$/i.test(value)) return true;
  try {
    const url = new URL(value);
    return (url.protocol === `https:` || url.protocol === `http:`) && Boolean(url.hostname);
  } catch {
    return false;
  }
};

export const normalizeMemeInput = (input: MemeInput): MemeInput => {
  if (!isObject(input)) throw new Error(`Enter the meme details before saving`);
  const title = typeof input.title === `string` ? input.title.trim() : ``;
  const image = typeof input.image === `string` ? input.image.trim() : ``;
  const topText = typeof input.topText === `string` ? input.topText.trim() : ``;
  const bottomText = typeof input.bottomText === `string` ? input.bottomText.trim() : ``;
  if (!title || title.length > 100) throw new Error(`Use a title between 1 and 100 characters`);
  if (topText.length > 160 || bottomText.length > 160) {
    throw new Error(`Keep each caption within 160 characters`);
  }
  if (!isCategory(input.category)) throw new Error(`Choose a valid meme category`);
  if (!isImage(image)) throw new Error(`Use an image URL, an app image, or a supported image data URL`);
  return { title, image, topText, bottomText, category: input.category };
};

export const isMemeRecord = (value: unknown): value is MemeRecord => {
  if (!isObject(value)) return false;
  const parsedId = typeof value.id === `string` ? parseRecordId(value.id) : null;
  if (!parsedId || parsedId.number !== value.number) return false;
  if (value.source !== `local` && value.source !== `sample`) return false;
  const expectedType = value.source === `local` ? Types.Meme : Types.SampleMeme;
  if (parsedId.type !== expectedType) return false;
  if (!isISODate(value.createdAt) || !isISODate(value.updatedAt)) return false;
  if (parsedId.date !== value.createdAt.slice(0, 10)) return false;
  if (Date.parse(value.updatedAt) < Date.parse(value.createdAt)) return false;
  return typeof value.title === `string`
    && value.title.trim().length > 0
    && value.title.length <= 100
    && typeof value.topText === `string`
    && value.topText.length <= 160
    && typeof value.bottomText === `string`
    && value.bottomText.length <= 160
    && isCategory(value.category)
    && isImage(value.image);
};

export class Meme extends Data {
  readonly title: string;
  readonly image: string;
  readonly topText: string;
  readonly bottomText: string;
  readonly category: MemeCategory;
  readonly source: 'sample' | 'local';

  constructor(record: MemeRecord) {
    super(record);
    this.title = record.title;
    this.image = record.image;
    this.topText = record.topText;
    this.category = record.category;
    this.bottomText = record.bottomText;
    this.source = record.source;
  }

  override toRecord(): MemeRecord {
    return {
      ...super.toRecord(),
      title: this.title,
      image: this.image,
      topText: this.topText,
      source: this.source,
      category: this.category,
      bottomText: this.bottomText,
    };
  }
}
