
export interface LocationSuggestion {
  city: string;
  state: string;
  zip: string;
}

// Sample of top US cities (you can expand this list)
export const majorUSLocations: LocationSuggestion[] = [
  { city: "New York", state: "NY", zip: "10001" },
  { city: "Los Angeles", state: "CA", zip: "90001" },
  { city: "Chicago", state: "IL", zip: "60601" },
  { city: "Houston", state: "TX", zip: "77001" },
  { city: "Phoenix", state: "AZ", zip: "85001" },
  { city: "Philadelphia", state: "PA", zip: "19101" },
  { city: "San Antonio", state: "TX", zip: "78201" },
  { city: "San Diego", state: "CA", zip: "92101" },
  { city: "Dallas", state: "TX", zip: "75201" },
  { city: "San Jose", state: "CA", zip: "95101" },
];

export const filterLocations = (query: string): LocationSuggestion[] => {
  const searchTerm = query.toLowerCase().trim();
  if (searchTerm.length < 3) return [];

  return majorUSLocations
    .filter(location => {
      const cityState = `${location.city}, ${location.state}`.toLowerCase();
      return cityState.includes(searchTerm) || location.zip.includes(searchTerm);
    })
    .slice(0, 7); // Limit to 7 suggestions
};
