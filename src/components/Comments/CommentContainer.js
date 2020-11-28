import React from "react";

import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";

const CommentContainer = ({
  post,
  showCommentForm,
  user,
  handleCommentSubmit,
  handleLikeComment,
}) => {
  return (
    <div>
      {post.comments.map((comment) => {
        return (
          <Comment
            comment={comment}
            handleLikeComment={handleLikeComment}
            postId={post._id}
            key={comment._id}
          />
        );
      })}
      {showCommentForm ? (
        <NewCommentForm
          user={user}
          handleCommentSubmit={handleCommentSubmit}
          postId={post._id}
        />
      ) : null}
    </div>
  );
};

export default CommentContainer;
