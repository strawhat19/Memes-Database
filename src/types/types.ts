export enum Types {
  Meme = 'Meme',
  SampleMeme = 'SampleMeme',
}

export const memeCategories = [
  'Animals',
  'Relatable',
  'Work',
  'Gaming',
  'Wholesome',
  `Food`,
] as const;

export type MemeCategory = (typeof memeCategories)[number];

export interface DataRecord {
  id: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface MemeRecord extends DataRecord {
  title: string;
  image: string;
  topText: string;
  bottomText: string;
  category: MemeCategory;
  source: 'sample' | 'local';
}

export type MemeInput = Omit<MemeRecord, keyof DataRecord | 'source'>;

export interface MemeSnapshot {
  savedIds: string[];
  memes: MemeRecord[];
}

export interface APIHealth {
  title: string;
  message: string;
  success: boolean;
  timestamp: string;
  mode: 'local' | 'connection-needed';
  transport: 'internal-service';
}

export interface APIRoute {
  path: string;
  operation: string;
  methods: string[];
  description: string;
}
