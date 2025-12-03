import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GlobalStyle from './styles/GlobalStyle';
import { colors, spacing, typography, borderRadius, shadows } from './styles/theme';
import KoreaMap from './components/KoreaMap';
import ClothingCard from './components/ClothingCard';

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${colors.background};
  overflow: hidden;
`;

const Header = styled.header`
  background: ${colors.white};
  box-shadow: ${shadows.small};
  padding: ${spacing.lg} ${spacing.xl};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-size: ${typography.h2.fontSize};
  font-weight: ${typography.h2.fontWeight};
  color: ${colors.primary};
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const RefreshButton = styled.button`
  background: ${colors.primary};
  color: ${colors.white};
  padding: ${spacing.sm} ${spacing.lg};
  border-radius: ${borderRadius.round};
  font-size: ${typography.label2.fontSize};
  font-weight: ${typography.label2.fontWeight};
  transition: all 0.2s;

  &:hover {
    background: ${colors.primaryHover};
    transform: translateY(-1px);
  }

  &:active {
    background: ${colors.primaryPressed};
    transform: translateY(0);
  }

  &:disabled {
    background: ${colors.gray300};
    cursor: not-allowed;
    transform: none;
  }
`;

const Main = styled.main`
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: ${spacing.lg} ${spacing.xl};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  min-height: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: ${spacing.xl};
  align-items: stretch;
  flex: 1;
  min-height: 0;
  flex-wrap: nowrap;
`;

const LeftSidebar = styled.aside`
  width: 220px;
  flex-shrink: 0;
  position: sticky;
  top: ${spacing.lg};
  max-height: calc(100vh - 140px);
  overflow: auto;
`;

const MapSection = styled.div`
  flex: 1;
  min-width: 520px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 0;
`;

const RightSidebar = styled.aside`
  width: 360px;
  flex-shrink: 0;
  position: sticky;
  top: ${spacing.lg};
  max-height: calc(100vh - 140px);
  overflow: auto;
`;

const WeeklyPanel = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.xl};
  box-shadow: ${shadows.medium};
  padding: ${spacing.lg};
`;

const WeeklyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${spacing.md};
`;

const WeeklyTitle = styled.h3`
  font-size: ${typography.h3.fontSize};
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.gray900};
`;

const WeeklyCaption = styled.p`
  font-size: ${typography.body2.fontSize};
  color: ${colors.gray600};
  margin-top: ${spacing.xs};
`;

const CalendarBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.xs};
  background: ${colors.primary}15;
  color: ${colors.primary};
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${borderRadius.round};
  font-size: ${typography.body2.fontSize};
  font-weight: ${typography.label2.fontWeight};
`;

const WeeklyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-top: ${spacing.md};
`;

const WeekItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  padding: ${spacing.lg};
  border: 1px solid ${colors.gray200};
  border-radius: ${borderRadius.lg};
  background: linear-gradient(135deg, ${colors.gray50} 0%, ${colors.white} 100%);
`;

const WeekRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${spacing.md};
  align-items: flex-start;
  flex-wrap: wrap;
`;

const WeekDay = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  align-items: flex-start;
  min-width: 120px;
`;

const DayText = styled.div`
  font-size: ${typography.label1.fontSize};
  font-weight: ${typography.label1.fontWeight};
  color: ${colors.gray900};
`;

const WeatherText = styled.div`
  font-size: ${typography.body2.fontSize};
  color: ${colors.gray600};
`;

const TempStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  align-items: flex-start;
  min-width: 100px;
`;

const TempInline = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${spacing.md};
  align-items: baseline;
  flex-wrap: wrap;
`;

const TempMax = styled.div`
  font-size: ${typography.h3.fontSize};
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.primary};
`;

const TempMin = styled.div`
  font-size: ${typography.body2.fontSize};
  color: ${colors.gray700};
`;

const RecStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  align-items: flex-start;
`;

const RecHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm};
  flex-wrap: wrap;
