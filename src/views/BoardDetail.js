import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import 'assets/css/BoardDetail.css'; 

import { FaHeart, FaShareAlt, FaArrowLeft } from 'react-icons/fa';

import Comments from 'views/Comments';

function BoardDetail() {
  const location = useLocation();
  const rowData = location.state?.rowData;
  const [likes, setLikes] = useState(rowData.likes);
  const [liked, setLiked] = useState(false);

  console.log("location() ", rowData);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
    // 변경 사항 전송 코드 추가..
  };

  const handleShare = () => {
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
        <h1 className="post-title">{rowData.title}</h1>
        <div className="post-meta">
          <span className="post-author">글쓴이: {rowData.user_id}</span>
          <span className="post-date">작성일자: {rowData.createdAt}</span>
          {/* {updatedAt && <span className="post-date">수정일자: {rowData.updatedAt}</span>} */}
        </div>
      </div>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: rowData.contents }} />
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