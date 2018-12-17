import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TestComponent from "./container/TestComponent/TestComponent";
import Homepage from "./container/TestComponent/Homepage"
class App extends Component {


  render() {

  


    return (
      <div className="App">

        <div class="h">
          <h4>Welcome</h4>
        </div>

        <section>
          <nav>
            <ul>
              <li><a href="viewEmp.js">Employee</a></li>
              
            </ul>
          </nav>
  
          <article>
              <h1>This is Home Page</h1>
              
              <table border="1">
                <tr>
                  <td>Name</td>
                  <td>Designation</td>
                  <td>Salary</td>
                </tr>
                <tr>
                  <td>ABC</td>
                  <td>CEO</td>
                  <td>200000</td>
                </tr>

              </table>

            

            <Homepage/>
          </article>
        </section>

        <footer>
          <h4>Product Horizon</h4>
        </footer>

        



      </div>
    );
  }
}

export default App;
