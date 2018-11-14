import { 
    Tour ,
    Guide
} from 'domain/types';
import { Db } from 'mongodb';

export type SearchTourDb = (keyword: string) => Promise<Tour[]>;
export type SearchGuideDb = (keyword: string) => Promise<Guide[]>;

export function searchTour(db:Db):SearchTourDb {
    return async (keyword) =>{
        const keywords: string[] = keyword.split(' ').map((word) => '/'+word+'/');
        const cursor = await db.collection('tour').find({ tourname: {$in : keywords} });
        const results = cursor.hasNext() ? cursor.next() : null;
        return results;
    }
}

export function searchGuide(db:Db):SearchGuideDb {
    return async (keyword) =>{
        const keywords: string[] = keyword.split(' ').map((word) => '/'+word+'/');
        const cursor = await db.collection('guide').find({ userName: {$in : keywords} });
        const results = cursor.hasNext() ? cursor.next() : null;
        return results;
    }
}


