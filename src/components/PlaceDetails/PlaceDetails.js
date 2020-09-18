import React, { useState } from "react";
import "./PlaceDetails.css";
import { Link, useHistory, useParams } from "react-router-dom";
import data from "../../places.json";
import { Button, Col, Form } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const PlaceDetails = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { placeId } = useParams();
  const place = data.find((place) => place.key === placeId);
  console.log(place);

  const history = useHistory();

  const handleBooking = () => {
    history.push("/booking");
  }

  return (
    <div className="container">
      <div className="place-info">
        <h1>{placeId}</h1>
        <p>{place.details}</p>
      </div>

      <div className="calendar">
        <Form>
          <Form.Group controlId="formGridOrigin">
            <Form.Label>Origin</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group controlId="formGridDestination">
            <Form.Label>Destination</Form.Label>
            <Form.Control placeholder={placeId}/>
          </Form.Group>
          <Form.Row>

            <Form.Group as={Col} controlId="formGridFrom">
              <Form.Label>From</Form.Label>
              <br/>
              <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                dateFormat ='dd/MM/yyyy'
                minDate={new Date()}
               />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridTo">
              <Form.Label>To</Form.Label>
              <br/>
              <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                dateFormat ='dd/MM/yyyy'
               />
            </Form.Group>
          </Form.Row>

          <Link to="/booking">
          <Button onClick={handleBooking} variant="warning" style={{ width: "100%" }} type="submit">
            Start Booking
          </Button>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default PlaceDetails;
