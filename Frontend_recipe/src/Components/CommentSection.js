import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CommentSection = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `http://localhost/Recipe_app/Backend_recipe/api/v1/getcommentsbyrecipeid.php?recipe_id=${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setComments(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (comments.length === 0) return <div>No comments yet.</div>;

  return (
    <div className="comments-section">
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div className="comment-section">
          <p>
            {comment.first_name} {comment.last_name}
          </p>
          <div key={comment.comment_id} className="comment">
            <p>{comment.comment_text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
