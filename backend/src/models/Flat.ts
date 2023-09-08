interface Flat{
  id: number;
  title: string;
  address: string;
  image_url: string;
}

interface FlatFilter{
  titleFilters?: string[],
  addressFilters?: string[]
}