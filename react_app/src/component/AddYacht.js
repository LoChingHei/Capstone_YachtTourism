import React from 'react';
import axios from 'axios';

class AddYacht extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: new Array(15).fill(''), // Initialize inputs array with empty strings
      yachts: [],
      error: null
    };
  }

  handleChange = (index, event) => {
    const { value } = event.target;
    this.setState(prevState => {
      const inputs = [...prevState.inputs];
      inputs[index] = value;
      return { inputs };
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { inputs } = this.state;
    //"4_M4R550_Canada_....."
    const inputValue = inputs.join('_');

    try {
      await axios.get(`http://localhost:8080/add_Yacht/${inputValue}`);
      console.log('GET request successful');
      // You can do something after the request is successful
    } catch (error) {
      console.error('Error sending GET request:', error);
    }
  };

  handleGetAllYachts = () => {
    fetch('http://localhost:8080/get_all_yachts')
    .then(response => response.json())
    .then(data => {
      // Update the state with the received yachts
      this.setState({ yachts: data, error: null });
    })
    .catch(error => {
      console.error('Failed to fetch yachts:', error);
      this.setState({ error: error.message }); // Update error state
    });
  };

  render() {
    const { inputs, yachts, error } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Yacht Form</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          {inputs.map((input, index) => (
            <input
              key={index}
              type="text"
              value={input}
              onChange={e => this.handleChange(index, e)}
              placeholder={`Input ${index + 1}`}
            />
          ))}
          <button type="submit">Submit</button>
        </form>
        <button onClick={this.handleGetAllYachts}>List All Yachts</button>
        <div>
          {yachts.map(yacht => (
            <div key={yacht.Key}>
              <h2>{yacht.Record.name}</h2>
              <p>Model: {yacht.Record.model}</p>
              <p>Owner: {yacht.Record.owner}</p>
              <p>Description: {yacht.Record.description}</p>
              {/* Render other details as needed */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AddYacht;
