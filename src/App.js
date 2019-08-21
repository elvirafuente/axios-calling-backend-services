import React, { Component } from "react";
import axios from 'axios';
import "./App.css";

const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount(){
    //básico
    // const promise = axios.get('https://jsonplaceholder.typicode.com/posts');
    // const response = await promise;  
    //reducido
    // const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    //destructuring (´solo queremos la clave data y la renombramos a posts)

    const {data: posts} = await axios.get(apiEndpoint);
    this.setState({posts});
  }

  handleAdd = async () => {
    const newPost =  {title: 'lalala', body: 'prueba para aprender a postear'};
    const { data: post } = await axios.post(apiEndpoint, newPost);
    const posts = [post, ...this.state.posts];
    this.setState({posts})
  };

  handleUpdate = async post => {
    post.title = 'UPDATED';
    //patch = sólo envias las propiedades que quieres actualizar
    // axios.patch(`${apiEndpoint}/${post.id}`, {title:post.title});
    //put = necesitas enviar el objeto entero
    await axios.put(`${apiEndpoint}/${post.id}`, post)
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = {...post}
    this.setState({ posts })
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;    
    
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({posts})
    
    try {
      await axios.delete(`${apiEndpoint}/${post.id}`);
      throw new Error('')
    }
    catch (error){
      alert('Something failed while deleting a post!');
      this.setState({posts:originalPosts});
    }

  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
