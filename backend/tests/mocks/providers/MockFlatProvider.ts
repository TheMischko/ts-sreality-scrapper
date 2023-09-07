export const mockFlatProvider = () :IFlatProvider => {
  const get = async () => {
    return new Promise<Flat[]>((resolve, reject) => {
      resolve([
        {
          id: 0,
          title: "Byt 1+kk Praha Holešovice",
          address: "Holešovice, Praha",
          image_url: "https://images.com/image-123.jpg"
        },
        {
          id: 1,
          title: "Byt 3+kk Praha Smíchov",
          address: "Smíchov, Praha",
          image_url: "https://images.com/image-456.jpg"
        },
        {
          id: 2,
          title: "Byt 3+1 Praha Žižkov",
          address: "Žižkov, Praha",
          image_url: "https://images.com/image-423.jpg"
        },
        {
          id: 3,
          title: "Byt 2+kk Praha Vysočany",
          address: "Vysočany, Praha",
          image_url: "https://images.com/image-856.jpg"
        },
      ])
    })
  };

  const getPart = async (pageIndex:number, pageSize:number) => {
    return new Promise<Flat[]>(async (resolve, reject) => {
      const flats = await get();
      const startSliceIndex = pageIndex * pageSize;
      const slice = flats.slice(startSliceIndex, startSliceIndex+pageSize);
      resolve(slice);
    })
  
  }

  return {
    get,
    getPart
  }
}

export const emptyMockFlatProvider = () :IFlatProvider => {
  const get = ():Promise<Flat[]> => {
    return new Promise<Flat[]>((resolve) => {
      resolve([]);
    })
  };
  const getPart = (pageIndex:number, pageSize:number):Promise<Flat[]> => {
    return new Promise<Flat[]>((resolve) => {
      resolve([]);
    })
  };
  return {
    get,
    getPart
  }
}