import axios from "./axios";

const sortPosts = (arr) => {
  const sortedArr = arr.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
  return sortedArr;
};

const axiosFns = ({
  posts,
  setPosts,
  user,
  skip,
  setLoadingPosts,
  userFriends,
  setUserFriends,
  friendRequests,
  setFriendRequests,
}) => {
  const getPosts = () => {
    if (skip === 0) setLoadingPosts(true);
    axios
      .get(`/posts/?skip=${skip}`, { data: { skip: skip } })
      .then((results) => {
        setPosts(sortPosts([...posts, ...results.data.posts]));
        if (skip === 0) setLoadingPosts(false);
      });
  };

  const handlePostSubmit = async (postText, imageFile) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("img-file", imageFile);

      const res = await axios.post("/posts", { content: postText });
      const res2 = await axios.put(`/posts/${res.data.post._id}`, formData);

      const updatedPosts = [...posts, res2.data.post];
      setPosts(sortPosts(updatedPosts));
    } else {
      axios.post("/posts", { content: postText }).then((result) => {
        const updatedPosts = [...posts, result.data.post];
        setPosts(sortPosts(updatedPosts));
      });
    }
  };

  const handleLikePost = (postId) => {
    axios.put(`/posts/${postId}/like`).then((result) => {
      const updatedPosts = [...posts];
      const relPostInd = updatedPosts.findIndex((post) => post._id == postId);
      if (!updatedPosts[relPostInd].likes.includes(user.id)) {
        updatedPosts[relPostInd].likes.push(user.id);
      } else {
        updatedPosts[relPostInd].likes = updatedPosts[relPostInd].likes.filter(
          (id) => id != user.id
        );
      }
      setPosts(sortPosts(updatedPosts));
    });
  };

  const handleCommentSubmit = (postId, commentText) => {
    axios
      .post(`/posts/${postId}/comments`, {
        comment: commentText,
      })
      .then((result) => {
        const updatedPosts = [...posts];
        const relPostInd = updatedPosts.findIndex((post) => post._id == postId);
        updatedPosts[relPostInd].comments = [
          ...updatedPosts[relPostInd].comments,
          result.data.comment,
        ];
        setPosts(sortPosts(updatedPosts));
      });
  };

  const handleLikeComment = (postId, commentId) => {
    axios.put(`/posts/${postId}/comments/${commentId}/like`).then((result) => {
      const updatedPosts = [...posts];
      const relPostInd = updatedPosts.findIndex((post) => post._id == postId);
      const relCommInd = updatedPosts[relPostInd].comments.findIndex(
        (comm) => comm._id == commentId
      );
      if (
        !updatedPosts[relPostInd].comments[relCommInd].likes.includes(user.id)
      ) {
        updatedPosts[relPostInd].comments[relCommInd].likes.push(user.id);
      } else {
        updatedPosts[relPostInd].comments[relCommInd].likes = updatedPosts[
          relPostInd
        ].comments[relCommInd].likes.filter((id) => id != user.id);
      }
      setPosts(sortPosts(updatedPosts));
    });
  };

  const handleAcceptRequest = (id) => {
    axios
      .put(`/users/friends/accept`, {
        relUserId: id,
      })
      .then((result) => {
        setUserFriends(result.data.user.friends);

        const updatedFriendReqs = friendRequests.filter(
          (item) => item._id != id
        );
        setFriendRequests(updatedFriendReqs);
      });
  };

  const handleDeclineRequest = (id) => {
    axios
      .delete(`/users/friends/decline`, {
        data: {
          relUserId: id,
        },
      })
      .then((result) => {
        const updatedFriendReqs = friendRequests.filter(
          (item) => item._id != id
        );
        setFriendRequests(updatedFriendReqs);
      });
  };

  return {
    getPosts,
    handlePostSubmit,
    handleLikePost,
    handleCommentSubmit,
    handleLikeComment,
    handleAcceptRequest,
    handleDeclineRequest,
  };
};

export default axiosFns;
