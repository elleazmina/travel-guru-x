import React , { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { render } from '@testing-library/react';

const mapStyles = {
    width: '500px',
    height: '500px'
  };

  export class MapShower extends Component {
    render() {
      return (
        <Map google={this.props.google} zoom={14} style={mapStyles}>
            
   
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
   
          <InfoWindow onClose={this.onInfoWindowClose}>
              {/* <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div> */}
          </InfoWindow>
        </Map>
      );
    }
  }
   
  export default GoogleApiWrapper({
    apiKey: ("AIzaSyDcvEsO10WTKUzJUxRgheLtO1N0pFmY26c")
  })(MapShower)