`;

const RecCategory = styled.span`
  align-self: flex-start;
  background: ${colors.primary};
  color: ${colors.white};
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${borderRadius.round};
  font-size: ${typography.caption.fontSize};
  font-weight: ${typography.label2.fontWeight};
`;

const RecItems = styled.div`
  font-size: ${typography.body2.fontSize};
  color: ${colors.gray800};
  line-height: ${typography.body2.lineHeight};
  word-break: keep-all;
`;

const RecMeta = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${spacing.xs};
  align-items: center;
`;

const MetaBadge = styled.span`
  background: ${colors.gray100};
  color: ${colors.gray700};
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${borderRadius.round};
  font-size: ${typography.caption.fontSize};
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const WeeklyPlaceholder = styled.div`
  margin-top: ${spacing.md};
  padding: ${spacing.lg};
  border: 1px dashed ${colors.gray200};
  border-radius: ${borderRadius.lg};
  background: ${colors.gray50};
  text-align: center;
  color: ${colors.gray600};
  font-size: ${typography.body2.fontSize};
`;

const WeeklyError = styled.div`
  margin-top: ${spacing.md};
  padding: ${spacing.md};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors.error}30;
  background: ${colors.error}10;
  color: ${colors.error};
  font-size: ${typography.body2.fontSize};
`;

const Title = styled.h2`
  font-size: ${typography.h1.fontSize};
  font-weight: ${typography.h1.fontWeight};
  color: ${colors.gray900};
  text-align: left;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: ${typography.body1.fontSize};
  color: ${colors.gray600};
  text-align: left;
  margin: 0;
`;

const InfoPanel = styled.div`
  margin-bottom: ${spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

const LegendBox = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.lg};
  padding: ${spacing.lg};
  box-shadow: ${shadows.medium};
`;

const LegendTitle = styled.h3`
  font-size: ${typography.h3.fontSize};
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.gray900};
  margin-bottom: ${spacing.md};
  text-align: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  margin-bottom: ${spacing.sm};
`;

const ColorCircle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.color};
  flex-shrink: 0;
`;

const LegendText = styled.span`
  font-size: ${typography.body2.fontSize};
  color: ${colors.gray700};
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: ${spacing.md};
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${colors.gray200};
  border-top-color: ${colors.primary};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-size: ${typography.body1.fontSize};
  color: ${colors.gray600};
`;

const ErrorContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: ${spacing.xl};
  background: ${colors.error}10;
  border: 1px solid ${colors.error}30;
  border-radius: ${borderRadius.lg};
  text-align: center;
`;

const ErrorText = styled.p`
  font-size: ${typography.body1.fontSize};
  color: ${colors.error};
  margin-bottom: ${spacing.md};
