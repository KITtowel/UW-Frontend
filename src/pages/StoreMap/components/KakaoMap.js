import React, { useEffect } from 'react';
import styled from 'styled-components';

const { kakao } = window;

const Map = styled.div`
  width: 100vw;
  height: 100vh;
`

function KakaoMap(props) {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    }
    const map = new window.kakao.maps.Map(container, options);
  }, []);

  return (
    // <div id="map" style={{
    //   width: '1000px',
    //   height: '100vh'
    // }}></div>
    <Map id='map'/>
  );
}

export default KakaoMap;