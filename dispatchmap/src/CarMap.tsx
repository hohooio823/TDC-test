import { GoogleMap, LoadScript } from "@react-google-maps/api";

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

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY as string}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11.5}>
        {/* For documentation on the MapView see https://react-google-maps-api-docs.netlify.app/ */}
      </GoogleMap>
    </LoadScript>
  );
};

export default CarMap;
