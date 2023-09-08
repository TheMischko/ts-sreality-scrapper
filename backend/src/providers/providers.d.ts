interface IFlatProvider{
  get(filters?: FlatFilter):Promise<Flat[]>;
  getPart(pageIndex:number, pageSize:number, filters?: FlatFilter):Promise<Flat[]>;
}