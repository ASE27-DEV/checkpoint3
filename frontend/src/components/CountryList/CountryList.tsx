import "./CountryList.css";
import { Link } from "react-router-dom";

export interface Country {
  name: string;
  emoji: string;
  code: string;
}

interface CountryListProps {
  countries: Country[];
}

export function CountryList({ countries }: CountryListProps) {
    return (
      <div className="country-list">
        {countries.map((country) => (
          <Link
            to={`/country/${country.code}`}
            key={country.code}
            className="country-card-link"
          >
            <div className="country-card">
              <h3>{country.name}</h3>
              <span className="emoji">{country.emoji}</span>
            </div>
          </Link>
        ))}
      </div>
    );
  }
