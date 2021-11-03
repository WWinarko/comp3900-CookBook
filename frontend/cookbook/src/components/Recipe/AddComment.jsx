import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CustomTextField from "../TextField/CustomTextField";
import SquareButton from '../SquareButton';

function AddComment({ setComments, setNewComment }) {
  const [comment, setComment] = useState('');
  
  const handlePost = () => {
    if (comment !== '') {
      handleCancel();
    } else {
      setComments([]);
    }
  }

  const handleCancel = () => {
    setNewComment(false);
  }

  return (
    <>
    <div>
      <CustomTextField id="newComment" name="New Comment" multiline value={comment} setValue={setComment} width="781px"/>
    </div>
    <div style={{ display: 'flex', gap: '10px' }}>
      <SquareButton name="Post" onClick={handlePost} />
      <SquareButton name="Cancel" onClick={handleCancel} />
    </div>
    </>
  )
}

AddComment.propTypes = {
  setComments: PropTypes.func,
  setNewComment: PropTypes.func
}

export default AddComment;