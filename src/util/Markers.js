

// 마커 생성 함수
export const createMarker = (mapRef, location, icon = null) => {
  const marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(location.lat, location.lng),
    map: mapRef.current,
    icon: icon,
  });

  return marker;
}

// 정보창 생성 함수
export const createInfoWindow = (mapRef, marker, location) => {
  const infoWindow = new naver.maps.InfoWindow({
    content: [
      '<div style="padding: 10px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;">',
      `   <div style="font-weight: bold; margin-bottom: 5px;">${location.title}</div>`,
      `   <div style="font-size: 13px;">${location.detail}<div>`,
      "</div>",
    ].join(""),
    maxWidth: 300,
    anchorSize: {
      width: 12,
      height: 14,
    },
    borderColor: "#cecdc7",
  });
  
  // 클릭 이벤트
  naver.maps.Event.addListener(marker, "click", () => {
    if (infoWindow.getMap()) {
      infoWindow.close();
    } else if (mapRef.current !== null) {
      infoWindow.open(mapRef.current, marker);
    }
  });

  infoWindow.close();
  
  return infoWindow;
}

// 마커 표시 함수
const showMarker = (map, marker) => {
  marker.setMap(map);
};

// 마커 숨김 함수
const hideMarker = (marker) => {
  marker.setMap(null);
};

// 마커 렌더링 함수
export const updateMarkers = (map, markers) => {
  const mapBounds = map.getBounds();

  for (let i = 0; i < markers.length; i += 1) {
    const position = markers[i].getPosition();

    if (mapBounds.hasLatLng(position)) {
      showMarker(map, markers[i]);
    } else {
      hideMarker(markers[i]);
    }
  }
};

const ALL = 63;

// 마커 필터링 함수
export const filterMarkers = (filter, markersRef, markers) => {
  
  // 필터 미적용 시, 전체 마커 표시
  if (filter == 0) filter = ALL;

  for (let i = 0; i < markersRef.length; i += 1) {
    if (filter >> markersRef[i].type) 
      markers.push(markersRef[i]);
  }
}