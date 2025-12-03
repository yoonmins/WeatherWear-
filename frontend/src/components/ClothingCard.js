import React, { useMemo } from 'react';
import styled from 'styled-components';
import { colors, borderRadius, shadows, transitions, spacing, typography } from '../styles/theme';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${spacing.md};
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Card = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.xl};
  box-shadow: ${shadows.large};
  max-width: 960px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const CardHeader = styled.div`
  padding: ${spacing.lg};
  border-bottom: 1px solid ${colors.gray200};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CityInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

const CityName = styled.h2`
  font-size: ${typography.h2.fontSize};
  font-weight: ${typography.h2.fontWeight};
  line-height: ${typography.h2.lineHeight};
  color: ${colors.gray900};
`;

const Temperature = styled.div`
  font-size: ${typography.h1.fontSize};
  font-weight: ${typography.h1.fontWeight};
  color: ${colors.primary};
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color ${transitions.fast};

  &:hover {
    background-color: ${colors.gray100};
  }

  &:active {
    background-color: ${colors.gray200};
  }
`;

const CardBody = styled.div`
  padding: ${spacing.lg};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: ${spacing.lg};
  align-items: flex-start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const WeatherInfo = styled.div`
  display: flex;
  gap: ${spacing.md};
  padding: ${spacing.md};
  background-color: ${colors.gray50};
  border-radius: ${borderRadius.lg};
  margin-bottom: ${spacing.lg};
`;

const WeatherItem = styled.div`
  flex: 1;
  text-align: center;
`;

const WeatherLabel = styled.div`
  font-size: ${typography.caption.fontSize};
  color: ${colors.gray600};
  margin-bottom: ${spacing.xs};
`;

const WeatherValue = styled.div`
  font-size: ${typography.label1.fontSize};
  font-weight: ${typography.label1.fontWeight};
  color: ${colors.gray900};
`;

const Section = styled.div`
  margin-bottom: ${spacing.lg};
`;

const SectionTitle = styled.h3`
  font-size: ${typography.h3.fontSize};
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.gray900};
  margin-bottom: ${spacing.md};
`;

const ClothingImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
`;

const ClothingImageCard = styled.div`
  background: ${colors.gray50};
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  transition: all ${transitions.normal};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.medium};
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const RecommendationBox = styled.div`
  background: linear-gradient(135deg, ${colors.primary}15 0%, ${colors.primary}05 100%);
  border-radius: ${borderRadius.lg};
  padding: ${spacing.lg};
  border: 1px solid ${colors.primary}30;
`;

const Category = styled.div`
  display: inline-block;
  background: ${colors.primary};
  color: ${colors.white};
  padding: ${spacing.xs} ${spacing.md};
  border-radius: ${borderRadius.round};
  font-size: ${typography.label2.fontSize};
  font-weight: ${typography.label2.fontWeight};
  margin-bottom: ${spacing.md};
`;

const Advice = styled.p`
  font-size: ${typography.body1.fontSize};
  line-height: ${typography.body1.lineHeight};
  color: ${colors.gray700};
  margin-bottom: ${spacing.md};
`;

const RecommendationList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`;

const RecommendationItem = styled.span`
  background: ${colors.white};
  color: ${colors.gray800};
  padding: ${spacing.xs} ${spacing.md};
  border-radius: ${borderRadius.round};
  font-size: ${typography.body2.fontSize};
  border: 1px solid ${colors.gray200};
`;

const InlineWeekly = styled.div`
  background: ${colors.gray50};
  border-radius: ${borderRadius.lg};
  padding: ${spacing.lg};
  border: 1px solid ${colors.gray200};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

const InlineWeeklyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InlineWeeklyTitle = styled.h4`
  font-size: ${typography.h3.fontSize};
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.gray900};
`;

const InlineWeekList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

const InlineWeekItem = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: ${spacing.sm};
  padding: ${spacing.sm};
  border-radius: ${borderRadius.md};
  background: ${colors.white};
  border: 1px solid ${colors.gray200};
`;

const InlineWeekDate = styled.div`
  font-size: ${typography.label1.fontSize};
  font-weight: ${typography.label1.fontWeight};
  color: ${colors.gray900};
`;

const InlineWeekDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

const InlineWeekTemp = styled.div`
  font-size: ${typography.body2.fontSize};
  color: ${colors.gray700};
`;

const InlineMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  flex-wrap: wrap;
`;

const InlineBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${colors.gray100};
  color: ${colors.gray700};
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${borderRadius.round};
  font-size: ${typography.caption.fontSize};
`;

const InlineCategory = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.xs};
  background: ${colors.primary};
  color: ${colors.white};
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${borderRadius.round};
  font-size: ${typography.caption.fontSize};
  font-weight: ${typography.label2.fontWeight};
`;

