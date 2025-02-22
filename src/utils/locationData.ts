
export interface LocationSuggestion {
  city: string;
  state: string;
  zip: string;
}

// Expanded list of major US cities
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
  { city: "Austin", state: "TX", zip: "78701" },
  { city: "Jacksonville", state: "FL", zip: "32201" },
  { city: "Fort Worth", state: "TX", zip: "76101" },
  { city: "Columbus", state: "OH", zip: "43201" },
  { city: "San Francisco", state: "CA", zip: "94101" }
];

export const filterLocations = (query: string): LocationSuggestion[] => {
  const searchTerm = query.toLowerCase().trim();
  
  // Return empty array if search term is less than 2 characters
  if (searchTerm.length < 2) return [];

  // Filter locations based on city, state, or zip
  return majorUSLocations.filter(location => {
    const cityState = `${location.city}, ${location.state}`.toLowerCase();
    const cityMatch = location.city.toLowerCase().includes(searchTerm);
    const stateMatch = location.state.toLowerCase().includes(searchTerm);
    const zipMatch = location.zip.includes(searchTerm);
    
    return cityMatch || stateMatch || zipMatch;
  }).slice(0, 7); // Limit to 7 suggestions
};
