interface IFlatProvider{
  get():Promise<Flat[]>;
  getPart(pageIndex:number, pageSize:number):Promise<Flat[]>;
}