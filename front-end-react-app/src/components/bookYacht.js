import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';

function BookYacht() {
  const { id } = useParams();
  const [yacht, setYacht] = useState(null);
  const [error, setError] = useState(null);
  const [timestampFrom, setTimestampFrom] = useState('');
  const [timestampTo, setTimestampTo] = useState('');

  useEffect(() => {
    // Fetch yachts data when the component mounts
    fetchYachts();
    console.log(yacht);
  }, []);

  const fetchYachts = async () => {
    try {
      const response = await axios.get('http://localhost:8085/get_all_yachts');
      const yachtsData = response.data;
      const selectedYacht = yachtsData.find(yacht => yacht.Key === id);
      if (selectedYacht) {
        setYacht(selectedYacht.Record);
        setError(null);
      } else {
        setError(`Yacht with ID ${id} not found`);
      }
    } catch (error) {
      console.error('Failed to fetch yachts:', error);
      setError(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const inputValue=`${id}_${timestampFrom}_${timestampTo}`;

    console.log('Concatenated input value:', inputValue);
  
    try {
      await axios.get(`http://localhost:8085/book_yacht/${inputValue}`);
      console.log('GET request successful');
      // You can do something after the request is successful
    } catch (error) {
      console.error('Error sending GET request:', error);
    }
  };

  return (
    <div>
      {/* Yacht details */}
      {yacht && (
      <div className="card container mt-4">
        <img src={yacht.ipfs} className="card-img-top" style={{ width: '100%', height: 'auto' }} alt={yacht.name} />
        <h1>{yacht.name}</h1>
        <p><strong>Model:</strong> {yacht.model}</p>
        <p><strong>Capacity:</strong> {yacht.capacity}</p>
        <p><strong>Description:</strong> {yacht.description}</p>
        <p><strong>Length:</strong> {yacht.length}</p>
        <p><strong>Width:</strong> {yacht.width}</p>
        <p><strong>Amenities:</strong> {yacht.amenities}</p>
        <p><strong>Crew:</strong> {yacht.crew}</p>
        <p><strong>Safety Features:</strong> {yacht.safetyFeatures}</p>
        <p><strong>Location:</strong> {yacht.location}</p>
        <p><strong>Owner:</strong> {yacht.owner}</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="timestampFrom" className="form-label">Book From:</label>
            <input type="date" className="form-control" id="timestampFrom" value={timestampFrom} onChange={(e) => setTimestampFrom(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="timestampTo" className="form-label">Book Through:</label>
            <input type="date" className="form-control" id="timestampTo" value={timestampTo} onChange={(e) => setTimestampTo(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Book Now</button>
        </form>
        <br></br>
      </div>
      )}
    </div>
  );
}

export default BookYacht;
