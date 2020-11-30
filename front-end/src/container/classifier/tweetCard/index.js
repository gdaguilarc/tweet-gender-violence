import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { Dropdown } from '../../../components/dropdown/dropdown';
import { Button } from '../../../components/buttons/buttons';
import { unclassifiedTweet, classifyTweet } from '../../../redux/twitter/actionCreator';
import Form from 'antd/lib/form/Form';

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
              p{
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
              margin-bottom: 30px;
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

const TweetCard = ({ item }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    tweet: null,
    misoginy: -1,
  });

  const { tweetData, isLoading } = useSelector(state => {
    return {
      tweetData: state.tweet.data,
      isLoading: state.tweet.loading,
    };
  });

  const handleSubmit = vote => {
    dispatch(classifyTweet({ ...state, misoginy: vote }));
    dispatch(unclassifiedTweet());
  };

  useEffect(() => {
    if (unclassifiedTweet) {
      dispatch(unclassifiedTweet());
    }
  }, [dispatch, unclassifiedTweet]);

  useEffect(() => {
    setState({ ...state, tweet: tweetData });
  }, [tweetData]);

  const tweetVariables = {
    id: tweetData?.author_id,
    type: 'dark',
    icon: 'layers.svg',
    bgImage: '',
    title: 'Potential Violent Tweet ',
    // TODO: Tweet From DB
    content: tweetData?.text,
    authorName: tweetData?.author_id,
    authorImg: '10.png',
  };

  const { content, icon, title, authorName, authorImg, type, bgImage } = tweetVariables;

  if (isLoading) {
    return <>LOADINGS</>;
  }

  return (
    <CardWrapper>
      <ImageUrl className={`banner-card banner-card-${type}`} bgUrl={bgImage}>
        <div className="banner-card__top align-center-v justify-content-between">
          <h4 className="banner-card__title">
            <img src={require(`../../../static/img/icon/${icon}`)} alt="StrikingDash Banner" />
            <span>{title}</span>
          </h4>
          <div className="banner-card__action">
            <div className="more">
              <Dropdown
                action={['click']}
                className="wide-dropdwon"
                content={
                  <>
                    <Link
                      to="#"
                      onClick={() => {
                        window.location = tweetData.entities.urls[0].url;
                      }}
                    >
                      View
                    </Link>
                  </>
                }
              >
                <Link to="#">
                  <FeatherIcon icon="more-horizontal" />
                </Link>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="banner-card__body">
          <Form>
            <p>{content}</p>
            <ButtonGroup>
              <Button type="success" raised onClick={() => handleSubmit(0)}>
                AMIGABLE
              </Button>
              <Button type="warning" raised onClick={() => handleSubmit(-1)}>
                NO ESTOY SEGURO
              </Button>
              <Button type="danger" raised onClick={() => handleSubmit(1)}>
                VIOLENTO
              </Button>
            </ButtonGroup>
          </Form>
        </div>
        <div className="banner-card__body"></div>
        <div className="banner-card__bottom  align-center-v justify-content-between">
          <div className="card-author">
            <img src={require(`../../../static/img/users/${authorImg}`)} alt="" />
            <span className="author-name">{authorName}</span>
          </div>
          <div className="card-meta"></div>
        </div>
      </ImageUrl>
    </CardWrapper>
  );
};

TweetCard.propTypes = {
  item: propTypes.object,
};

TweetCard.defaultProps = {
  item: {
    id: 1,
    type: 'primary',
    icon: 'water-fall.svg',
    bgImage: '',
    title: 'Primary Color',
    content:
      'Lorem Ipsum is simply dummy text of the printing printer took a galley of type and scrambled and typesetting industry.',
    authorName: 'Chris Doe',
    authorImg: '10.png',
  },
};

export default TweetCard;
