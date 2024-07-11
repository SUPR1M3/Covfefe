import { Map, Marker, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

const GeoCoding = (props) => {
    const geoCodingApiLoaded = useMapsLibrary("geocoding");
    const [geoCodingService, setGeocodingService] = useState();
    const [geoCodingResult, setGeoCodingResult] = useState();

    useEffect(() => {
        if (!geoCodingApiLoaded) {
            return;
        }
        setGeocodingService(new window.google.maps.Geocoder());
    }, [geoCodingApiLoaded]);

    useEffect(() => {
        if (!geoCodingService || !props.address) {
            return;
        }
        geoCodingService.geocode({ address:props.address }, (results, status) => {
            if (results && status === "OK") {
                setGeoCodingResult({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() })
            }
            else{
                console.log(status);
            }
        })
    }, [geoCodingService]);

    return geoCodingResult ? <Map zoom={9} center={geoCodingResult}>
                <Marker position={geoCodingResult}></Marker>
            </Map>
            : <p className="text-xl">Invalid Address</p>
}

export default GeoCoding;