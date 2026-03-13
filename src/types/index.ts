export interface Dataset {
  id: string;
  title: string;
  description: string;
  metadata: Array<{
    metadata_item: { label: string };
    value: string;
  }>;
  tags: string[];
  sectors: string[];
  formats: string[];
  organization?: { name: string; logo?: string };
  created?: string;
  download_count?: number;
  geographies?: string;
}

export interface Aggregations {
  geographies: Record<string, number>;
  sectors:     Record<string, number>;
  tags:        Record<string, number>;
  formats:     Record<string, number>;
}

export interface SearchResponse {
  results:      Dataset[];
  total:        number;
  aggregations: Aggregations;
}

export interface SearchParams {
  query?:       string;
  geographies?: string;
  sectors?:     string;
  tags?:        string;
  formats?:     string;
  page?:        number;
  size?:        number;
  sort?:        'recent' | 'alphabetical';
  order?:       'asc' | 'desc';
}
