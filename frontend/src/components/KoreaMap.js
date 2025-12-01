import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { colors, shadows } from '../styles/theme';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 480px;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 480px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${shadows.large};
  position: relative;
`;

const ErrorOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  background: rgba(255, 255, 255, 0.92);
  color: ${colors.gray800};
  font-size: 14px;
  line-height: 1.5;
  z-index: 2;
  border: 1px dashed ${colors.gray300};
`;

// 한국 주요 도시 위치 (위도, 경도)
const CITY_POSITIONS = {
  Seoul: { lat: 37.5665, lng: 126.9780 },
  Incheon: { lat: 37.4563, lng: 126.7052 },
  Suwon: { lat: 37.2636, lng: 127.0286 },
  Daejeon: { lat: 36.3504, lng: 127.3845 },
  Daegu: { lat: 35.8714, lng: 128.6014 },
  Gwangju: { lat: 35.1595, lng: 126.8526 },
  Ulsan: { lat: 35.5384, lng: 129.3114 },
  Busan: { lat: 35.1796, lng: 129.0756 },
  Jeju: { lat: 33.4996, lng: 126.5312 },
  Chuncheon: { lat: 37.8813, lng: 127.7298 },
  Gangneung: { lat: 37.7519, lng: 128.8761 },
  Sokcho: { lat: 38.207, lng: 128.591 },
  Gyeongju: { lat: 35.8562, lng: 129.2247 },
  Jeonju: { lat: 35.8242, lng: 127.1480 },
  Yeosu: { lat: 34.7604, lng: 127.6622 },
  Cheongju: { lat: 36.6424, lng: 127.4890 },
  Pohang: { lat: 36.019, lng: 129.3435 },
  Andong: { lat: 36.5684, lng: 128.7294 }
};

const getTemperatureColor = (temp) => {
  if (temp >= 28) return '#FF4757';
  if (temp >= 23) return '#FF6348'; // 23~27
  if (temp >= 20) return '#FFA502'; // 20~22
  if (temp >= 17) return '#26DE81'; // 17~19
  if (temp >= 12) return '#20BFFF'; // 12~16
  if (temp >= 5) return '#5F27CD'; // 5~11
  return '#636E72'; // 4 이하
};

const KoreaMap = ({ citiesData = [], onCityClick }) => {
  const mapRef = useRef(null);
  const naverMapRef = useRef(null);
  const markersRef = useRef([]);
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    // 네이버 맵 스크립트 로드
    const clientId = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;

    const loadNaverMapScript = () => {
      return new Promise((resolve, reject) => {
        if (window.naver && window.naver.maps) {
          resolve();
          return;
        }

        if (!clientId) {
          reject(new Error('네이버 지도 Client ID가 설정되지 않았습니다. REACT_APP_NAVER_MAP_CLIENT_ID를 확인하세요.'));
          return;
        }

        const script = document.createElement('script');
        script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('네이버 맵 스크립트 로드 실패'));
        document.head.appendChild(script);
      });
    };

    const initMap = async () => {
      try {
        await loadNaverMapScript();

        if (!window.naver || !window.naver.maps) {
          console.error('네이버 맵 API가 로드되지 않았습니다.');
          setMapError('네이버 지도 API를 불러올 수 없습니다. 클라이언트 ID와 허용 도메인을 확인해주세요.');
          return;
        }

        // 지도 초기화 (한국 중심)
        const map = new window.naver.maps.Map(mapRef.current, {
          center: new window.naver.maps.LatLng(36.5, 127.5),
          zoom: 7,
          minZoom: 6,
          maxZoom: 10,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.TOP_RIGHT
          }
        });

        naverMapRef.current = map;

        // 기존 마커 제거
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // 도시별 마커 생성
        Object.entries(CITY_POSITIONS).forEach(([cityName, position]) => {
          const cityData = citiesData.find(city => city.cityName === cityName);

          if (cityData) {
            const temp = cityData.temperature?.current;
            const displayName = cityData.displayName || cityName;

            // 마커 생성
            const marker = new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(position.lat, position.lng),
              map: map,
              title: displayName,
              icon: {
                content: `
                  <div style="
                    position: relative;
                    text-align: center;
                  ">
                    <div style="
                      background-color: ${temp !== undefined ? getTemperatureColor(temp) : colors.gray400};
                      color: white;
                      padding: 8px 12px;
                      border-radius: 20px;
                      font-weight: 700;
                      font-size: 14px;
                      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                      border: 3px solid white;
                      white-space: nowrap;
                      cursor: pointer;
                      transition: transform 0.2s;
                    " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                      ${displayName} ${temp !== undefined ? temp + '°C' : ''}
                    </div>
                  </div>
                `,
                anchor: new window.naver.maps.Point(50, 25)
              }
            });

            // 마커 클릭 이벤트
            window.naver.maps.Event.addListener(marker, 'click', () => {
              if (onCityClick) {
                onCityClick(cityData);
              }
            });

            markersRef.current.push(marker);
          }
        });

      } catch (error) {
        console.error('지도 초기화 오류:', error);
        setMapError(error.message || '네이버 지도 로드 중 문제가 발생했습니다.');
      }
    };

    initMap();

    return () => {
      // 클린업: 마커 제거
      markersRef.current.forEach(marker => marker.setMap(null));
    };
  }, [citiesData, onCityClick]);

  return (
    <MapContainer>
      <MapWrapper ref={mapRef}>
        {mapError && (
          <ErrorOverlay>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>지도를 불러오지 못했습니다.</div>
              <div>네이버 클라이언트 ID와 허용 도메인(예: http://localhost:3000, http://localhost:3002 등)이 등록되어 있는지 확인하세요.</div>
            </div>
          </ErrorOverlay>
        )}
      </MapWrapper>
    </MapContainer>
  );
};

export default KoreaMap;
