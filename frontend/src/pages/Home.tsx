import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../api/getCountries"; // adapte le chemin si besoin
import { CountryForm } from "../components/CountryForm/CountryForm";
import { CountryList, Country } from "../components/CountryList/CountryList";

export function HomePage() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading countries: {error.message}</p>;

  const countries: Country[] = data.countries.map((c: Country) => ({
    name: c.name,
    emoji: c.emoji,
    code: c.code,
  }));

  return (
    <div>
      <CountryForm />
      <CountryList countries={countries} />
    </div>
  );
}
