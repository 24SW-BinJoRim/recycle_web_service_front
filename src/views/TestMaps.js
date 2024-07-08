
import React from "react";

// reactstrap components
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { useEffect, useRef } from "react";
import useGeolocation from "hooks/useGeolocation";
import user_marker from "assets/img/maps_user_marker.png";
import marker_blue from "assets/img/maps_marker_blue_32.png";
import { createMarker, createInfoWindow, updateMarkers } from "util/Markers";
import { data_convenience } from "views/TestData";

const MapWrapper = () => {
  const mapRef = useRef(null);
  const { naver } = window;
  const { currentMyLocation } = useGeolocation();
  
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
      createMarker(mapRef, currentMyLocation, { url: user_marker, });

      const samples = data_convenience;
      const markers = [];
      // const infoWindows = [];

      for (let i = 0; i < samples.length; i++) {
        const marker = createMarker(mapRef, samples[i]);
        const infoWindow = createInfoWindow(mapRef, marker, samples[i]);
        markers.push(marker);
        // infoWindows.push(infoWindow);
      }

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
