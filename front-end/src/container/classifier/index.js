import React from 'react';
import { Row, Col } from 'antd';
import { ComingsoonStyleWrapper } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import TweetCard from './tweetCard';

const Classify = () => {
  return (
    <>
      <PageHeader title="Classify Tweets" />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <ComingsoonStyleWrapper>
              <Cards headless>
                <div className="coming-soon-content">
                  <h1>Ayudanos a clasificar tweets</h1>
                  <p> Tu ayuda nos aporta mucho para detectar la violencia de género más facilmente</p>
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

export default Classify;
