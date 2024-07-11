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
  PluginChartOptions,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./index.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ForecastData {
  date: string;
  min_temp: string;
  max_temp: string;
}

const WeatherForecast = ({ bopId }: { bopId: number }) => {
  const [forecast, setForecast] = useState<ForecastData[]>();
  const [city, setCity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const dates = forecast?.map((day) => day.date);
  const minTemperatures = forecast?.map((day) => day.min_temp);
  const maxTemperatures = forecast?.map((day) => day.max_temp);

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

  const options: ChartOptions<"bar"> = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 5, // Adjust the number of ticks to fit within the height
        },
      },
      x: {
        ticks: {
          autoSkip: false, // Ensure all labels are shown
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top", // Position the legend to the top
        labels: {
          font: {
            size: 10, // Adjust font size if necessary
          },
        },
      },
      title: {
        display: true,
        text: `Previsão do tempo para os próximos 6 dias (${city})`,
        font: {
          size: 20, // Adjust font size if necessary
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 30, // Adjust padding to ensure visibility
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="graphic-container">
      <div className="graphic">
        <Bar data={data} options={options} />
      </div>
      <p className="footnote">Fonte de dados: API CPTEC-INPE</p>
    </div>
  );
};

export default WeatherForecast;
