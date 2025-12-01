export interface Quote {
    id: string;
    content: string;
    author: string;
    authorSlug: string;
}

export interface Author {
    name: string;
    slug: string;
}


export const POPULAR_KEYWORDS: string[] = [
  'vie', 'succès', 'réussite', 'bonheur', 'art', 'courage', 'défi',
  'sagesse', 'mystère',  'futur'
];