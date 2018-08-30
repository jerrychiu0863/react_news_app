import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

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
      
      /*articles.map( article => {
          console.log(article.id);
          if(article.id !== articleId) {
            return this.setState({savedArticles: [...savedArticles, article.id]});
          } 
      })*/
      
      if(savedArticles.includes(articleId)) {
          return [];
      } else {
          return this.setState({savedArticles: [...savedArticles, articleId]});
      }
      
 
     /* const isId = article => article.id === articleId;
      const updatearticles = articles.filter(isId);
      this.setState({ newArticles: updatearticles});*/
  }
  
  newArticle() {
      const {savedArticles, articles} = this.state;
      
      var updatedSavedArticles = savedArticles.map( savedArticle => 
        {
         var article = articles.find(article => article.id === savedArticle);
         return {...article};
        });
      
           console.log(updatedSavedArticles);
      return(
        <div>
           <ul>
            {updatedSavedArticles.map(a => 
                  <li>{a.author}</li>
               
            )}
           </ul> 
        </div>
      );
  }

  componentDidMount() {

      this.fetchStories('apple');

  }
    
  render() {
      const { articles } = this.state;
      //console.log(savedArticles);
    return (
      <div className="App">
       <Search 
           onSubmit={ this.handleSubmit } 
           onChange={ this.handleChange } 
       />
       { articles && <List articles={articles} sortByTime={this.sortByTime} handleLikes={this.handleLikes} handleDislikes={this.handleDislikes} handleSavedArticle={this.handleSavedArticle}/>}
       { articles.length === 0 && <Loading />}
       <div>{this.newArticle()}</div>
      </div>
    );
  }
}

export default App;
