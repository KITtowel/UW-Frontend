/* global kakao */

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Map = styled.div`
  width: 100vw;
  height: 100vh;
`

function KakaoMap(props) {
  const { markerPositions, size } = props;
  const [kakaoMap, setKakaoMap] = useState(null);
  const [, setMarkers] = useState([]);

  const container = useRef();
  

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(37.50802, 127.062835),
      level: 3
    };
    const map = new kakao.maps.Map(container.current, options);
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

  return <div id="container" ref={container} />;
}

export default KakaoMap;