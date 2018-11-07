import { Tour } from 'domain/types';

export type SaveTourDb = (t: Tour) => Promise<void>;
