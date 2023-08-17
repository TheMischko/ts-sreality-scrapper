const endpointUrl = "http://localhost:5000/flats";

export const getFlats = async() => {
  return new Promise<Flat[]>(async (resolve, reject) => {
    const response = await fetch(endpointUrl);
    const flats:Flat[] = await response.json();
    resolve(flats);
  })
}