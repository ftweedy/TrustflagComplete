import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class Maps extends Component {
  constructor(props){
    super(props)
    this.state = {
        zoom: 5,
    }
  }
 
  render() {
    let { lat, lng } = this.props
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD0d3qO--0PkWxZF4Yvmji3Z3yzWhv3Koo" }}
          center={{lat: lat, lng: lng}}
          defaultZoom={this.state.zoom}
        >
          <AnyReactComponent
            lat={lat}
            lng={lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Maps;