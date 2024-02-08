import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    inputName: '',
    inputComment: '',
    commentList: [],
  }

  deleteComment = commentId => {
    const {commentList} = this.state
    this.setState({
      commentList: commentList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentList} = this.state
    return commentList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {inputName, inputComment} = this.state
    const initialBackgroundColorClassNames = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: inputName,
      comment: inputComment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassNames,
    }
    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      inputName: '',
      inputComment: '',
    }))
  }

  onChangeCommentInput = event => {
    this.setState({inputComment: event.target.value})
  }

  onChangeNameInput = event => {
    this.setState({inputName: event.target.value})
  }

  render() {
    const {inputName, inputComment, commentList} = this.state

    return (
      <div className="bg-container">
        <div className="comments-container">
          <h1 className="heading">Comments</h1>
          <div className="tech-container">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="description-line">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="input-text"
                placeholder="Your Name"
                value={inputName}
                onChange={this.onChangeNameInput}
              />
              <textarea
                rows="7"
                placeholder="Your Comment"
                className="comment-area"
                value={inputComment}
                onChange={this.onChangeCommentInput}
              />
              <button
                type="button"
                className="add-button"
                onClick={this.onAddComment}
              >
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="image"
              alt="comments"
            />
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="comments-count">{commentList.length}</span>Comments
          </p>
          <ul className="comment-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}
export default Comments
