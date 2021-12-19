import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { gql, useSubscription } from "@apollo/client";


const containerStyle = {
  width: "800px",
  height: "600px",
};

const center = {
  lat: 40.7831,
  lng: -73.9712
};

const CarMap = () => {
  // At the top of this component you should subscribe to updates from the server.
  // See https://www.apollographql.com/docs/react/data/subscriptions/#executing-a-subscription
  const CARS_SUBSCRIPTION = gql`
      subscription cars {
        cars {
          id
          location {
            latitude
            longitude
          }
          destination {
            latitude
            longitude
          }
          distanceToDestination
        }
      }  
    `;
  type Coordinates = { latitude: number; longitude: number };

  type Car = {
    id: String;
    location: Coordinates;
    destination: Coordinates;
    distanceToDestination: number;
  };
  const [selectedCar,setSelectedCar] = useState({});
  const { data, loading, error } = useSubscription(CARS_SUBSCRIPTION);
  if (data) {
    return (
      <div style={{ height: "100vh", width: "100%", position: "absolute", zIndex: 0, }}>
        <div style={{
          position: "absolute",
          zIndex: 0,
          width: "100%",
          height: "100%"
        }}>
          <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY as string}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
              {/* For documentation on the MapView see https://react-google-maps-api-docs.netlify.app/ */
                data.cars.map((car: Car) => {
                  return (
                    <Marker
                      position={{ lat: car!.location!.latitude, lng: car!.location!.longitude }}
                      icon={{ url: '/Car.png' }}
                      onClick={()=>setSelectedCar(car)}
                    />)
                })
              }
            </GoogleMap>
          </LoadScript>
        </div>
        {Object.keys(selectedCar).length !== 0?<CarDetails selectedCar={selectedCar} />:null}
      </div>
    );
  } else if (error) {
    return <h1>{error}</h1>
  } else {
    return <h1>loading</h1>
  }
};

const CarDetails = (props:any) => {
  const {id,location,distanceToDestination} = props.selectedCar;
  console.log(id)
  return (
    <div style={{
      height: 250, width: 300, backgroundColor: "lightGrey", zIndex: 1,
      position: "absolute", top: 350
    }}>
      <h3>Car#{id}</h3>
      <h4>Location: {location.latitude},{location.longitude}</h4>
      <h4>Distance to Destination: {distanceToDestination}</h4>
    </div>
  )
}

export default CarMap;
