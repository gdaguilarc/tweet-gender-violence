import React from 'react';
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { Dropdown } from '../../../components/dropdown/dropdown';
import { Button } from '../../../components/buttons/buttons';

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

const BannerCard = ({ item }) => {
  const tweet = {
    id: 1,
    type: 'dark',
    icon: 'layers.svg',
    bgImage: '',
    title: 'Potential Violent Tweet ',
    // TODO: Tweet From DB
    content: 'Odio que no nos den el mismo trato por cuestiones de género .....',
    authorName: 'Anonymous',
    authorImg: '10.png',
  };

  const { content, icon, title, authorName, authorImg, type, bgImage } = tweet;
  return (
    <CardWrapper>
      <ImageUrl className={`banner-card banner-card-${type}`} bgUrl={bgImage}>
        <div className="banner-card__top align-center-v justify-content-between">
          <h4 className="banner-card__title">
            <img src={require(`../../../static/img/icon/${icon}`)} alt="StrikingDash Banner" />
            <span>{title}</span>
          </h4>
          {/* <div className="banner-card__action">
            <div className="more">
              <Dropdown
                action={['click']}
                className="wide-dropdwon"
                content={
                  <>
                    <Link to="#">Edit</Link>
                    <Link to="#">Delete</Link>
                    <Link to="#">View</Link>
                  </>
                }
              >
                <Link to="#">
                  <FeatherIcon icon="more-horizontal" />
                </Link>
              </Dropdown>
            </div>
          </div> */}
        </div>
        <div className="banner-card__body">
          <p>{content}</p>
          <ButtonGroup>
            <Button type="success" raised>
              AMIGABLE
            </Button>
            <Button type="warning" raised>
              NO ESTOY SEGURO
            </Button>
            <Button type="danger" raised>
              VIOLENTO
            </Button>
          </ButtonGroup>
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

BannerCard.propTypes = {
  item: propTypes.object,
};

BannerCard.defaultProps = {
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

export default BannerCard;
