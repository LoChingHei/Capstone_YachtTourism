import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListYacht() {
  const [yachts, setYachts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch yachts data when the component mounts
    fetchYachts();
    console.log(yachts);
  }, []); // Empty dependency array ensures the effect runs only once

  const fetchYachts = async () => {
    try {
      const response = await axios.get('http://localhost:8085/get_all_yachts');
      setYachts(response.data);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch yachts:', error);
      setError(error.message); // Update error state
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <h2>Available Yachts</h2>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {yachts.map((yacht, index) => (
          <div className="card mb-3" key={index}>
            <img src={yacht.Record.ipfs} className="card-img-top" style={{ width: '100%', height: 'auto' }} alt={yacht.Record.name} />
            <div className="card-body">
              <h2 className="card-title">{yacht.Record.name}</h2>
              <p><strong>Model:</strong> {yacht.Record.model}</p>
              <p><strong>Description:</strong> {yacht.Record.description}</p>
              <p><strong>Amenities:</strong> {yacht.Record.amenities}</p>
              <p><strong>Crew:</strong> {yacht.Record.crew}</p>
              <p><strong>Location:</strong> {yacht.Record.location}</p>
              <Link to={{ pathname: `/book-yacht/${yacht.Key}`, state: { yacht } }} className="btn btn-primary">Book Now</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListYacht;
