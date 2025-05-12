import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COUNTRY } from "../../api/addCountry";
import { GET_COUNTRIES } from "../../api/getCountries";
import "./CountryForm.css";

interface FormData {
  name: string;
  emoji: string;
  code: string;
}

export function CountryForm() {
  const [form, setForm] = useState<FormData>({ name: "", emoji: "", code: "" });
  const [addCountry, { loading, error }] = useMutation(ADD_COUNTRY, {
  refetchQueries: [{ query: GET_COUNTRIES }],
  awaitRefetchQueries: true,
});

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await addCountry({
        variables: {
          data: {
            name: form.name,
            code: form.code,
            emoji: form.emoji,
          },
        },
      });

      setForm({ name: "", emoji: "", code: "" });
    } catch (err) {
      console.error("Error adding country:", err);
    }
  }

  return (
    <form className="country-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="emoji">Emoji</label>
        <input
          id="emoji"
          name="emoji"
          value={form.emoji}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="code">Code</label>
        <input
          id="code"
          name="code"
          value={form.code}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="add-button" disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </form>
  );
}
