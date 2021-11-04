import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    width: '400px',
    height: '100px',
    borderRadius: '5px',

    margin: '10px 10px 10px 10px',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    gap: '10%',

    backgroundColor: 'white',

    border: '1px solid grey'
  },
  thumbnail: {
    width: '85px',
    height: '85px',

    margin: '5px',

    border: '1px solid black'
  }
})

function OrderDetailCard({ id, quantity }) {
  const classes = useStyles();
  const [detail, setDetail] = useState({});
  const [loadingState, setLoadingState] = useState(true);

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/product/view?product_id=' + id, {
      method: 'GET',
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setDetail(res);
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  }, [])

  return (
    <div className={classes.root}>
      {loadingState
        ? <> </>
        : <>
            <img src={detail.photo} alt='thumbnail' className={classes.thumbnail}/>
            <div>
              <div>{detail.title}</div>
              <div>${detail.price}</div>
              <div>Quantity: {quantity}</div>
            </div>
          </>
      }
      
    </div>
  )
}

OrderDetailCard.propTypes = {
  id: PropTypes.string,
  quantity: PropTypes.number,
}

export default OrderDetailCard;