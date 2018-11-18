import {
    SearchTourDb, SearchGuideDb
} from '../repository/CustomerSearch';

import {
    Tour,
    Guide
} from '../domain/types';

export type SearchTourService = (
    keyword: string
) => Promise<Tour[]>;

export type SearchGuideService = (
    keyword: string
) => Promise<Guide[]>;

export function searchTourService(searchTourDb: SearchTourDb): SearchTourService {
    return async (keyword) => {
        const results = await searchTourDb(keyword);
        return results;
    }
}

export function searchGuideService(searchGuideDb: SearchGuideDb): SearchGuideService {
    return async (keyword) => {
        const results = await searchGuideDb(keyword);
        return results;
    }
}

