import { gql, useQuery } from "@apollo/client"
import styled from "styled-components"
import ErrorMessage from "../ErrorMessage"
import { QueryLoading } from "../menus/QueryLoading"
import { Location } from "../../lib/types"
import {  MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import Map from "../blocks/Map";
import { useEffect, useState } from "react"

const myaddress = "111 S Michigan Ave, Chicago, IL 60603 United States"; // Replace with your desired address

// Construct the geocoding API URL
const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
  myaddress
)}`;

export function LocationSingle({id}:{id:string}) {

  const [coordinance, setCoordinance] = useState([0,0])

  const { loading, error, data } = useQuery(
    QUERY_LOCATION, {
    variables: { where: { id: id } }
  })

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />
  // console.log(data);
  // console.log(id);
  if(!data.location) return <p> 404: Event not found </p>
  const {id: locationId, name, address, rooms, events, categories, tags}:Location = data?.location

  const DEFAULT_CENTER = [38.907132, -77.036546]

  const getCordinace = async () => {
    try{
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        myaddress
      )}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
			const data = await res.json();
      console.log(data[0]);
      
      const latitude = parseFloat(data[0].lat);
      const longitude = parseFloat(data[0].lon);
      // console.log(data[0]);
      console.log(latitude, longitude);
      
      return [latitude, longitude]

    } catch (err){
      return [0, 0]
    }
  }

  // useEffect(() => {
  //   setCoordinance(getCordinace())
  
  //   // return () => 
  // }, [])
  

  return (
    <StyledLocation>
      <h1>{name}</h1>

      <address>
        {address}
      </address>

      {address && (
        <Map address={address}/>
      )}
      
    </StyledLocation>
  )
}

const StyledLocation = styled.article`
  .leaflet-container{
    max-width: 90em;
    margin: 0 auto;
  }
`

const QUERY_LOCATION = gql`
  query Location($where: LocationWhereUniqueInput!) {
    location(where: $where) {
      id
      name
      address
      rooms
      events {
        id
        summary
        start
      }
      categories {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`