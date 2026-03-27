const API_URL = 'https://rickandmortyapi.com/api/character';


export const getCharacters = async (
  filters: {
    name: string;
    status: string;
    species: string;
    page: string;
    id: string
  }) => {
  const query = new URLSearchParams(filters).toString();
  const response = fetch(`${API_URL}/?${query}`).then( async (response) => {
    const buildedResponse = {
      status: response.status,
      responseJson: await response.json()
    }
    return buildedResponse;
  }).catch(error => error);
  return response;
};

export const getCharacterInfo = async ( url: string ) => {
  return fetch(url).then( async (response) => {
    return response.json();
  }).catch(error => error);
};