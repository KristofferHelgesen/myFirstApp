import React from 'react';
import ReactDOM from 'react-dom';
import "./AddAuthorForm.css";

const authors = getAllAuthors();
function getAllAuthors(){
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
      return authors;
}
function getAllBooks(){

    var allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
      }, []);

  return allBooks;  
}
 
class AuthorForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            imageUrl:'',
            books:getAllBooks(),
            bookTemp:''
        } 
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.onAddAuthor(this.state);

    }

    handleAddBook(event){

        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp:''
        }
           
        )
        console.log(this.state.books);
    }
    onFieldChange(event){
        this.setState({
            [event.target.name]:event.target.value
            
        });
    }

    render(){

        return <form onSubmit={this.handleSubmit}>
        <div className="AddAuthorForm_input">
          <label htmlFor="name">Name</label>
          <input onChange={this.onFieldChange} type="text" name="name" value={this.state.name}></input>
        </div>
        
        <div className="AddAuthorForm_input">
          <label htmlFor="imageUrl">Img URL</label>
          <input onChange={this.onFieldChange} type="text" name="imageUrl" value={this.state.imageUrl}></input>
        </div>
        <div className="AddAuthorForm_input">
            {this.state.books.map((book) => <p key={book}>{book}</p>)}
           
            <label htmlFor="bookTemp">Books</label>
            <input onChange={this.onFieldChange} type="text" name="bookTemp" value={this.state.bookTemp} ></input>
            <input type="button" value="+" onClick={this.handleAddBook}></input>
        </div>
        <input type="submit" value="Add"/>
      </form>
    }
}

function AddAuthorForm({match,onAddAuthor}) {
    console.log(match);
  return <div className="AddAuthorForm">
    <h1>Add Author</h1>
    <AuthorForm onAddAuthor={onAddAuthor}/>
  </div>;

}

export default AddAuthorForm;