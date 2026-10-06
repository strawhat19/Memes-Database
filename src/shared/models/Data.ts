import type { DataRecord } from '../../types/types';

export class Data {
  readonly id: string;
  readonly number: number;
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(record: DataRecord) {
    this.id = record.id;
    this.number = record.number;
    this.createdAt = record.createdAt;
    this.updatedAt = record.updatedAt;
  }

  toRecord(): DataRecord {
    return {
      id: this.id,
      number: this.number,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
