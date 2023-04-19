/* global kakao */

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MdGpsFixed } from 'react-icons/md'

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
  color: rgb(51, 150, 255);
  cursor: pointer;
`;

function KakaoMap(props) {
  const [kakaoMap, setKakaoMap] = useState(null);
  const [locPosition, setLocPosition] = useState(new kakao.maps.LatLng(37.50802, 127.062835));

  const container = useRef();

  function getCurPos(map, reload = true) {
    map.setCenter(locPosition);
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
    if (navigator.geolocation) {
        
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {
            
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            
            var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다            
            // 마커와 인포윈도우를 표시합니다
            setLocPosition(locPosition);
            // displayMarker(locPosition, reload);
            if (reload) {
              // 지도에 마커 표시
              let marker = new kakao.maps.Marker({  
                  map: map, 
                  position: locPosition
              }); 
            }
            
            // 지도 중심좌표를 접속위치로 변경
            map.setCenter(locPosition);  
          });
        
    }
  }

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(37.50802, 127.062835),
      level: 3
    };
    let map = new kakao.maps.Map(container.current, options);
    getCurPos(map);

    // map에 컨트롤 추가(확대/축소, 일반/스카이뷰 전환
    let mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.Right);
    setKakaoMap(map);
  }, [container]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    // save center position
    const center = kakaoMap.getCenter();

    // change viewport size
    container.current.style.width = `${100}vw`;
    container.current.style.height = `${100}vh`;

    // relayout and...
    kakaoMap.relayout();
    // restore
    kakaoMap.setCenter(center);
  }, [kakaoMap]);

  return (
    <>
      <div id="container" ref={container} />
      <CurPosBtn onClick={() => getCurPos(kakaoMap, false)}>
        <MdGpsFixed />
      </CurPosBtn>
    </>
    
  );
}

export default KakaoMap;