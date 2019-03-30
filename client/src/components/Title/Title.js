import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Title extends Component {
  static propTypes = {
    posts: PropTypes.array
  }

  render() {
    const posts = this.props.posts.length ? this.props.posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    )) : (
      'there are no posts' 
    );
    return (
      <div>
        <h1>MERN Stack Boilerplate</h1>
        <p>A MERN stack starter app with Redux and React Router</p>
        <h2>SAMPLE POSTS:</h2>
        <div>
          { posts }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: Object.values(state.posts)
});

export default connect(mapStateToProps)(Title);
