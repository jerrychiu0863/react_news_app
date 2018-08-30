import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import './App.css';
import List from './list';
import Search from './search';
import SideBar from './sideBar';

const PATH_PROXY = 'https://cors-anywhere.herokuapp.com/';
const PATH_BASE = 'https://newsapi.org/v2';
//const PATH_SOURCES = '/sources';
const PATH_EVERYTHING = '/everything'
//const DEFAULT_QUERY = 'apple';

const API_KEY = '8192195307294c62b0d688ae4ee74c39';
//const URL = `${PATH_PROXY}${PATH_BASE}${PATH_EVERYTHING}?q=${DEFAULT_QUERY}&apiKey=${API_KEY}`;

const Loading = () => {
    return(
        <div>Loading</div>
    );
}

class App extends Component {
  constructor(props) {
      super(props)
      
      this.state = {
          articles: [],
          error: null,
          searchTerm: '',
          savedArticles: []
      };
  };
      
  fetchStories(searchTerm) {
            
      axios(`${PATH_PROXY}${PATH_BASE}${PATH_EVERYTHING}?q=${searchTerm}&apiKey=${API_KEY}`)
      .then(results => this.setSearchStories(results))
      .catch(error => this.setState({ error }))
  }

  setSearchStories(results) {
    
      const updatedResults = results.data.articles.map( article => {
          return Object.assign({}, article, { likes: 0, id: _.uniqueId(), dislikes: 0 })
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
      this.setState({savedArticles: [],
                     searchTerm: ''
                    });

  }
  
  sortByTime = (a, b) => {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
  }
  
  handleLikes = articleId => {
      const { articles } = this.state;
      
      const updatedArticles = articles.map( article => {
          if(articleId === article.id) {
            return Object.assign({}, article, {likes: article.likes + 1 });
          } else {
            return article;
          }
      });
      
      this.setState({ articles: updatedArticles });
  }
  
  handleDislikes = articleId => {
      const { articles } = this.state;
      
      const updatedArticles = articles.map( article => {
          if(articleId === article.id) {
            return Object.assign({}, article, {dislikes: article.dislikes + 1 });
          } else {
            return article;
          }
      });
      
      this.setState({ articles: updatedArticles });
      
  }
  
  handleSavedArticle = articleId => {
      
      const { savedArticles } = this.state;
                  
      if(savedArticles.includes(articleId)) {
          return [];
      } else {
          return this.setState({savedArticles: [...savedArticles, articleId]});
      }
 
  }
  
  renderArticleSaved() {
      const { savedArticles, articles } = this.state;
      
      var updatedSavedArticles = savedArticles.map( savedArticle => 
        {
         var article = articles.find(article => article.id === savedArticle);
         return {...article};
        });
       
      if(updatedSavedArticles.length !== 0) {
          return <SideBar savedArticles={ updatedSavedArticles } />
      } else {
          return null;
      }
  
  }

  componentDidMount() {

      this.fetchStories('apple');

  }
    
  render() {
      const { articles, searchTerm } = this.state;
      //console.log(savedArticles);
    return (
      <div className="App">
      
       <Search 
           onSubmit={ this.handleSubmit } 
           onChange={ this.handleChange } 
           value={ searchTerm }
       >
           <img src="https://images.unsplash.com/photo-1529243856184-fd5465488984?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=95834c9e01a9ff2a5a61c79fc92a180f&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb" alt="img" />
       </Search>
       
       <div className="App__mainBody">
           { articles && <List articles={articles} sortByTime={this.sortByTime} handleLikes={this.handleLikes} handleDislikes={this.handleDislikes} handleSavedArticle={this.handleSavedArticle}/>}
           { articles.length === 0 && <Loading />}
           <div>{this.renderArticleSaved()}</div>
       </div>
       
      </div>
    );
  }
}

export default App;
