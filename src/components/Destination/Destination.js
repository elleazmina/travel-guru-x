import React, { useState } from "react";
import './Destination.css'
import placeData from "../../places.json";
import { Button, Card } from "react-bootstrap";
import Place from "../Place/Place";

const Destination = () => {
  const [places, setPlaces] = useState(placeData);
  const handlePlaceDetails = (place) => {
       console.log('Details', place);
  }
  return (
    <div className="home-container">
      <div className="details-container">
      <Card style={{background: 'transparent', color:'black', marginTop:'50px'}}>
 
 <Card.Body>
   <Card.Title style={{fontSize:'70px'}}>COX'S BAZAR</Card.Title>
   <Card.Text style={{width:'100%', color:'black'}}>
   Cox’s Bazar is a town on the southeast coast of Bangladesh. It’s known for its very long, sandy beachfront, stretching from Sea Beach in the north to Kolatoli Beach in the south...
   </Card.Text>
   <Button variant="warning">Booking ➜ </Button>
 </Card.Body>
</Card>
      </div>
      <div className="place-container">
        <ul>
          {places.map(place => (
            <Place 
            handlePlaceDetails = {handlePlaceDetails}
            place = {place}></Place>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Destination;
