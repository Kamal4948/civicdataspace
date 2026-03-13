import { SearchParams, SearchResponse } from '@/types';

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/';

export async function fetchDatasets(params: SearchParams): Promise<SearchResponse> {
  const url = new URL(BASE_URL + 'api/search/dataset/');
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      if (['geographies', 'sectors', 'tags', 'formats'].includes(key)) {
        const values = value.toString().split(',').filter(Boolean);
        url.searchParams.append(key, values.join(','));
      } else {
        url.searchParams.append(key, value.toString());
      }
    }
  });
  const response = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!response.ok) throw new Error('Failed to fetch datasets');
  return response.json();
}
