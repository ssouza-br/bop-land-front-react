import { useState, useEffect, ChangeEvent } from "react";
import { requestInstance } from "../../services/axiosService";

interface BOP {
  id: number;
  sonda: string;
}

const RigSelector = ({
  onSelectChange,
}: {
  onSelectChange: (selectedValue: number) => void;
}) => {
  const [options, setOptions] = useState<BOP[]>();
  const [selectedSonda, setSelectedSonda] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch options from an API
    const fetchOptions = async () => {
      try {
        const response = await requestInstance.get("/api/sondas"); // Update with your API endpoint
        setOptions(response.data.items);
      } catch (err) {
        setError("Error fetching options");
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedSonda(selectedValue);
    onSelectChange(selectedValue as unknown as number);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="input-group mb-3 mt-3">
      <label className="input-group-text" htmlFor="seleciona-sondas">
        Selecione uma sonda
      </label>
      <select
        className="form-select"
        id="seleciona-sondas"
        value={selectedSonda}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          -- Selecione uma sonda --
        </option>
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.sonda}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RigSelector;
