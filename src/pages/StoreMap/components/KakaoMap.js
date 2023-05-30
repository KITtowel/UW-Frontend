/* global kakao */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdGpsFixed } from 'react-icons/md'
import { Map, MapMarker, MapTypeControl, MarkerClusterer, ZoomControl } from 'react-kakao-maps-sdk';
import axios from 'axios';
import { Current, Marker1, Marker2 } from '../../../assets/marker';

const CurPosBtn = styled.button`
  position: absolute;
  right: 3px;
  top: 230px;
  width: 32px;
  height: 32px;
  line-height: 35px;
  font-size: 18px;
  background-color: rgb(255, 255, 255);;
  z-index: 9999;
  border-radius: 3px;
  border: 0;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 2px 0px;
  color: ${(props) => props.isCenter ? 'rgb(51, 150, 255)' : 'rgb(204, 204, 204)'};
  cursor: pointer;
`;

function KakaoMap({state, setState, setStoreList, detailPageInfo, getStoreDetail, clickedTag, keyword, keyType}) {
  const [markerList, setMarkerList] = useState([]);
  const [curPos, setCurPos] = useState(
    () => JSON.parse(window.localStorage.getItem("curPos")) || { lat: 35.854795175382435, lng: 128.54823034227059 });
  const [randValue, setRandValue] = useState(0.000001);
  const [isCenter, setIsCenter] = useState(false);

  //현재 위치의 좌표를 설정함
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
          setCurPos({
            lat: position.coords.latitude, // 위도
            lng: position.coords.longitude, // 경도
          });
          setIsCenter(true);
          localStorage.setItem('curPos', JSON.stringify({lat: position.coords.latitude, lng: position.coords.longitude}))
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }))
    }
  }, [])

  //현재 위치 값으로 map중앙을 설정 이동하는 함수
  const setCenterToCurPos = () => {
    setRandValue((prev) => prev === 0.000001 ? -0.000001 : 0.000001);
    setState((prev) => ({
      ...prev,
      center: {
        lat: curPos.lat + randValue,
        lng: curPos.lng + randValue
      },
    }));
    setIsCenter(true);
  }

  // 가맹점 정보를 받아옴
  useEffect(() => {
    async function getStoreMakerList()  {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/stores/map_mark/`, {
        "latitude": state.center.lat,
        "longitude": state.center.lng,
        "ne_latitude": state.neLat,
        "ne_longitude": state.neLng,
        "sw_latitude": state.swLat,
        "sw_longitude": state.swLng
      })
      setMarkerList(res.data.data);
      const listRes = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/stores/distance_order/`, {
        "latitude": state.center.lat,
        "longitude": state.center.lng,
        "ne_latitude": state.neLat,
        "ne_longitude": state.neLng,
        "sw_latitude": state.swLat,
        "sw_longitude": state.swLng
      })
      setStoreList(listRes.data);
    }
    async function getStoreTagList() {
      const listRes = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/stores/category_map_mark/`, {
        "latitude": state.center.lat,
        "longitude": state.center.lng,
        "ne_latitude": state.neLat,
        "ne_longitude": state.neLng,
        "sw_latitude": state.swLat,
        "sw_longitude": state.swLng,
        "category": `${clickedTag.join(" ")}`
      })
      setMarkerList(listRes.data.data);
    }

    async function getStoreSearchList() {
      const listRes = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/stores/search_map_mark/`, {
        "latitude": state.center.lat,
        "longitude": state.center.lng,
        "ne_latitude": state.neLat,
        "ne_longitude": state.neLng,
        "sw_latitude": state.swLat,
        "sw_longitude": state.swLng,
        "search_type": keyType,
        "search": keyword
      })
      setMarkerList(listRes.data.data);
    }
    
    if (state.level <= 2) {
      if (clickedTag[0] === '전체') {
        keyword === '' ? getStoreMakerList() : getStoreSearchList();
      } else {
        getStoreTagList();
      }
    }
  }, [state, clickedTag]);

  //지도의 중심이 현재위치인지를 판단
  const getIsCenter = (moveLat, moveLng) => {
    let tempLat = Math.abs(curPos.lat - moveLat);
    let tempLng = Math.abs(curPos.lng - moveLng);
    if (tempLat > 0.00001 || tempLng > 0.00001) {
      setIsCenter(false);
    } else {
      setIsCenter(true);
    }
  }

  return (
    <>
      <Map
        center={state.center} //map 중앙값 설정
        style={{ width: "100vw", height: "100vh" }} //map 사이즈 설정
        level={state.level} //map 확대 레벨 설정
        isPanto={state.isPanto}
        onCenterChanged={(map) => getIsCenter(map.getCenter().getLat(), map.getCenter().getLng())} //지도의 중심이 현재 위치인지를 판단
        onBoundsChanged={(map) => setState((prev) => ({
          ...prev,
          center: {
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          },
          level: map.getLevel(),
          swLat: map.getBounds().getSouthWest().getLat(),
          swLng: map.getBounds().getSouthWest().getLng(),
          neLat: map.getBounds().getNorthEast().getLat(),
          neLng: map.getBounds().getNorthEast().getLng(),
        }))}
      >
        <ZoomControl position={kakao.maps.ControlPosition.RIGHT} />
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        {!state.isLoading && isCenter && (
          <MapMarker
            position={state.center}
            image={{
              src: Current,
              size: { wiidth: 48, height: 48 },
              options: {
                offset: {
                  x: 30,
                  y: 40
                }
              }
            }}
          >

          </MapMarker>
        )}
        <MarkerClusterer
          averageCenter={true}
          minLevel={3}
        >
          {markerList.map((store) => (
            <MapMarker
              key={store.store_id}
              position={{
                lat: String(store.latitude),
                lng: String(store.longitude)
              }}
              clickable={true}
              onClick={() => getStoreDetail(store.store_id)}
              image={{
                src: detailPageInfo && (detailPageInfo.latitude === store.latitude && detailPageInfo.longitude === store.longitude) ? Marker2 : Marker1,
                size: { wiidth: 48, height: 48 },
                options: {
                  offset: {
                    x: 30,
                    y: 40
                  }
                }
              }}
            />
          ))}
        </MarkerClusterer>
      </Map>
      <CurPosBtn onClick={setCenterToCurPos} isCenter={isCenter}>
        <MdGpsFixed />
      </CurPosBtn>
    </>

  );
}

export default KakaoMap;