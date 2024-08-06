import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import 'assets/css/BoardDetail.css'; 
import axios from 'axios';

import { FaHeart, FaShareAlt, FaArrowLeft } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUser } from '_selectors/selectors';

import Comments from 'views/Comments';

function BoardDetail({rowData}) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);

  const location = useLocation();
  // const rowData = location.state?.rowData;
  const currentUserID = isAuthenticated ? currentUser.userid : -1;
  const currentBoardId = location.pathname.split('/').pop();

  const [data, setData] = useState(rowData);
  const [likes, setLikes] = useState(rowData.likes);
  const [liked, setLiked] = useState(false);

  // const getData = (from) => {
  //   axios.get(from)
  //   .then(response => {
  //     // setData(response.data);
  //     // setLikes(data.likes);
  //     setLiked(isLiked(response.data.id, currentUserID));
  //   })
  //   .catch(error => console.log(error))
  // }

  const postData = async (to, data) => {
    try {
      const response = await axios.post(to, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error in postData:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardType = location.pathname.includes('used-board') ? 'used-transaction' : 'information';
        const url = '/eoditsseu/api/likes/liked';
        const requestData = { boardType: boardType, boardId: currentBoardId, usedId: currentUserID };
        const responseData = await postData(url, requestData);
        
        if (responseData === true) setLiked(true)
      } catch (error) {
          console.error('Error occurred:', error);
      }
    };
    
    if (isAuthenticated) fetchData();
}, [location.pathname, currentBoardId]);

  const handleLike = () => {
    if (!isAuthenticated) {
      alert('로그인 후 좋아요를 표시할 수 있습니다.');
      return;
    }
    
    const data = { id: null, board_id: currentBoardId, used_id: currentUserID };
    if (liked) {
      setLikes(likes - 1);
      postData('/eoditsseu/api/likes/submit', data);
    } else {
      setLikes(likes + 1);
      postData('/eoditsseu/api/likes/delete', data);
    }
    setLiked(!liked);
  };

  const handleShare = () => {
    // 링크가 "/info-board/search/:keyword/:idx" 이런 식인 경우 처리해야 함
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다.');
  };

  return (
    <div className="post-container">
      <Link 
          // to={`${location.pathname}`}  
          to={location.pathname.replace(/\/[^/]+$/, '')}
          style={{ textDecoration: 'none', color: 'inherit' }}>
        <button className="back-button">
          <FaArrowLeft className="icon" />
          돌아가기
        </button>
      </Link>
      <div className="post-header">
        <h1 className="post-title">{data.title}</h1>
        <div className="post-meta">
          <span className="post-author">글쓴이: {data.username}</span>
          <span className="post-date">작성일자: {data.createdAt}</span>
          {data.updatedAt && <span className="post-date">수정일자: {data.updatedAt}</span>}
        </div>
      </div>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: data.contents }} />
      <div className="post-footer">
        <button className="like-button" onClick={handleLike}>
          <FaHeart className={`heart-icon ${liked ? 'liked' : ''}`} />
          <span className={`likes-count ${liked ? 'liked' : ''}`}>{likes}</span>
        </button>
        <button className="share-button" onClick={handleShare}>
          <FaShareAlt /> 공유하기
        </button>
      </div>
      <Comments />
    </div>
  );
}

export default BoardDetail;