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

  const getData = (from, setData) => {
    axios.get(from)
    .then(response => setData(response.data))
    .catch(error => console.log(error))
  }
  
  const postData = (to, data) => {
    axios.post(to, data)
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
  };

  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/eoditsseu/users/login");
      return;
    }

    getData(`/eoditsseu/api/userpage/posts/${currentUser.userid}`, setPosts);
    getData(`/eoditsseu/api/userpage/comments/${currentUser.userid}`, setComments);
    getData(`/eoditsseu/api/userpage/likes/${currentUser.userid}`, setLikes);
  }, [isAuthenticated, navigate]);

  if (!currentUser) {
    return (
      <div className="loading-screen">
        <ClipLoader size={30} color={"#123abc"} loading={true} />
        <p>로딩 중...</p>
      </div>
    );
  }

  const userProfile = {
    profilePicture: null,
    username: "John Doe",
    userId: "john_doe",
  };

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
      {posts.map(post => (
        <div key={post.id} className="post-item" onClick={() => {
          const boardType = post.type === 'used-transaction' ? 'used-board' : 'info-board';
          navigate(`/eoditsseu/${boardType}/${post.postId}`)
        }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

const UserComments = (data) => {
  const comments = data.comments;
  const navigate = data.navigate;
  console.log('UserComments: ', data);
  return (
    <div className="user-comments">
      {comments.map(comment => (
        <div key={comment.id} className="comment-item" onClick={() => {
          const boardType = comment.type === 'used-transaction' ? 'used-board' : 'info-board';
          navigate(`/eoditsseu/${boardType}/${comment.postId}`)
        }}>
          <p>{comment.content}</p>
          <p className="post-title">on {comment.postTitle}</p>
        </div>
      ))}
    </div>
  );
};

const UserLikes = (data) => {
  const likes = data.likes;
  const navigate = data.navigate;
  console.log('UserLikes: ', data);
  return (
    <div className="user-likes">
      {likes.map(like => (
        <div key={like.id} className="like-item" onClick={() => {
          const boardType = like.type === 'used-transaction' ? 'used-board' : 'info-board';
          navigate(`/eoditsseu/${boardType}/${like.postId}`)
        }}>
          <h3>{like.title}</h3>
          <p>{like.content}</p>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
