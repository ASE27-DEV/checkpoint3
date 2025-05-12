import { useParams } from "react-router-dom";
import { GET_COUNTRY } from "../api/getCountry";
import { useQuery } from "@apollo/client";

export function Country() {
  const { code } = useParams<{ code: string }>();
  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code },
  });

  if (loading) return <p>Loading country...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { name, emoji, continent } = data.country;

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{name} {emoji}</h1>
      <p><strong>Name : </strong> {name} ({code})</p>
      <p><strong>Continent : </strong> {continent.name}</p>
    </div>
  );
}