const ClothingCard = ({ cityData, onClose, weeklyPlan }) => {
  const { displayName, temperature, weather, clothingRecommendation, details } = cityData || {};
  const apiUrl = process.env.REACT_APP_API_URL || '/api';

  const shuffledImages = useMemo(() => {
    const images = clothingRecommendation?.images || [];
    return images.length ? [...images].sort(() => Math.random() - 0.5) : [];
  }, [clothingRecommendation]);

  const shuffledRecommendations = useMemo(() => {
    const items = clothingRecommendation?.recommendation || [];
    return items.length ? [...items].sort(() => Math.random() - 0.5) : [];
  }, [clothingRecommendation]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!cityData) return null;

  const formatDateLabel = (dateString) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('ko-KR', {
      weekday: 'short',
      month: 'numeric',
      day: 'numeric'
    });
  };

  return (
    <Modal onClick={handleBackdropClick}>
      <Card>
        <CardHeader>
          <CityInfo>
            <CityName>{displayName}</CityName>
            {weather && (
              <div style={{ fontSize: typography.body2.fontSize, color: colors.gray600 }}>
                {weather.description}
              </div>
            )}
          </CityInfo>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
            <Temperature>{temperature?.current}°C</Temperature>
            <CloseButton onClick={onClose}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke={colors.gray700}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </CloseButton>
          </div>
        </CardHeader>

        <CardBody>
          {weeklyPlan ? (
            <ContentGrid>
              <div>
                <WeatherInfo>
                  <WeatherItem>
                    <WeatherLabel>체감온도</WeatherLabel>
                    <WeatherValue>{temperature?.feelsLike}°C</WeatherValue>
                  </WeatherItem>
                  <WeatherItem>
                    <WeatherLabel>습도</WeatherLabel>
                    <WeatherValue>{details?.humidity}%</WeatherValue>
                  </WeatherItem>
                  <WeatherItem>
                    <WeatherLabel>풍속</WeatherLabel>
                    <WeatherValue>{details?.windSpeed}m/s</WeatherValue>
                  </WeatherItem>
                </WeatherInfo>

                {shuffledImages.length > 0 && (
                  <Section>
                    <SectionTitle>추천 옷차림</SectionTitle>
                    <ClothingImagesGrid>
                      {shuffledImages.map((image, index) => (
                        <ClothingImageCard key={`${image.filename}-${index}`}>
                          <img
                            src={`${apiUrl.replace('/api', '')}/api/images/${image.filename}`}
                            alt={`${temperature?.current}도 옷차림`}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </ClothingImageCard>
                      ))}
                    </ClothingImagesGrid>
                  </Section>
                )}

                {clothingRecommendation && (
                  <RecommendationBox>
                    <Category>{clothingRecommendation.category}</Category>
                    <Advice>{clothingRecommendation.advice}</Advice>
                    {clothingRecommendation.recommendation && (
                      <RecommendationList>
                        {shuffledRecommendations.map((item, index) => (
                          <RecommendationItem key={`${item}-${index}`}>{item}</RecommendationItem>
                        ))}
                      </RecommendationList>
                    )}
                  </RecommendationBox>
                )}
              </div>

              <InlineWeekly>
                <InlineWeeklyHeader>
                  <InlineWeeklyTitle>일주일 옷 추천</InlineWeeklyTitle>
                  <InlineBadge>🗓️ 7일</InlineBadge>
                </InlineWeeklyHeader>
                <InlineWeekList>
                  {weeklyPlan.days?.slice(0, 7).map((day, idx) => (
                    <InlineWeekItem key={day.date || idx}>
                      <InlineWeekDate>{formatDateLabel(day.date)}</InlineWeekDate>
                      <InlineWeekDetail>
                        <InlineMetaRow>
                          <InlineCategory>{day.clothingRecommendation?.category || '추천'}</InlineCategory>
                          {typeof day.pop === 'number' && <InlineBadge>💧 {day.pop}%</InlineBadge>}
                          {day.details?.windSpeed !== undefined && <InlineBadge>🌬️ {day.details.windSpeed}m/s</InlineBadge>}
                        </InlineMetaRow>
                        <InlineWeekTemp>
                          최고 {day.temperature?.max ?? '-'}° · 최저 {day.temperature?.min ?? '-'}° · 평균 {day.averageTemperature ?? '-'}°
                        </InlineWeekTemp>
                        <InlineWeekTemp>
                          {day.clothingRecommendation?.recommendation?.slice(0, 2).join(' · ') || '아이템 준비 중'}
                        </InlineWeekTemp>
                      </InlineWeekDetail>
                    </InlineWeekItem>
                  ))}
                </InlineWeekList>
              </InlineWeekly>
            </ContentGrid>
          ) : (
            <>
              <WeatherInfo>
                <WeatherItem>
                  <WeatherLabel>체감온도</WeatherLabel>
                  <WeatherValue>{temperature?.feelsLike}°C</WeatherValue>
                </WeatherItem>
                <WeatherItem>
                  <WeatherLabel>습도</WeatherLabel>
                  <WeatherValue>{details?.humidity}%</WeatherValue>
                </WeatherItem>
                <WeatherItem>
                  <WeatherLabel>풍속</WeatherLabel>
                  <WeatherValue>{details?.windSpeed}m/s</WeatherValue>
                </WeatherItem>
              </WeatherInfo>

              {shuffledImages.length > 0 && (
                <Section>
                  <SectionTitle>추천 옷차림</SectionTitle>
                  <ClothingImagesGrid>
                    {shuffledImages.map((image, index) => (
                      <ClothingImageCard key={`${image.filename}-${index}`}>
                        <img
                          src={`${apiUrl.replace('/api', '')}/api/images/${image.filename}`}
                          alt={`${temperature?.current}도 옷차림`}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </ClothingImageCard>
                    ))}
                  </ClothingImagesGrid>
                </Section>
              )}

              {clothingRecommendation && (
                <RecommendationBox>
                  <Category>{clothingRecommendation.category}</Category>
                  <Advice>{clothingRecommendation.advice}</Advice>
                  {clothingRecommendation.recommendation && (
                    <RecommendationList>
                      {shuffledRecommendations.map((item, index) => (
                        <RecommendationItem key={`${item}-${index}`}>{item}</RecommendationItem>
                      ))}
                    </RecommendationList>
                  )}
                </RecommendationBox>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </Modal>
  );
};

export default ClothingCard;
