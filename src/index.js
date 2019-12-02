import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {useReducer} from 'react';
import {shuffle, sample} from 'underscore';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import AddAuthorForm from './AddAuthorForm.js';


const authors = [
  {
    name: ' Mark Twain',
    imageUrl: 'img/authors/mt.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventures of Huckleberry Finn']
  }, {
    name: ' Edvard Grieg',
    imageUrl: 'img/authors/grieg.jpg',
    imageSource: 'rand',
    books: ['Dovregubens Hall']
  }, {
    name: 'Bjørnstjerne Bjørnson',
    imageUrl: 'img/authors/bb.jpg',
    imageSource: 'Wikimedia Commonss',
    books: ['En Handske']
  }
];

function getAllBooks(){

    var allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
      }, []);

  return allBooks;  
}

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => 
            author.books.some((title) => 
                title === answer))
    }
}


let state = resetState();

function onAnswerSelected(answer) {
  const isCorrect = state
    .turnData
    .author
    .books
    .some((book) => book === answer);
  state.highlight = isCorrect
    ? 'correct'
    : 'wrong';
  render();
}

function resetState(){

    return {

        turnData: getTurnData(authors),
        highlight: ''
    
      
      }
}

function Application() {

  return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} onContinue={() => {state = resetState(); render(); }}/>

}

const AuthorWrapper = withRouter(({ history })=> 

    <AddAuthorForm {...state} onAddAuthor={(author) => {
        authors.push(author);
        history.push('/');
    }}/>

);

function render() {

  ReactDOM.render(

    <BrowserRouter>

    <React.Fragment>
      <Route exact path='/' component={Application}/>
      <Route exact path='/add' component={AuthorWrapper}/>
    </React.Fragment>

  </BrowserRouter>, document.getElementById('root'));

}

render();
serviceWorker.unregister();
