import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'

declare global {
  interface Window {
    google: any
  }
}

const { google } = window

const LocationMap = ({ location, getLocation }: { location: string, getLocation: Function }) => {

  const mapRef = useRef(null)

  const [latLng] = useState({
    lat: -34.34,
    lng: 150.324
  })

  const setLatLng = (newLatLng: { lat: any; lng: any; }) => {

    latLng.lat = newLatLng.lat
    latLng.lng = newLatLng.lng
  }

  // 로케이션 반환 함수
  const setLocation = (newLoc: string) => {
    getLocation(newLoc)
  }

  useEffect(() => {

    // 기본 저장된 주소 가져오기
    const geocoder = new google.maps.Geocoder()

    geocoder
      .geocode({ 'address': location }, function(result: { geometry: { location: any; }; }[], status: string) {

        if (status === 'OK') {
          const newLatLng = {
            lat: result[0].geometry.location.lat(),
            lng: result[0].geometry.location.lng()
          }

          setLatLng(newLatLng)

          const mapContainer = mapRef.current,
            mapOption = {
              center: latLng,
              zoom: 15,
              mapTypeId: 'roadmap',
              mapTypeControl: false
            }
          const map = new google.maps.Map(mapContainer, mapOption)

          // 검색 input
          const inputText = document.getElementById('input') as HTMLInputElement
          map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText)

          // 검색 버튼
          const submitButton = document.getElementById('search') as HTMLInputElement
          map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton)

          submitButton.addEventListener('click', () => {
            geocode(inputText.value, map)
            inputText.value = ''
          })

          map.addListener('click', (mapsMouseEvent: any) => {

            let evtLatLng = {
              lat: mapsMouseEvent.latLng.lat(),
              lng: mapsMouseEvent.latLng.lng()
            }

            geocodeLatLng(evtLatLng)

          })


        }
      })

    function geocodeLatLng(evtLatLng: any) {
      geocoder
        .geocode({ 'location': evtLatLng }, function(result: { formatted_address: any; }[], status: string) {

          if (status === 'OK') {

            setLocation((result[0].formatted_address))

          }
        })
    }

    function geocode(address: string, map: any) {

      geocoder
        .geocode({ 'address': address }, function(result: { geometry: { location: any; }; }[], status: string) {

          if (status === 'OK') {

            map.setCenter(result[0].geometry.location)

          }

        })

    }

    return () => {

      // setLocation()
    }

  }, [])

  return (
    <>
      <div className='searchBox' css={searchBoxStyle}>
          <input id='input' type='text' placeholder='Search Place' css={inputStyels} />
          <input id='search' type='button' value='search' className='button' css={buttonStyles} />
      </div>

      <div id='map' className='map' ref={mapRef} css={mapStyles}></div>
    </>
  )
}

export default LocationMap

const mapStyles = css`
  position: relative;
  width: 40rem;
  height: 35rem;  
`
const searchBoxStyle = css`
  position: absolute;
  width: 25rem;  
  display: flex;
  z-index: 5;
`

const inputStyels = css`
  background-color: #fff;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);
  margin: 10px;
  padding: 0 0.5em;
  font: 400 18px Roboto, Arial, sans-serif;
  overflow: hidden;
  line-height: 30px;  
`
const buttonStyles = css`
  background-color: blue;
  color: white;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);
  margin: 10px;
  padding: 0 0.5em;
  font: 400 18px Roboto, Arial, sans-serif;
  overflow: hidden;
  height: 30px;
  cursor: pointer;
  margin-left: 5px;
`
