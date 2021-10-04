import React, { useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { BannerData } from "./BannerData";

const useStyles = makeStyles(({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F9FAF9',
  },
  banner: {
    maxWidth: '1040px',
    maxHeight: '304px',
  },
  arrowLeft: {
    position: "absolute",
    left: '300px',
    width: '24px',
    height: '24px',
    cursor: 'pointer',

  },
  arrowRight: {
    position: "absolute",
    right: '300px',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
  activeSlide: {
    opacity: '1',
    transitionDuration: '1s',
    transform: 'scale(1.08)',
  },
  notActiveSlide: {
    opacity: '0',
    transitionDuration: '1s ease',
  },
}));

function Banner ({ bannerdata }) {
  const classes = useStyles();
  const [curr, setCurr] = useState(0);
  const len = bannerdata.length;

  const nextSlide = () => {
    setCurr(curr === len- 1 ? 0 : curr + 1);
  }

  const prevSlide = () => {
    setCurr(curr === 0 ? len - 1 : curr - 1);
  }

  if (!Array.isArray(bannerdata) || bannerdata.length <= 0) {
    return null;
  }
  

  return (
    <div className={classes.root}>
      <ArrowBackIosIcon className={classes.arrowLeft} onClick={prevSlide} />
      <ArrowForwardIosIcon className={classes.arrowRight} onClick={nextSlide} />
      {BannerData.map((slide, index) => {
        return (
          <div
            className={index === curr ? classes.activeSlide : classes.notActiveSlide}
            key={index}
          >
            {index === curr && (
              <img src={slide.image} alt='promo' className={classes.banner} />
            )}
          </div>
        )
      })}
    </div>
  )
}

Banner.propTypes = {
  bannerdata: PropTypes.Array
}

export default Banner;