import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import List from './list';
import Search from './search';

const PATH_PROXY = 'https://cors-anywhere.herokuapp.com/';
const PATH_BASE = 'https://newsapi.org/v2';
//const PATH_SOURCES = '/sources';
const PATH_EVERYTHING = '/everything'
//const DEFAULT_QUERY = 'apple';

const API_KEY = '8192195307294c62b0d688ae4ee74c39';
//const URL = `${PATH_PROXY}${PATH_BASE}${PATH_EVERYTHING}?q=${DEFAULT_QUERY}&apiKey=${API_KEY}`;

class App extends Component {
  constructor(props) {
      super(props)
      
      this.state = {
          articles: [],
          error: null,
          searchTerm: ''
      };
  };
      
  fetchStories(searchTerm) {
            
      axios(`${PATH_PROXY}${PATH_BASE}${PATH_EVERYTHING}?q=${searchTerm}&apiKey=${API_KEY}`)
      .then(results => this.setSearchStories(results))
      .catch(error => this.setState({ error }))
  }

  setSearchStories(results) {
      const updatedResults = results.data.articles.map( article => {
          return Object.assign({}, article, { likes: 0 })
      })
      
      this.setState({
          articles: updatedResults
      });
  }

  handleChange = (e) => {
     
      this.setState({
          searchTerm: e.target.value
      });

  }
  
  handleSubmit = (e) => {
      const { searchTerm } = this.state;
      e.preventDefault();
      this.fetchStories(searchTerm);
  }
  
  sortByTime = (a, b) => {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
  }
  
  handleLikes = articleTitle => {
      const { articles } = this.state;
      
      const updatedArticles = articles.map( article => {
          if(articleTitle === article.title) {
            return Object.assign({}, article, {likes: article.likes + 1 });
          } else {
            return article;
          }
      });
      
      this.setState({ articles: updatedArticles });
  }

  componentDidMount() {
      this.fetchStories('apple');

  }
    
  render() {
      const { articles } = this.state;
      //console.log(articles);
      //console.log(searchTerm);
      console.log(articles);
    return (
      <div className="App">
       <Search 
           onSubmit={ this.handleSubmit } 
           onChange={ this.handleChange } 
       />
       <List articles={articles} sortByTime={this.sortByTime} handleLikes={this.handleLikes}/>
      </div>
    );
  }
}

export default App;
