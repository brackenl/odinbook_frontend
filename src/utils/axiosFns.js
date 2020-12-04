import axios from "./axios";

const sortPosts = (arr) => {
  const sortedArr = arr.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
  return sortedArr;
};

const axiosFns = (postsArr, setPostsArr, user, skip, setLoading) => {
  const getPosts = () => {
    if (skip === 0) setLoading(true);
    axios
      .get(`/posts/?skip=${skip}`, { data: { skip: skip } })
      .then((results) => {
        setPostsArr(sortPosts([...postsArr, ...results.data.posts]));
        if (skip === 0) setLoading(false);
      });
  };

  const handlePostSubmit = async (postText, imageFile) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("img-file", imageFile);

      const res = await axios.post("/posts", { content: postText });
      const res2 = await axios.put(`/posts/${res.data.post._id}`, formData);

      const updatedPosts = [...postsArr, res2.data.post];
      setPostsArr(sortPosts(updatedPosts));
    } else {
      axios.post("/posts", { content: postText }).then((result) => {
        const updatedPosts = [...postsArr, result.data.post];
        setPostsArr(sortPosts(updatedPosts));
      });
    }
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
