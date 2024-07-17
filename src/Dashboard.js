import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: '',
    topic: '',
    sector: '',
    region: '',
    pest: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = () => {
    axios.get('http://localhost:8000/api/data', { params: filters })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const intensityData = {
    labels: data.map(item => item.topic),
    datasets: [{
      label: 'Intensity',
      data: data.map(item => item.intensity),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }]
  };

  const relevanceData = {
    labels: data.map(item => item.topic),
    datasets: [{
      label: 'Relevance',
      data: data.map(item => item.relevance),
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    }]
  };

  return (
    <div>
      <h1>Data Visualization Dashboard</h1>
      <div>
        <label>End Year:</label>
        <input type="text" name="endYear" onChange={handleFilterChange} />
        <label>Topic:</label>
        <input type="text" name="topic" onChange={handleFilterChange} />
        <label>Sector:</label>
        <input type="text" name="sector" onChange={handleFilterChange} />
        <label>Region:</label>
        <input type="text" name="region" onChange={handleFilterChange} />
        <label>Pest:</label>
        <input type="text" name="pest" onChange={handleFilterChange} />
        <label>Source:</label>
        <input type="text" name="source" onChange={handleFilterChange} />
        <label>SWOT:</label>
        <input type="text" name="swot" onChange={handleFilterChange} />
        <label>Country:</label>
        <input type="text" name="country" onChange={handleFilterChange} />
        <label>City:</label>
        <input type="text" name="city" onChange={handleFilterChange} />
      </div>
      <div>
        <h2>Intensity</h2>
        <Bar data={intensityData} />
      </div>
      <div>
        <h2>Relevance</h2>
        <Line data={relevanceData} />
      </div>
    </div>
  );
};

export default Dashboard;
