import React, { useState } from 'react';
import 'assets/css/Comments.css'; 

import { loadCommentsData } from 'util/Data';

// const Comment = ({ content, username, createdAt, updatedAt, currentUserID }) => {
//   return (
//     <div className="comment-container">
//       <div className="comment-meta">
//         <span className="comment-username">{username}</span>
//         <div className="comment-dates">
//           <span className="comment-date">{createdAt}</span>
//           {updatedAt && <span className="comment-date">(수정됨: {updatedAt})</span>}
//         </div>
//         {comment.user_id === currentUserID && (
//           <div>
//             <button className="edit-button" onClick={() => handleEditComment(comment.id)}>수정</button>
//             <div> | </div>
//             <button className="delete-button" onClick={() => handleDeleteComment(comment.id)}>삭제</button>
//           </div>
//         )}
//       </div>
//       <div className="comment-content">{content}</div>
//     </div>
//   );
// };

function Comments() {
  const [comments, setComments] = useState(loadCommentsData());
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  const currentUserID = 3;
  
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    if (newComment.trim() === '') return;

    // 로그인 안되어있으면 기각 코드 추가

    const currentDate = new Date().toISOString().slice(0, 10);
    const newCommentObject = {
      id: comments.length + 1, 
      content: newComment,
      username: '사용자',       // 사용자 정보 가져오는 코드로 수정
      createdAt: currentDate,
      updatedAt: '',
      user_id: currentUserID,
    };

    const updatedComments = [...comments, newCommentObject];
    // 변경 사항 전송 코드 추가..

    setComments(updatedComments);
    setNewComment(''); // 댓글 입력창 초기화
  };

  const handleEditComment = (commentId, content) => {
    // 수정 상태로 변경
    setEditingCommentId(commentId);
    setEditedComment(content)
  };

  const handleSaveComment = (commentId, editedContent) => {
    const updatedComments = comments.map(comment =>
      comment.id === commentId ? { ...comment, content: editedContent, updatedAt: new Date().toISOString().slice(0, 10) } : comment
    );
    setComments(updatedComments);
    // 변경 사항 전송 코드 추가..

    setEditingCommentId(null);
  };

  const handleDeleteComment = (commentId) => {
    console.log(`댓글 삭제 ID: ${commentId}`);
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
    // 변경 사항 전송 코드 추가..
  };

  return (
    <div className="comments-section">
      <h5>댓글</h5>
      {comments.map((comment, index) => (
        <div className="comment-container">
          <div className="comment-meta">
            <span className="comment-username">{comment.username}</span>
            <div className="comment-options">
              <span className="comment-date">{comment.createdAt}</span>
              {comment.updatedAt && <span className="comment-date">(수정됨: {comment.updatedAt})</span>}
              {comment.user_id === currentUserID && (
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