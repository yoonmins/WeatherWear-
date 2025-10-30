const express = require('express');
const router = express.Router();
const { weatherService } = require('../services');

/**
 * @route   GET /api/weather/city/:city
 * @desc    도시 이름으로 현재 날씨 가져오기
 * @access  Public
 */
router.get('/city/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const weatherData = await weatherService.getCurrentWeatherByCity(city);

    // 온도에 따른 옷차림 추천 추가
    const clothingRecommendation = weatherService.getClothingRecommendation(
      weatherData.temperature.current
    );

    res.json({
      success: true,
      data: {
        ...weatherData,
        clothingRecommendation
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route   GET /api/weather/coords
 * @desc    위도/경도로 현재 날씨 가져오기
 * @access  Public
 * @query   lat, lon
 */
router.get('/coords', async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        error: '위도(lat)와 경도(lon)를 모두 입력해주세요.'
      });
    }

    const weatherData = await weatherService.getCurrentWeatherByCoords(
      parseFloat(lat),
      parseFloat(lon)
    );

    // 온도에 따른 옷차림 추천 추가
    const clothingRecommendation = weatherService.getClothingRecommendation(
      weatherData.temperature.current
    );

    res.json({
      success: true,
      data: {
        ...weatherData,
        clothingRecommendation
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route   GET /api/weather/forecast/:city
 * @desc    5일 날씨 예보 가져오기
 * @access  Public
 */
router.get('/forecast/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const forecastData = await weatherService.getForecastByCity(city);

    res.json({
      success: true,
      data: forecastData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route   GET /api/weather/recommendation
 * @desc    온도에 따른 옷차림 추천만 가져오기
 * @access  Public
 * @query   temperature
 */
router.get('/recommendation', (req, res) => {
  try {
    const { temperature } = req.query;

    if (!temperature) {
      return res.status(400).json({
        success: false,
        error: '온도(temperature)를 입력해주세요.'
      });
    }

    const recommendation = weatherService.getClothingRecommendation(
      parseFloat(temperature)
    );

    res.json({
      success: true,
      data: recommendation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
