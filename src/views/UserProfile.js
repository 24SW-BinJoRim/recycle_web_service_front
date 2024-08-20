import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";

import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUser } from '_selectors/selectors';

import 'assets/css/UserProfile.css';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);

  const getData = async (from, setData) => {
    try {
      const response = await axios.get(from);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const postData = async (to, data, setData) => {
    try {
      const response = await axios.post(to, data);
      setData(response.data);
    } catch (error) {
      console.error('Error in postData:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/eoditsseu/users/login");
      return;
    }

    const requestData = { userid: currentUser.userid, username: currentUser.username };
    postData(`/eoditsseu/api/userpage/posts`, requestData, setPosts);
    postData(`/eoditsseu/api/userpage/comments`, requestData, setComments);
    postData(`/eoditsseu/api/userpage/likes`, requestData, setLikes);
  }, [isAuthenticated, navigate]);

  if (!currentUser) {
    return (
      <div className="loading-screen">
        <ClipLoader size={30} color={"#123abc"} loading={true} />
        <p>로딩 중...</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "posts":
        return <UserPosts posts={posts} navigate={navigate} />;
      case "comments":
        return <UserComments comments={comments} navigate={navigate} />;
      case "likes":
        return <UserLikes likes={likes} navigate={navigate} />;
      default:
        return <UserPosts posts={posts} navigate={navigate} />;
    }
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        {currentUser.profilePicture ? (
          <img src={currentUser.profilePicture} alt="Profile" className="profile-picture" />
        ) : (
          <FaUser className="profile-icon" />
        )}
        <div className="profile-info">
          <h2>{currentUser.username}</h2>
          <p>ID: {currentUser.userid}</p>
        </div>
      </div>
      <div className="profile-tabs">
        <button onClick={() => setActiveTab("posts")} className={activeTab === "posts" ? "active" : ""}>
          Posts
        </button>
        <button onClick={() => setActiveTab("comments")} className={activeTab === "comments" ? "active" : ""}>
          Comments
        </button>
        <button onClick={() => setActiveTab("likes")} className={activeTab === "likes" ? "active" : ""}>
          Likes
        </button>
      </div>
      <div className="profile-content">
        {renderContent()}
      </div>
    </div>
  );
};

const UserPosts = (data) => {
  const posts = data.posts;
  const navigate = data.navigate;
  console.log('UserPosts: ', data);
  return (
    <div className="user-posts">
      { (typeof posts === 'undefined') ? (
          // fetch가 완료되지 않았을 경우에 대한 처리
          <p>loding...</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="post-item" onClick={() => {
            const boardType = post.type === 'used-transaction' ? 'used-board' : 'info-board';
            navigate(`/eoditsseu/${boardType}/${post.postId}`)
          }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

const UserComments = (data) => {
  const comments = data.comments;
  const navigate = data.navigate;
  console.log('UserComments: ', data);
  return (
    <div className="user-comments">
    { (typeof comments === 'undefined') ? (
        // fetch가 완료되지 않았을 경우에 대한 처리
        <p>loding...</p>
    ) : (
      comments.map(comment => (
        <div key={comment.id} className="comment-item" onClick={() => {
          const boardType = comment.type === 'used-transaction' ? 'used-board' : 'info-board';
          navigate(`/eoditsseu/${boardType}/${comment.postId}`)
        }}>
          <p>{comment.content}</p>
          <p className="post-title">on {comment.postTitle}</p>
        </div>
      ))
    )}
    </div>
  );
};

const UserLikes = (data) => {
  const likes = data.likes;
  const navigate = data.navigate;
  console.log('UserLikes: ', data);
  return (
    <div className="user-likes">
    { (typeof likes === 'undefined') ? (
        // fetch가 완료되지 않았을 경우에 대한 처리
        <p>loding...</p>
    ) : (
      likes.map(like => (
        <div key={like.id} className="like-item" onClick={() => {
          const boardType = like.type === 'used-transaction' ? 'used-board' : 'info-board';
          navigate(`/eoditsseu/${boardType}/${like.postId}`)
        }}>
          <h3>{like.title}</h3>
          <p>{like.content}</p>
        </div>
      ))
    )}
    </div>
  );
};

export default UserProfile;
