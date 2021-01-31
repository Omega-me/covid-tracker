import React, { useEffect, useState } from 'react';
import styles from './LineGraph.module.css';
import axios from 'axios';
import numeral from 'numeral';
import useDate from '../../../global/DataLayer';
import { Line } from 'react-chartjs-2';

const options = {
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format('+0,0');
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
          tooltipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType = 'cases') => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

const LineGraph = () => {
  const [{ caseType }] = useDate();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response => {
          return response.json();
        })
        .then(data => {
          let chartData = buildChartData(data, caseType);
          setData(chartData);
        });
    };
    fetchData();
  }, [caseType]);
  return (
    <div className={styles.grapf}>
      <h1>Worldwide new {caseType}</h1>
      <div className={styles.graph__container}>
        {data?.length > 0 && (
          <Line
            data={{
              datasets: [
                {
                  backgroundColor:
                    caseType === 'cases'
                      ? ' rgba(255, 68, 0, 0.514)'
                      : caseType === 'recovered'
                      ? ' rgba(0, 128, 0, 0.541)'
                      : ' rgba(255, 0, 0, 0.521)',
                  borderColor:
                    caseType === 'cases'
                      ? ' orangered'
                      : caseType === 'recovered'
                      ? ' green'
                      : ' red',
                  data: data,
                },
              ],
            }}
            options={options}
          />
        )}
      </div>
    </div>
  );
};

export default LineGraph;
