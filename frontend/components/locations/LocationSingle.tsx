import { gql, useQuery } from "@apollo/client"
import styled from "styled-components"
import ErrorMessage from "../ErrorMessage"
import { QueryLoading } from "../menus/QueryLoading"
import { Location } from "../../lib/types"
import {  MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import Map from "../blocks/Map";

export function LocationSingle({id}:{id:string}) {

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

  return (
    <StyledLocation>
      <h1>{name}</h1>

      <address>
        {address}
      </address>

      <Map width="800" height="400" center={DEFAULT_CENTER} zoom={12}>
        {({ TileLayer, Marker, Popup }:any, Leaflet:any) => (
          <>
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
              position={DEFAULT_CENTER}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </>
        )}
      </Map>
    </StyledLocation>
  )
}

const StyledLocation = styled.article`
  
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