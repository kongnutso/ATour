import { 
    Tour ,
    Guide
} from '../domain/types';
import { Db } from 'mongodb';

export type SearchTourDb = (keyword: string) => Promise<Tour[]>;
export type SearchGuideDb = (keyword: string) => Promise<Guide[]>;


export function searchTour(db:Db):SearchTourDb {
    return async (keyword) =>{
        if (keyword === ''){
            const cursor = await db.collection('tour').find().limit(9);
            const results = await cursor.toArray();
            return results;
        }else {
            const keywords: RegExp[] = keyword.split(' ').map((word) => new RegExp(word, "i"));
            const cursor = await db.collection('tour').find({ tourName: {$in : keywords} });
            const results = await cursor.toArray();
            return results;            
        }
        
    }
}

export function searchGuide(db:Db):SearchGuideDb {
    return async (keyword) =>{
        if (keyword === ''){
            const cursor = await db.collection('guide').find().limit(9);
            const results = await cursor.toArray();
            return results;
        }else {
            const keywords: RegExp[] = keyword.split(' ').map((word) => new RegExp(word, "i"));
            const cursor = await db.collection('guide').find({ userName: {$in : keywords} });
            const results = await cursor.toArray();
            return results;
        }
    }
}