`;

function App() {
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weeklyPlan, setWeeklyPlan] = useState(null);
  const [weeklyLoading, setWeeklyLoading] = useState(false);
  const [weeklyError, setWeeklyError] = useState(null);
  const [userCoords, setUserCoords] = useState(null);
  const [geoError, setGeoError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || '/api';

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/weather/korea`);
      if (response.data.success) {
        setCitiesWeather(response.data.data);
      }
    } catch (err) {
      setError('날씨 정보를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 현재 위치 가져오기
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setGeoError('브라우저에서 위치 정보를 지원하지 않습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        });
        setGeoError(null);
      },
      () => {
        setGeoError('현재 위치를 가져오지 못했습니다. 위치 접근을 허용해주세요.');
      }
    );
  }, []);

  useEffect(() => {
    const fetchWeeklyPlan = async () => {
      // 우선순위: 선택한 도시 > 현재 위치
      const hasSelectedCity = Boolean(selectedCity);
      const hasCoords = Boolean(userCoords);

      if (!hasSelectedCity && !hasCoords) {
        setWeeklyPlan(null);
        return;
      }

      try {
        setWeeklyLoading(true);
        setWeeklyError(null);
        setWeeklyPlan(null);
        let response = null;

        if (hasSelectedCity) {
          const cityQuery = selectedCity.cityName || selectedCity.location?.name || selectedCity.displayName;
          if (!cityQuery) {
            setWeeklyError('도시 정보를 확인할 수 없습니다.');
            setWeeklyPlan(null);
            setWeeklyLoading(false);
            return;
          }
          response = await axios.get(`${API_URL}/weather/weekly/${cityQuery}`);
        } else if (hasCoords) {
          response = await axios.get(`${API_URL}/weather/weekly/coords`, {
            params: {
              lat: userCoords.lat,
              lon: userCoords.lon
            }
          });
        }

        if (response?.data?.success) {
          setWeeklyPlan(response.data.data);
        } else {
          setWeeklyPlan(null);
          setWeeklyError(response?.data?.error || '주간 옷차림 정보를 불러오는 중 문제가 발생했습니다.');
        }
      } catch (err) {
        setWeeklyPlan(null);
        setWeeklyError('주간 옷차림 정보를 불러오는 중 문제가 발생했습니다.');
        console.error('Error fetching weekly plan:', err);
      } finally {
        setWeeklyLoading(false);
      }
    };

    fetchWeeklyPlan();
  }, [API_URL, selectedCity, userCoords]);

  const formatDateLabel = (dateString) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('ko-KR', {
      weekday: 'short',
      month: 'numeric',
      day: 'numeric'
    });
  };

  const summarizeItems = (items = []) => {
    if (!items.length) return '';
    return items.slice(0, 3).join(' · ');
  };

  const handleCityClick = (cityData) => {
    setSelectedCity(cityData);
  };

  const handleCloseCard = () => {
    setSelectedCity(null);
  };

  const showGeoError = !selectedCity && geoError;
  const weeklyMessage = !weeklyPlan && !weeklyLoading && !(weeklyError || showGeoError)
    ? (selectedCity
      ? '선택한 도시의 주간 데이터를 불러오는 중입니다.'
      : '현재 위치를 확인 중입니다. 위치 접근을 허용해주세요.')
    : null;

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <HeaderContent>
            <Logo>
              <span>🌤️</span>
              WeatherWear
            </Logo>
            <RefreshButton onClick={fetchWeatherData} disabled={loading}>
              {loading ? '새로고침 중...' : '새로고침'}
            </RefreshButton>
          </HeaderContent>
        </Header>

        <Main>
          {loading && (
            <LoadingContainer>
              <LoadingSpinner />
              <LoadingText>날씨 정보를 불러오는 중...</LoadingText>
            </LoadingContainer>
          )}

          {error && (
            <ErrorContainer>
              <ErrorText>{error}</ErrorText>
              <RefreshButton onClick={fetchWeatherData}>
                다시 시도
              </RefreshButton>
            </ErrorContainer>
          )}

          {!loading && !error && (
            <ContentWrapper>
              <LeftSidebar>
                <InfoPanel>
                  <Title>오늘 뭐 입지?</Title>
                  <Subtitle>지역을 선택하면 오늘 옷차림과 일주일 계획을 한눈에 볼 수 있어요</Subtitle>
                </InfoPanel>

                <LegendBox>
                  <LegendTitle>온도 범위</LegendTitle>
                  <LegendItem>
                    <ColorCircle color="#FF4757" />
                    <LegendText>28°C 이상</LegendText>
                  </LegendItem>
                  <LegendItem>
                    <ColorCircle color="#FF6348" />
                    <LegendText>23 ~ 27°C</LegendText>
                  </LegendItem>
                  <LegendItem>
                    <ColorCircle color="#FFA502" />
                    <LegendText>20 ~ 22°C</LegendText>
                  </LegendItem>
                  <LegendItem>
                    <ColorCircle color="#26DE81" />
                    <LegendText>17 ~ 19°C</LegendText>
                  </LegendItem>
                  <LegendItem>
                    <ColorCircle color="#20BFFF" />
                    <LegendText>12 ~ 16°C</LegendText>
                  </LegendItem>
                  <LegendItem>
                    <ColorCircle color="#5F27CD" />
                    <LegendText>5 ~ 11°C</LegendText>
                  </LegendItem>
                  <LegendItem>
                    <ColorCircle color="#636E72" />
                    <LegendText>4°C 이하</LegendText>
                  </LegendItem>
                </LegendBox>

                <div style={{ marginTop: spacing.lg, padding: spacing.md, background: colors.gray50, borderRadius: borderRadius.md, fontSize: typography.caption.fontSize, color: colors.gray600, textAlign: 'center' }}>
                  💡 지도의 도시를 클릭하여 상세 정보를 확인하세요
                </div>
              </LeftSidebar>

              <MapSection>
                <KoreaMap citiesData={citiesWeather} onCityClick={handleCityClick} />
              </MapSection>

              <RightSidebar>
                <WeeklyPanel>
                  <WeeklyHeader>
                    <div>
                      <WeeklyTitle>일주일 옷 추천</WeeklyTitle>
                      <WeeklyCaption>
                        {weeklyPlan?.displayName
                          ? `${weeklyPlan.displayName} 기준 7일 계획`
                          : '현재 위치 기준으로 자동 추천돼요'}
                      </WeeklyCaption>
                    </div>
                    <CalendarBadge>🗓️ 7일</CalendarBadge>
                  </WeeklyHeader>

                  {weeklyLoading && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, padding: `${spacing.md} 0` }}>
                      <LoadingSpinner style={{ width: 32, height: 32, borderWidth: 3 }} />
                      <LoadingText style={{ margin: 0 }}>불러오는 중...</LoadingText>
                    </div>
                  )}

                  {(weeklyError || showGeoError) && (
                    <WeeklyError>{weeklyError || showGeoError}</WeeklyError>
                  )}

                  {weeklyMessage && (
                    <WeeklyPlaceholder>{weeklyMessage}</WeeklyPlaceholder>
                  )}

                  {!weeklyLoading && !(weeklyError || showGeoError) && weeklyPlan && (
                    <WeeklyList>
                      {weeklyPlan.days?.map((day, index) => (
                        <WeekItem key={day.date || index}>
                          <WeekRow>
                            <WeekDay>
                              <DayText>{formatDateLabel(day.date)}</DayText>
                              <WeatherText>{day.weather?.description || '날씨 정보 없음'}</WeatherText>
                            </WeekDay>
                            <TempStack>
                              <TempMax>{day.temperature?.max ?? '-'}°</TempMax>
                              <TempInline>
                                <TempMin>최저 {day.temperature?.min ?? '-'}°</TempMin>
                                <TempMin>평균 {day.averageTemperature ?? '-'}°</TempMin>
                              </TempInline>
                            </TempStack>
                            <RecStack>
                              <RecHeader>
                                <RecCategory>{day.clothingRecommendation?.category || '추천 준비 중'}</RecCategory>
                                <RecMeta>
                                  {typeof day.pop === 'number' && (
                                    <MetaBadge>💧 {day.pop}%</MetaBadge>
                                  )}
                                  {day.details?.windSpeed !== undefined && (
                                    <MetaBadge>🌬️ {day.details.windSpeed}m/s</MetaBadge>
                                  )}
                                </RecMeta>
                              </RecHeader>
                              <RecItems>
                                {summarizeItems(day.clothingRecommendation?.recommendation) || '추천 아이템을 불러오는 중'}
                              </RecItems>
                            </RecStack>
                          </WeekRow>
                        </WeekItem>
                      ))}
                    </WeeklyList>
                  )}
                </WeeklyPanel>
              </RightSidebar>
            </ContentWrapper>
          )}
        </Main>

        {selectedCity && (
          <ClothingCard cityData={selectedCity} weeklyPlan={weeklyPlan} onClose={handleCloseCard} />
        )}
      </AppContainer>
    </>
  );
}

export default App;
