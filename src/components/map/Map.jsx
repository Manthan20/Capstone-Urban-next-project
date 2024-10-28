import './map.scss';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
import "leaflet/dist/leaflet.scss";
function Map(){
    return(
        <MapContainer className='mapPart' center={[56.1304, -106.3468]} zoom={8} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[56.1304, -106.3468]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>

    )
    
}
export default Map;