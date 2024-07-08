import { useState, useEffect } from 'react';

const useGeoloaction = () => {
  const [currentMyLocation, setCurrentMyLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [locationLoading, setLocationLoading] = useState(false);

  const getCurPosition = () => {
    setLocationLoading(true);
    const success = (location) => {
      setCurrentMyLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      setLocationLoading(false);
    };

    const error = () => {
      // 사용자 위치를 받아올 수 없으면 기본 위치로 숭실대학교 표시
      setCurrentMyLocation({ lat: 37.4963538, lng: 126.9572222 });
      setLocationLoading(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  useEffect(() => {
    getCurPosition();
  }, []);

  return { currentMyLocation, locationLoading, getCurPosition };
};

export default useGeoloaction;