import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails} = props
  const {id, name, comment, isLiked, initialClassName, date} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeTextClassName = isLiked ? 'button-active' : 'button'
  const likeImgurl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTiem = formatDistanceToNow(date)

  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="comment-items">
      <div className="comment-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="time-container">
            <p className="username">{name}</p>
            <p className="time">{postedTiem} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="button-container">
        <div className="like-container">
          <img src={likeImgurl} alt="like" className="like-icon" />
          <button
            type="button"
            className={likeTextClassName}
            onClick={onClickLike}
          >
            Like
          </button>
        </div>
        <button
          className="button"
          type="button"
          data-testid="delete"
          onClick={onDeleteComment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete"
            alt="delete"
          />
        </button>
      </div>
      <ht className="comment-line" />
    </li>
  )
}
export default CommentItem
