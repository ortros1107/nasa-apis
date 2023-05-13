import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useState, useEffect} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import 'leaflet/dist/leaflet.css';
import Icon from '@/utils/icon';
import icons from '@/data/icons.json';

const createClusterCustomIcon = function (cluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: L.point(33, 33, true),
  })
}


const Map = ({css}) => {

  const eventIcons = icons.events;
  const [events, setEvents] = useState(null);

  useEffect(() => {
    axios.get("https://eonet.gsfc.nasa.gov/api/v3/events")
    .then(res => {
      const disasterEvents = res.data.events.map(disasterEvent => {
        eventIcons.map(eventIcon => {
          if (eventIcon.name === disasterEvent.categories[0].title) {
           return disasterEvent.iconUrl = eventIcon.filename;
          }
        })
        return disasterEvent;
      });
      return setEvents(disasterEvents);
    })
    .catch(err => console.log(err));
  },[eventIcons]);

  return (
    <MapContainer maxBounds={[[-90, 185], [90, -185]]} center={[46.05,14.5]} zoom={13} minZoom={3} scrollWheelZoom={true} className={css} zoomControl={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MarkerClusterGroup
        key={uuidv4()}
        iconCreateFunction={createClusterCustomIcon}
        maxClusterRadius={150}
        spiderfyOnMaxZoom={true}
        polygonOptions={{
          fillColor: 'hsl(0, 0%, 100%)',
          color: 'hsl(168, 76%, 36%)',
          weight: 5,
          opacity: 1,
          fillOpacity: 0.8,
        }}
        showCoverageOnHover={true}
      >
    {
      events?.map(event => {
       return( 
        
       <Marker key={event.id} position={[event.geometry[event.geometry.length - 1].coordinates[1],event.geometry[event.geometry.length - 1].coordinates[0]]} icon={Icon(event.iconUrl)}>
      <Popup className='event-popup'>
        {event.title}
      </Popup>
    </Marker>
    
    )
      })
    }
    </MarkerClusterGroup>
  </MapContainer>
  )
}

export default Map