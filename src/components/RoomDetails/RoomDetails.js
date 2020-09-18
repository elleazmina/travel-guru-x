import React from 'react';
import './RoomDetails.css'
import roomData from '../../rooms.json'
import Map from '../MapShower/MapShower';
import MapShower from '../MapShower/MapShower';


const RoomDetails = () => {


    return (
        <div className="container">
          <div>
          {
               roomData.map(room => <div className="room-info">
                   <div>
                       <img style={{ width:'200px', height:'200px', margin:'5px'}} src={room.img} alt=""/>
                   </div>

                   <div>
               <p>{room.title}</p>
               <p>{room.capacity}</p>
               <p>{room.flexibility}</p>
               <p>{room.facility}</p>
                   </div>

               </div>
                )
           }
          </div>

          <div className="map">
            <MapShower></MapShower>
          </div>
        </div>
    );
};

export default RoomDetails;