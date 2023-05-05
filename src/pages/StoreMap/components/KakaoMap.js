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

function KakaoMap({detailPageInfo, getStoreDetail}) {
  const [position, setPosition] = useState([]);
  const [curPos, setCurPos] = useState({ lat: 33.450701, lng: 126.570667 });
  const [randValue, setRandValue] = useState(0.000001);
  const [isCenter, setIsCenter] = useState(false);
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
    isPanto: true,
    level: 2,
    sw: null,
    ne: null,
  })

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


  const handleSubmit = async event => {
    event.preventDefault();

    const res = await axios.post(`http://${process.env.REACT_APP_API_BASE_URL}/stores/distance_order/`, {
      'latitude': parseFloat(curPos.lat),
      'longitude': parseFloat(curPos.lng)
    });
    setPosition(res.data.results);
    console.log(res.data.results);
  };

  // 가맹점 정보를 받아옴
  useEffect(() => {
    fetch("/")
      .then((res) => res.json())
      .then((data) => setPosition(data));

    // const res = axios.get(`http://${process.env.REACT_APP_API_BASE_URL}/stores/distance_order/`, {
    //   "latitude": curPos.lat,
    //   "longitude": curPos.lng
    // });
    // handleSubmit();
    // console.log(res);


  }, []);

  //지도의 중심이 현재위치인지를 판단
  const getIsCenter = (moveLat, moveLng) => {
    let tempLat = Math.abs(curPos.lat - moveLat);
    let tempLng = Math.abs(curPos.lng - moveLng);
    if (tempLat > 0.00005 || tempLng > 0.00005) {
      setIsCenter(false);
    } else {
      setIsCenter(true);
    }
  }

  useEffect(() => {
    console.log(state.ne);
    console.log(state.sw);
    console.log(state.center);
  }, [state])

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
          sw: map.getBounds().getSouthWest().toString(),
          ne: map.getBounds().getNorthEast().toString(),
        }))}
      >
        <ZoomControl position={kakao.maps.ControlPosition.RIGHT} />
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        {!state.isLoading && (
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
          {position.map((pos, idx) => (
            <MapMarker
              // key={`${pos.latitude} - ${pos.longitude}`}
              key={`${pos.lat} - ${pos.lng}`}
              position={{
                // lat: String(pos.latitude),
                // lng: String(pos.lng),
                lat: String(pos.lat),
                lng: String(pos.lng)
              }}
              clickable={true}
              onClick={() => getStoreDetail(idx)}
              image={{
                src: detailPageInfo && detailPageInfo === idx ? Marker2 : Marker1,
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