import React, { Component } from 'react';
import './App.css';
import ViewEmployee from "./container/ViewEmployee";
import Header from "./container/Header";
import Footer from "./container/Footer";
import Nav from "./container/Nav";
import Home from "./container/Home";


class App extends Component {

  state = {
    data:[]
  }
  
  /* Constructor to perform initializations */
  constructor(props) {
    super(props);    
  }

render()
 {

  console.log(this.state.data);       

    return (
       
      <div className="App">
        
        <Header/>
        
        <section>

          <Nav className="col"/>  
          
          <article id="empview" className="col">
            
            <Home className="viewArea"/>

          </article>

        </section>
        
        <Footer/>   
      
      </div>

      )
    
  }  

}

export default App;