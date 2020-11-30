import React from 'react';
import { Row, Col } from 'antd';
import { ComingsoonStyleWrapper } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import TweetCard from './tweetCard';

const Predict = () => {
  return (
    <>
      <PageHeader title="Predict Tweet" />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <ComingsoonStyleWrapper>
              <Cards headless>
                <div className="coming-soon-content">
                  <h1>Inserta un Tweet a Analizar</h1>
                </div>
                <TweetCard />
              </Cards>
            </ComingsoonStyleWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Predict;
