import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import Spin from '../../ui-elements/Spin';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { Dropdown } from '../../../components/dropdown/dropdown';
import { Button } from '../../../components/buttons/buttons';
import { Input } from 'antd';
import { unclassifiedTweet, classifyTweet } from '../../../redux/twitter/actionCreator';
import Form from 'antd/lib/form/Form';
import axios from 'axios';

const CardWrapper = styled.figure` 
    margin-bottom: 0;
    .banner-card{
      padding: 20px 25px 25px 25px;
      border-radius: 10px;
      &.banner-card-primary{
          background-color: ${({ theme }) => theme['primary-color']};
      }
      &.banner-card-dark{
          background-color: ${({ theme }) => theme['dark-color']};
      }
      &.banner-card-border{
          border: 1px solid ${({ theme }) => theme['border-color-light']};
          .banner-card__title{
              color: ${({ theme }) => theme['dark-color']} !important;
          }
          .banner-card__body{
              .p{
                  font-size: 16px; 
                  color: ${({ theme }) => theme['gray-color']};
              }
          }
          .banner-card__bottom{
            .author-name{
                color: ${({ theme }) => theme['gray-color']};
            }
            .card-meta{
                li{
                    span{
                        color: ${({ theme }) => theme['extra-light-color']};
                    }
                }
            }
          }
      }
      .banner-card__top {
          .banner-card__title{
              font-size: 16px;
              font-weight: 500;
              display: flex;
              align-items: center;
              color: #fff;
              margin-bottom: 14px;
              img,
              svg,
              i{
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
              }
            }
            .banner-card__action{
                .ant-dropdown-trigger{
                    svg,
                    i{
                        color: ${({ theme }) => theme['extra-light-color']};
                    }
                }
            }
        }
      }
      .banner-card__body{
        p{
            font-size: 22px;
            margin-bottom: 2px;
            margin-top: 5px;
            line-height: 1.786;
            color: #ffffff90;
        }
      }
      .banner-card__bottom {
        .card-author{
            img{
                max-width: 30px;
                border-radius: 50%;
            }
            .author-name{
                ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 15px;
                font-weight: 500;
                color: #ffffff90;
            }
        }
        .input-text{
            background-color: #000000
        }
        .card-meta{
            ul{
                display: flex;
                align-items: center;
                li{
                    display: flex;
                    align-items: center;
                    &:not(:last-child){
                        margin-right: 10px;
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
                    }
                    svg,
                    img{
                        color: ${({ theme }) => theme['extra-light-color']};
                        margin-right: 6px;
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 6px;
                        width: 16px;
                    }
                    span{
                        font-size: 13px;
                        color: #fff;
                    }
                }
            }
        }
      }
  }
`;

const ImageUrl = styled.div`
  ${({ bgUrl }) => bgUrl && `background-image: url(${require(`../../../static/img/sampleCards/${bgUrl}`)})`};
  background-size: cover;
  background-reapet: no-reapet;
  background-position: center center;
`;

const ButtonGroup = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: -4px -4px -15px;
  p {
    font-size: 13px;
    margin: ${({ theme }) => (theme.rtl ? '0 0 0 20px' : '0 20px 0 0')};
    font-weight: 500;
    color: ${({ theme }) => theme['gray-color']};
  }
  button {
    font-size: 12px;
    margin: 4px;
    height: 50px;
    padding: 0px 13.26px;
  }
`;

const TweetCard = () => {
  const [tweet, setTweet] = useState('');
  const [response, setResponse] = useState('');
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const handleSubmit = async () => {
    console.log(API_ENDPOINT);
    console.log(tweet);
    setResponse('Analyzing...');
    const { data } = await axios.post(`${API_ENDPOINT}/predict`, { tweet });
    console.log(data);
    setResponse(data.result);
  };
  const onChange = e => {
    setTweet(e.target.value);
  };

  const tweetVariables = {
    type: 'dark',
    icon: 'layers.svg',
    title: 'Tweet Analyzer',
  };

  const { icon, title, authorImg, type } = tweetVariables;

  return (
    <CardWrapper>
      <ImageUrl className={`banner-card banner-card-${type}`}>
        <div className="banner-card__top align-center-v justify-content-between">
          <h4 className="banner-card__title">
            <img src={require(`../../../static/img/icon/${icon}`)} alt="StrikingDash Banner" />
            <span>{title}</span>
          </h4>
        </div>
        <div className="banner-card__body">
          <Form>
            <Input className="input-text" rows={2} onChange={onChange} />
            <p>{response}</p>
            <ButtonGroup>
              <Button type="success" raised onClick={() => handleSubmit(0)}>
                ANALIZAR
              </Button>
            </ButtonGroup>
          </Form>
        </div>
      </ImageUrl>
    </CardWrapper>
  );
};

export default TweetCard;
