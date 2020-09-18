import React from "react";
import "./Place.css";
import { Button, Card, CardColumns, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Place = (props) => {
  const { name, img, id, key } = props.place;
  console.log(props);
  return (
      <div className="place">
          <div>
              <img src={img} alt=""/>
          </div>
          <div>
              <Link to={"/place/"+key}>
              <Button style={{marginLeft:'60px'}} onClick={() => props.handlePlaceDetails(props.place)} variant="warning">{name}</Button>
              </Link>
          </div>
        
      </div>
  );
};

export default Place;
