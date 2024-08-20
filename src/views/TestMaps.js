
import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { useEffect, useRef, useState } from "react";
import useGeolocation from "hooks/useGeolocation";
import { createMarker, createInfoWindow, updateMarkers, filterMarkers } from "util/Markers";

// marker options
import user_marker from "assets/img/maps_user_marker_nav_32.png";
import marker_orange from "assets/img/maps_marker_orange_32.png";
import marker_yellow from "assets/img/maps_marker_yellow_32.png";
import marker_blue from "assets/img/maps_marker_blue_32.png";

function FullScreenMap() {
  const mapRef = useRef(null);
  const { naver } = window;
  const { currentMyLocation } = useGeolocation();
  const navigate = useNavigate();
  const location = useLocation();
  const keyword = decodeURI(location.pathname.split('/').pop());
  
  const markers = [];
  const markerOpts = [ user_marker, marker_orange, marker_yellow, marker_blue ];

  var filterState = 0;
  var isVisible = [];
   
  const [searchKeyword, setSearchKeyword] = useState("");
  const [data, setData] = useState([]);

  const updateData = (newData) => {
    const transformedData = newData.map(item => {
      let newItem = { ...item };
      if (newItem.type === "쓰레기통") newItem.type = 1;
      else if (newItem.type === "분리수거시설") newItem.type = 2;
      else if (newItem.type === "의류수거함") newItem.type = 3;
      else if (newItem.type === "녹색가게") newItem.type = 4;
      return newItem;
    });

    setData(transformedData);
  };
  
  const getData = async (from) => {
    try {
      const response = await axios.get(from);
      updateData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const postData = async (to, data) => {
    try {
      const response = await axios.post(to, data);
      updateData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error in postData:', error);
      throw error;
    }
  };

  useEffect(() => {
    console.log("keyword:", keyword);
    if (keyword && keyword !== 'maps') {
      const url = '/eoditsseu/api/maps/search';
      const requestData = { boardType: 'maps', keyword: keyword };
      postData(url, requestData);
    } else {
      getData('/eoditsseu/api/maps');
    }
  }, [keyword]); 

  const MapWrapper = () => {
    
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
          markers.push(marker);
          isVisible.push(true);
        }

        // 지도 줌 인/아웃 시 마커 업데이트 이벤트 핸들러
        naver.maps.Event.addListener(mapRef.current, "zoom_changed", () => {
          if (mapRef.current !== null) {
            updateMarkers(mapRef.current, markers, isVisible);
          }
        });

        // 지도 드래그 시 마커 업데이트 이벤트 핸들러
        naver.maps.Event.addListener(mapRef.current, "dragend", () => {
          if (mapRef.current !== null) {
            updateMarkers(mapRef.current, markers, isVisible);
          }
        });

        mapRef.current.setCenter(naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng));
        updateMarkers(mapRef.current, markers, isVisible);
      }
    }, [currentMyLocation]);
  }

  const Button = ({ id, name, className }) => {
    const [clicked, setClicked] = useState(false);
    // const onClick = () => setClicked(!clicked);

    // 마커 필터링 이벤트
    const onClick = (e) => {
      const type = Number(e.target.id);
  
      if ((filterState >> type) & 1) filterState &= ~(1 << type);
      else filterState |= 1 << type;
  
      // console.log(type, filterState);
  
      filterMarkers(filterState, data, isVisible);
      updateMarkers(mapRef.current, markers, isVisible);
      setClicked(!clicked);
    }

    return (
        <div
            className={
                "btn btn-round " + (clicked ? className : "")
            }
            id = {id}
            onClick={onClick}
        >
            {name}
        </div>
    );
  }
  
  const handleSearch = (keyword) => {
    if (keyword === "" || keyword === undefined) return;
    console.log("navigate");
    navigate(`/eoditsseu/maps/search/${keyword}`);
    setSearchKeyword(keyword);
  }

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content" style={{ marginTop: '-100px', paddingBottom: '3px' }}>
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
              <Row>
                <Col>
                  <div className="maps-filter">
                    {/* <button className="active active-pro" id="1" onClick={handleFilter}>편의점</button> */}
                    <Button id="1" name="쓰레기통" className="btn-primary"/>
                    <a> </a>
                    <Button id="2" name="분리수거시설" className="btn-warning"/>
                    <a> </a>
                    <Button id="3" name="의류수거함" className="btn-info"/>
                    <a> </a>
                    <Button id="4" name="녹색가게" className="btn-success"/>
                  </div>
                </Col>
                <Col md="4">
                    <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                      <InputGroup className="no-border float-right"
                        style={{ marginTop: '10px' }}>
                        { searchKeyword === ""
                         ? <Input placeholder="Search..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/>
                         : <Input value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/>}
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <button className="now-ui-icons ui-1_zoom-bold" 
                              style={{ background: "none", border: "none"}}
                              onClick={() => handleSearch(searchKeyword)}/>
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </form>
                </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden", height: '570px' }}
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
