import { css } from '@emotion/react';
import React, { useState } from "react";

declare global {
    interface Window {
        kakao: any;
    }
}
const { kakao } = window;

const LocationMap = ({ address } : { address: any}) => {
    
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [map, setMap] = useState(new Map());        

    let geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function(result: any, status: any) {
        
        if(status === kakao.maps.services.Status.OK) {

            let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        
            setLat(coords.getLat());
            setLng(coords.getLng());               
            
            
            let mapContainer = document.getElementById("myMap"),
                mapOption = {
                    center : new kakao.maps.LatLng(Number(lat), Number(lng)),
                    level: 3
                };
            let baseMap = new kakao.maps.Map(mapContainer, mapOption);
        }
    })     

    return (
        <div id="myMap" style={{
            width: '500px',
            height: '500px'
        }}>    
        </div>
    );
};

const wrapper = css`
  position: relative;
  width: 100%;
  max-width: 30rem;
`
export default LocationMap