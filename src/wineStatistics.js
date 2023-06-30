import React from 'react';
import './WineStatistics.css';
import { wineData } from './data'


function WineStatistics() {
  const calculateFlavanoidsStatistics = () => {
    const classData = {};

    for (const wine of wineData) {
      const { Alcohol, Flavanoids } = wine;
      if (!classData[Alcohol]) {
        classData[Alcohol] = [];
      }
      classData[Alcohol].push(Flavanoids);
    }

    const statistics = {};
    for (const [className, classFlavanoids] of Object.entries(classData)) {
      const mean = classFlavanoids.reduce((sum, val) => sum + val, 0) / classFlavanoids.length;

      const sortedFlavanoids = classFlavanoids.sort((a, b) => a - b);
      const middleIndex = Math.floor(sortedFlavanoids.length / 2);
      const median =
        sortedFlavanoids.length % 2 === 0
          ? (sortedFlavanoids[middleIndex - 1] + sortedFlavanoids[middleIndex]) / 2
          : sortedFlavanoids[middleIndex];

      const counts = {};
      let mode = null;
      let maxCount = 0;
      for (const flavanoid of classFlavanoids) {
        if (counts[flavanoid]) {
          counts[flavanoid]++;
        } else {
          counts[flavanoid] = 1;
        }
        if (counts[flavanoid] > maxCount) {
          mode = flavanoid;
          maxCount = counts[flavanoid];
        }
      }

      statistics[className] = {
        mean: mean.toFixed(3),
        median: median.toFixed(3),
        mode: mode.toFixed(3),
      };
    }

    return statistics;
  };

  const calculateGammaStatistics = () => {
    const statistics = {};
    for (const wine of wineData) {
      const { Alcohol, Ash, Hue, Magnesium } = wine;
      const gamma = (Ash * Hue) / Magnesium;

      if (!statistics[Alcohol]) {
        statistics[Alcohol] = [];
      }
      statistics[Alcohol].push(gamma);
    }

    for (const [className, classGamma] of Object.entries(statistics)) {
      const mean = classGamma.reduce((sum, val) => sum + val, 0) / classGamma.length;

      const sortedGamma = classGamma.sort((a, b) => a - b);
      const middleIndex = Math.floor(sortedGamma.length / 2);
      const median =
        sortedGamma.length % 2 === 0
          ? (sortedGamma[middleIndex - 1] + sortedGamma[middleIndex]) / 2
          : sortedGamma[middleIndex];

      const counts = {};
      let mode = null;
      let maxCount = 0;
      for (const gamma of classGamma) {
        if (counts[gamma]) {
          counts[gamma]++;
        } else {
          counts[gamma] = 1;
        }
        if (counts[gamma] > maxCount) {
          mode = gamma;
          maxCount = counts[gamma];
        }
      }

      statistics[className] = {
        mean: mean.toFixed(3),
        median: median.toFixed(3),
        mode: mode.toFixed(3),
      };
    }

    return statistics;
  };

  const flavanoidsStatistics = calculateFlavanoidsStatistics();
  const gammaStatistics = calculateGammaStatistics();

  return (
    <div>
      <h2>Flavanoids Statistics</h2>
      <table className="statistics-table">
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(flavanoidsStatistics).map((className) => (
              <th key={className}>{className}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Flavanoids Mean</td>
            {Object.values(flavanoidsStatistics).map((statistics, index) => (
              <td key={index}>{statistics.mean}</td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Median</td>
            {Object.values(flavanoidsStatistics).map((statistics, index) => (
              <td key={index}>{statistics.median}</td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Mode</td>
            {Object.values(flavanoidsStatistics).map((statistics, index) => (
              <td key={index}>{statistics.mode}</td>
            ))}
          </tr>
        </tbody>
      </table>

      <h2>Gamma Statistics</h2>
      <table className="statistics-table">
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(gammaStatistics).map((className) => (
              <th key={className}>{className}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gamma Mean</td>
            {Object.values(gammaStatistics).map((statistics, index) => (
              <td key={index}>{statistics.mean}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Median</td>
            {Object.values(gammaStatistics).map((statistics, index) => (
              <td key={index}>{statistics.median}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Mode</td>
            {Object.values(gammaStatistics).map((statistics, index) => (
              <td key={index}>{statistics.mode}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WineStatistics;
