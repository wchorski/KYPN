
import { useEffect, useState } from 'react';
import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from './Map.module.css';
import { QueryLoading } from '../../menus/QueryLoading';
import { tMap } from './Map';
import Link from 'next/link';

const myaddress = "111 S Michigan Ave, Chicago, IL 60603 United States"; // Replace with your desired address


const Map = ({  address,  }:tMap) => {
  let mapClassName = styles.map;

  const [coordinance, setCoordinance] = useState<number[]>()


  function testcor(){
    setCoordinance([41, -87])
  }


  useEffect(() => {
    if(address.startsWith('http')) return console.log('web address');
    
    (async function init() {
      // @ts-ignore
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
        iconUrl: 'leaflet/images/marker-icon.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
      });
    })();

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`)
      .then(res => res.json())
      .then(data => {
        const latitude = parseFloat(data[0].lat);
        const longitude = parseFloat(data[0].lon);
        setCoordinance([latitude, longitude])
      })

    // const cord = getCordinace()
    // console.log(cord);
  
  }, []);
  
  if(address.startsWith('http')) return <Link href={address}>{address}</Link>
  if(!coordinance) return <QueryLoading />

  return (<>

    <MapContainer 
      className={mapClassName} 
      // @ts-ignore
      center={coordinance} 
      zoom={14} 
      // width="800" height="400"
      // @ts-ignore
      key={coordinance}
    >
      {/* {children(ReactLeaflet, Leaflet)} */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker 
        icon={Leaflet.icon({
          iconUrl: '/assets/private/logo.png',
          iconRetinaUrl: '/assets/private/logo.png',
          iconSize: [41,41]
        })}
        // @ts-ignore
        position={coordinance}
      >
        <Popup>
          {address}
        </Popup>
      </Marker>
    </MapContainer>
  </>)
}

export default Map;