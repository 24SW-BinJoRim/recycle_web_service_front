import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUser } from '_selectors/selectors';

import 'assets/css/Comments.css'; 

function Comments(props) {
  const data = props.data;
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);
  const currentUserID = isAuthenticated ? currentUser.userid : -1;
  const currentUsername = isAuthenticated ? currentUser.username : "user";
  const currentNickname = isAuthenticated ? currentUser.nickname : "사용자";
  const boardType = location.pathname.includes('used-board') ? 'used-transaction' : 'information';
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  useEffect(() => {
    postCommentsData();
    
  }, []); 

  const getData = (from) => {
    axios.get(from)
    .then(response => setComments(response.data))
    .catch(error => console.log(error))
  }

  const postCommentsData = () => {
    
    const request = {
      board_id : data.id,
      type : boardType,
    }

    axios.post('/eoditsseu/api/comments/data', request)
    .then(response => setComments(response.data))
    .catch(error => console.log(error))
  }

  const postData = (to, data) => {
    axios.post(to, data)
    // .then(response => console.log(response.data))
    .then()
    .catch(error => console.log(error))
  };
  
  // 댓글 등록
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert('로그인 후 댓글을 작성할 수 있습니다.');
      return;
    }
    
    if (newComment.trim() === '') return;
    
    const currentDate = new Date().toISOString().slice(0, 10);
    const newCommentObject = {
      id: comments.length + 1,  // id 임의 지정
      content: newComment,
      username: currentUsername,
      nickname: currentNickname,
      createdAt: currentDate,
      updatedAt: '',
      userid: currentUserID,
      board_id: data.id,
      boardType: boardType
    };

    postData('/eoditsseu/api/comments/submit', newCommentObject);
    const updatedComments = [...comments, newCommentObject]; 

    // 데이터 리로드
    postCommentsData();

    setComments(updatedComments);
    setNewComment(''); // 댓글 입력창 초기화
  };

  // 댓글 수정
  const handleEditComment = (commentId, content) => {
    // 수정 상태로 변경
    setEditingCommentId(commentId);
    setEditedComment(content)
  };

  // 댓글 수정 후 저장
  const handleSaveComment = (commentId, editedContent) => {
    const updatedComments = comments.map(comment =>
      comment.id === commentId ? { ...comment, content: editedContent, updatedAt: new Date().toISOString().slice(0, 10) } : comment
    );
    setComments(updatedComments);
    postData('/eoditsseu/api/comments/edit', updatedComments.find(comment => comment.id === commentId));

    setEditingCommentId(null);
  };

  const handleDeleteComment = (commentId) => {
    console.log(`댓글 삭제 ID: ${commentId}`);
    postData('/eoditsseu/api/comments/delete', comments.find(comment => comment.id === commentId));

    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
  };

  return (
    <div className="comments-section">
      <h5>댓글({comments.length})</h5>
      {comments.map((comment, index) => (
        <div className="comment-container">
          <div className="comment-meta">
            <span className="comment-username">{comment.nickname}</span>
            <div className="comment-options">
              <span className="comment-date">{comment.createdAt}</span>
              {comment.updatedAt && <span className="comment-date">(수정됨: {comment.updatedAt})</span>}
              {comment.userid === currentUserID && (
                <div className="comment-buttons">
                  {editingCommentId === comment.id ? (
                    <>
                      <button className="comment-button save-button" onClick={() => handleSaveComment(comment.id, editedComment)}>저장</button>
                      <span> | </span>
                      <button className="comment-button cancel-button" onClick={() => setEditingCommentId(null)}>취소</button>
                    </>
                  ) : (
                    <>
                      <button className="comment-button edit-button" onClick={() => handleEditComment(comment.id, comment.content)}>수정</button>
                      <span> | </span>
                      <button className="comment-button delete-button" onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="comment-content">
            {editingCommentId === comment.id ? (
              <textarea
                className="comment-edit"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              ></textarea>
            ) : (
              <div>{comment.content}</div>
            )}
          </div>
        </div>
      ))}
      <form className="comment-form" onSubmit={handleCommentSubmit}>
        <textarea
          placeholder="댓글을 입력하세요..."
          className="comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button type="submit" className="btn btn-info comment-submit-button">등록</button>
      </form>
    </div>
  );
}

export default Comments;