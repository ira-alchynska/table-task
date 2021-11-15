export async function fetchCountries(limit = 5, page = 1) {
  const BASE_URL = `http://localhost:3030/countries/?_limit=${limit}&_page=${page}`;

  let response = await fetch(BASE_URL);
  let data = await response.json();

  return data.map(({ id, name, iso3, phone_code, capital, currency }) => {
    const countries = { id, name, iso3, phone_code, capital, currency };

    return countries;
  });
}

export async function patchRequest(country) {
  const BASE_URL = `http://localhost:3030/countries/`;
  const id = country.id;
  const options = {
    method: "PATCH",
    body: JSON.stringify(country),
    headers: { "content-type": "application/json" },
  };
  const response = await fetch(BASE_URL + id, options);
  if (response.ok) {
    const result = await response.json();
    return result;
  }
}
