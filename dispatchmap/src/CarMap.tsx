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
  const CARS_SUBSCRIPTION =gql`
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
  const { data, loading, error } = useSubscription(CARS_SUBSCRIPTION);
  if(data){
    return (
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY as string}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11.5}>
          {/* For documentation on the MapView see https://react-google-maps-api-docs.netlify.app/ */
            data.cars.map((car:Car)=>{
              return (
                <Marker
                  position={{lat:car!.location!.latitude,lng:car!.location!.longitude}}
                  icon={{url:'/Car.png'}}
                />)
            })
          }
        </GoogleMap>
      </LoadScript>
    );
  }else if(error){
    return <h1>{error}</h1>
  }else{
    return <h1>loading</h1>
  }
};

export default CarMap;
