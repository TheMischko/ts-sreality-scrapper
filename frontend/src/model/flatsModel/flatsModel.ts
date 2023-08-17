const endpointUrl = "http://backend:5000/flats";

/**
 * Fetches flats from backend and parses them as objects.
 * 
 * @returns array of flats
 */
export const getFlats = async() => {
  return new Promise<Flat[]>(async (resolve, reject) => {
    const response = await fetch(endpointUrl);
    const flats:Flat[] = await response.json();
    resolve(flats);
  })
}