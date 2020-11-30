import React, { lazy, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';

const FacebookOverview = lazy(() => import('./overview/index/FacebookOverview'));
const TwitterOverview = lazy(() => import('./overview/index/TwitterOverview'));
const SocialTrafficMetrics = lazy(() => import('./overview/index/SocialTrafficMetrics'));

const Dashboard = () => {
  return (
    <>
      <PageHeader ghost title="Tweet Overview Dashboard" />
      <Main>
        <Row justify="center" gutter={25}>
          {/* <Col xxl={8} lg={24} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <SocialMediaOverview />
            </Suspense>
          </Col> */}

          <Col xxl={24} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <FacebookOverview />
            </Suspense>
          </Col>

          {/* <Col xxl={8} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <YoutubeSubscribers />
            </Suspense>
          </Col> */}

          <Col xxl={8} md={8} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <TwitterOverview />
            </Suspense>
          </Col>

          <Col xxl={16} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <SocialTrafficMetrics />
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Dashboard;
