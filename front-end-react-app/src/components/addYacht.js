import React from 'react';
import axios from 'axios';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

class AddYacht extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yachtId: '',
      yachtName: '',
      description: '',
      location: '',
      owner: '',
      skipper: '',
      capacity: '',
      length: '',
      width: '',
      model: '',
      bedrooms: '',
      amenities: '',
      crew: '',
      safetyFeatures: '',
      photos: '',
    };
  }

  /*uploadToIpfs = async () => {
    const uploadUrl = await upload({
      data: [photos],
      options: {
        uploadWithGatewayUrl: true,
        uploadWithoutDirectory: true
      }
    });
https://fuchsia-absent-goose-826.mypinata.cloud/ipfs/
    console.log('Upload URL: ', uploadUrl)
  };
*/
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFileChange = (event) => {
    this.setState({ photos: `yachtPicture.jpg` });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      yachtId,
      yachtName,
      description,
      location,
      owner,
      skipper,
      capacity,
      length,
      width,
      model,
      bedrooms,
      amenities,
      crew,
      safetyFeatures,
      photos, 
    } = this.state;
  

    // Concatenate form field values with underscore
    const inputValue = `${yachtId}_${location}_logs_${owner}_${photos}_${yachtName}_${model}_${capacity}_${description}_${skipper}_${length}_${width}_${amenities}_${crew}_${safetyFeatures}`;

    console.log('Concatenated input value:', inputValue);

    try {
      await axios.get(`http://localhost:8085/add_Yacht/${inputValue}`);
      console.log('GET request successful');
      // You can do something after the request is successful
    } catch (error) {
      console.error('Error sending GET request:', error);
    }

  };

render() {
    const {
      yachtId,
      yachtName,
      description,
      location,
      owner,
      skipper,
      capacity,
      length,
      width,
      model,
      bedrooms,
      amenities,
      crew,
      safetyFeatures,
      photos
    } = this.state;

    return (
      <div>
        {/* Yacht owner form */}
        <Container className="mt-4">
          <h2>Add Yacht</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="yachtId">
              <Form.Label>Yacht ID:</Form.Label>
              <Form.Control type="text" name="yachtId" value={yachtId} onChange={this.handleChange} placeholder="Enter yacht ID" />
            </Form.Group>
            <Form.Group controlId="yachtName">
              <Form.Label>Yacht Name:</Form.Label>
              <Form.Control type="text" name="yachtName" value={yachtName} onChange={this.handleChange} placeholder="Enter yacht name" />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control as="textarea" name="description" value={description} onChange={this.handleChange} rows={3} placeholder="Describe the yacht" />
            </Form.Group>
            <Row>
            <Form.Group controlId="location" as={Col}>
              <Form.Label>Location:</Form.Label>
              <Form.Control type="text" name="location" value={location} onChange={this.handleChange} placeholder="Provide the yacht location" />
            </Form.Group>
            <Form.Group controlId="owner" as={Col}>
              <Form.Label>Owner:</Form.Label>
              <Form.Control type="text" name="owner" value={owner} onChange={this.handleChange} placeholder="Specify yacht owner" />
            </Form.Group>
            </Row>
            <Row>
            <Form.Group controlId="skipper" as={Col}>
              <Form.Label>Skipper:</Form.Label>
              <Form.Control type="text" name="skipper" value={skipper} onChange={this.handleChange} placeholder="Provide skipper information" />
            </Form.Group>
            <Form.Group controlId="capacity" as={Col}>
              <Form.Label>Capacity:</Form.Label>
              <Form.Control type="text" name="capacity" value={capacity} onChange={this.handleChange} placeholder="Enter maximum capacity" />
            </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="length">
                <Form.Label>Length (LOA):</Form.Label>
                <Form.Control type="text" name="length" value={length} onChange={this.handleChange} placeholder="Enter yacht length (feet/meters)" />
              </Form.Group>
              <Form.Group as={Col} controlId="width">
                <Form.Label>Width (Beam):</Form.Label>
                <Form.Control type="text" name="width" value={width} onChange={this.handleChange} placeholder="Enter yacht width (feet/meters)" />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="model">
                <Form.Label>Model:</Form.Label>
                <Form.Control type="text" name="model" value={model} onChange={this.handleChange} placeholder="Enter yacht model" />
              </Form.Group>
              <Form.Group as={Col} controlId="bedrooms">
                <Form.Label>Number of Bedrooms:</Form.Label>
                <Form.Control type="text" name="bedrooms" value={bedrooms} onChange={this.handleChange} placeholder="Enter number of bedrooms" />
              </Form.Group>
            </Row>
            <Form.Group controlId="amenities">
              <Form.Label>Amenities:</Form.Label>
              <Form.Control as="textarea" name="amenities" value={amenities} onChange={this.handleChange} rows={3} placeholder="List yacht amenities" />
            </Form.Group>
            <Form.Group controlId="crew">
              <Form.Label>Crew Details:</Form.Label>
              <Form.Control as="textarea" name="crew" value={crew} onChange={this.handleChange} rows={3} placeholder="Describe the crew members" />
            </Form.Group>
            <Form.Group controlId="safetyFeatures">
              <Form.Label>Safety Features:</Form.Label>
              <Form.Control as="textarea" name="safetyFeatures" value={safetyFeatures} onChange={this.handleChange} rows={3} placeholder="Highlight safety equipment" />
            </Form.Group>
            <Form.Group controlId="photos">
              <Form.Label>Add Photos:</Form.Label>
              <Form.Control type="file" name="photos" onChange={this.handleFileChange} accept="image/*" />
            </Form.Group>
            <br></br>
            <Button variant="primary" type="submit">Add Yacht</Button>
          </Form>
          <br></br>
        </Container>
      </div>
    );
  }
}

export default AddYacht;