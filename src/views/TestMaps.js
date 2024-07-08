
import React from "react";

// reactstrap components
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { useEffect, useRef } from "react";
import useGeolocation from "hooks/useGeolocation";
import { createMarker, createInfoWindow, updateMarkers, filterMarkers } from "util/Markers";
import { loadData } from "util/Data";

// marker options
import user_marker from "assets/img/maps_user_marker.png";
import marker_orange from "assets/img/maps_marker_orange_32.png";
import marker_yellow from "assets/img/maps_marker_yellow_32.png";
import marker_blue from "assets/img/maps_marker_blue_32.png";

const MapWrapper = () => {
  const mapRef = useRef(null);
  const { naver } = window;
  const { currentMyLocation } = useGeolocation();
  
  const data = loadData();
  const markersRef = [];
  const markers = [];
  const markerOpts = [ user_marker, marker_orange, marker_yellow, marker_blue ];
  const filter = 0;
  const btns = [];
  
  useEffect(() => {
    if (currentMyLocation.lat !== 0 && currentMyLocation.lng !== 0) {
      const mapOptions = {
        center: new naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng),  // 지도의 초기 중심 좌표
        logoControl: false,     // 네이버 로고 표시 X
        mapDataControl: false,  // 지도 데이터 저작권 컨트롤 표시 X
        scaleControl: true,     // 지도 축척 컨트롤의 표시 여부
        tileDuration: 200,      // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
        zoom: 17,               // 지도의 초기 줌 레벨
        zoomControl: true,      // 줌 컨트롤 표시
        zoomControlOptions: { position: 9 }, // 줌 컨트롤 우하단에 배치
      };
      mapRef.current = new naver.maps.Map(
        'map',
        mapOptions
      );
      
      // 현재 위치 마커 표시
      createMarker(mapRef, currentMyLocation, { url: markerOpts[0], });

      // 마커 및 정보창 생성
      for (let i = 0; i < data.length; i++) {
        const marker = createMarker(mapRef, data[i], { url: markerOpts[data[i].type], });
        createInfoWindow(mapRef, marker, data[i]);
        markersRef.push(marker);
        //markers.push(marker);
      }

      // 마커 필터링 이벤트
      filterMarkers(filter, markersRef, markers);


      // 지도 줌 인/아웃 시 마커 업데이트 이벤트 핸들러
      naver.maps.Event.addListener(mapRef.current, "zoom_changed", () => {
        if (mapRef.current !== null) {
          updateMarkers(mapRef.current, markers);
        }
      });

      // 지도 드래그 시 마커 업데이트 이벤트 핸들러
      naver.maps.Event.addListener(mapRef.current, "dragend", () => {
        if (mapRef.current !== null) {
          updateMarkers(mapRef.current, markers);
        }
      });

      mapRef.current.setCenter(naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng));
      updateMarkers(mapRef.current, markers);
    }
  }, [currentMyLocation]);
}

function FullScreenMap() {
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <div className="maps-filter">
                  <a
                    className="btn btn-round btn-primary"
                  >
                    편의점
                    {/* 쓰레기통 */}
                  </a>
                  <a> </a>
                  <a
                    className="btn btn-round btn-warning"
                  >
                    음식점
                    {/* 분리수거시설 */}
                  </a>
                  <a> </a>
                  <a
                    className="btn btn-round btn-info"
                  >
                    카페
                    {/* 의류수거함 */}
                  </a>
                  <a> </a>
                  <a
                    className="btn btn-round" //btn-success"
                  >
                    기타
                    {/* 녹색가게 */}
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <MapWrapper />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default FullScreenMap;
