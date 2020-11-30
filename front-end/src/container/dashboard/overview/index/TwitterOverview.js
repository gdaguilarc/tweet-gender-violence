import React, { useState, useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LineChartWrapper, ChartContainer } from '../../style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
import { ChartjsLineChart } from '../../../../components/charts/chartjs';
import { twitterOverviewGetData, twitterOverviewFilterData } from '../../../../redux/chartContent/actionCreator';
import { customTooltips } from '../../../../components/utilities/utilities';
import Graph from '../../../../static/img/Graph.jpeg';

const TwitterOverview = () => {
  const dispatch = useDispatch();
  const { twitterOverviewState, twIsLoading } = useSelector(state => {
    return {
      twitterOverviewState: state.chartContent.twitterOverviewData,
      twIsLoading: state.chartContent.twLoading,
    };
  });

  const [state, setState] = useState({
    youtubeSubscribeTabActive: 'year',
    twitterOverviewTabActive: 'month',
    instagramOverviewTabActive: 'month',
    linkdinOverviewTabActive: 'month',
  });

  useEffect(() => {
    if (twitterOverviewGetData) {
      dispatch(twitterOverviewGetData());
    }
  }, [dispatch]);

  const chartOptions = {
    tooltips: {
      yAlign: 'bottom',
      xAlign: 'center',
      mode: 'nearest',
      position: 'nearest',
      intersect: false,
      enabled: false,
      custom: customTooltips,
      callbacks: {
        labelColor(tooltipItem, chart) {
          return {
            backgroundColor: '#20C997',
          };
        },
      },
    },
    hover: {
      mode: 'nearest',
      intersect: false,
    },
    layout: {
      padding: {
        left: '0',
        right: 8,
        top: 15,
        bottom: -10,
      },
    },
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      display: false,
      labels: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0,
      },
    },
    scales: {
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
            color: '#e5e9f2',
            borderDash: [8, 4],
            zeroLineColor: 'transparent',
            beginAtZero: true,
          },
          ticks: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
            color: '#e5e9f2',
            borderDash: [8, 4],
            zeroLineColor: 'transparent',
          },
          ticks: {
            display: false,
          },
        },
      ],
    },
  };

  const handleActiveChangeTwitter = value => {
    setState({
      ...state,
      twitterOverviewTabActive: value,
    });
    return dispatch(twitterOverviewFilterData(value));
  };

  const lineChartPointStyle = {
    borderColor: '#C6D0DC',
    borderWidth: 2,
    fill: false,
    pointRadius: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
    pointBackgroundColor: [
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      '#20C997',
    ],
    pointHoverBackgroundColor: '#20C997',
    pointHoverRadius: 6,
    pointBorderColor: 'transparent',
  };

  return (
    <LineChartWrapper>
      {twitterOverviewState !== null && (
        <Cards title="Twitter Overview" size="large">
          {twIsLoading ? (
            <div className="sd-spin">
              <Spin />
            </div>
          ) : (
            <div className="overview-container">
              <Row justify="center" gutter={25}>
                <img src={require(`../../../../static/img/Graph.jpeg`)}></img>
              </Row>
            </div>
          )}
        </Cards>
      )}
    </LineChartWrapper>
  );
};

export default TwitterOverview;
