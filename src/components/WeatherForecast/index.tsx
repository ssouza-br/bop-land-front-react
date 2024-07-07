import { useState, useEffect } from "react";
import { requestInstance } from "../../services/axiosService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeatherForecast = ({ bopId }: { bopId: number }) => {
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const response = await requestInstance.get(
          `/api/previsao/bop/${bopId}`
        );
        setForecast(response.data.forecasts);
        setCity(response.data.city);
      } catch (err) {
        setError("Error fetching weather forecast");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherForecast();
  }, [bopId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const dates = forecast.map((day) => day.date);
  const minTemperatures = forecast.map((day) => day.min_temp);
  const maxTemperatures = forecast.map((day) => day.max_temp);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Min Temperature (°C)",
        data: minTemperatures,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 0.5,
      },
      {
        label: "Max Temperature (°C)",
        data: maxTemperatures,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 0.5,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>{`7-Day Weather Forecast (${city})`}</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default WeatherForecast;
