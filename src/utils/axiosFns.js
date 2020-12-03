import axios from "./axios";

const sortPosts = (arr) => {
  const sortedArr = arr.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
  return sortedArr;
};

const axiosFns = (postsArr, setPostsArr, user) => {
  const getPosts = () => {
    axios.get("/posts").then((results) => {
      setPostsArr(sortPosts(results.data.posts));
    });
  };

  const handlePostSubmit = (postText) => {
    axios.post("/posts", { content: postText }).then((result) => {
      const updatedPosts = [...postsArr, result.data.post];
      setPostsArr(sortPosts(updatedPosts));
    });
  };

  const handleLikePost = (postId) => {
    axios.put(`/posts/${postId}/like`).then((result) => {
      const updatedPosts = [...postsArr];
      const relPostInd = updatedPosts.findIndex((post) => post._id == postId);
      if (!updatedPosts[relPostInd].likes.includes(user.id)) {
        updatedPosts[relPostInd].likes.push(user.id);
      } else {
        updatedPosts[relPostInd].likes = updatedPosts[relPostInd].likes.filter(
          (id) => id != user.id
        );
      }
      setPostsArr(sortPosts(updatedPosts));
    });
  };

  const handleCommentSubmit = (postId, commentText) => {
    axios
      .post(`/posts/${postId}/comments`, {
        comment: commentText,
      })
      .then((result) => {
        const updatedPosts = [...postsArr];
        const relPostInd = updatedPosts.findIndex((post) => post._id == postId);
        updatedPosts[relPostInd].comments = [
          ...updatedPosts[relPostInd].comments,
          result.data.comment,
        ];
        setPostsArr(sortPosts(updatedPosts));
      });
  };

  const handleLikeComment = (postId, commentId) => {
    axios.put(`/posts/${postId}/comments/${commentId}/like`).then((result) => {
      const updatedPosts = [...postsArr];
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
      setPostsArr(sortPosts(updatedPosts));
    });
  };

  return {
    getPosts,
    handlePostSubmit,
    handleLikePost,
    handleCommentSubmit,
    handleLikeComment,
  };
};

export default axiosFns;