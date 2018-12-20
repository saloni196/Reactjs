import React, { Component } from 'react';
import '../App.css';
import ReactDOM from 'react-dom';
import AddEmployee from "./AddEmployee";
import ViewEmployee from "./ViewEmployee";
import Home from "./Home";
//import Histogram from "./Histogram";
import Scatter from './Scatter';
import Statistics from './Statistics';

class Nav extends Component {
/* Renders a Navigation  */

constructor(props)
{
    super(props);
    this.handleHome=this.handleHome.bind(this);
    this.handleView=this.handleView.bind(this);
    this.handleAdd=this.handleAdd.bind(this);
    this.handleStatistics=this.handleStatistics.bind(this);
}


handleHome()
{
    ReactDOM.render(<Home/>, document.getElementById('empview'));
}


handleView()
{
    ReactDOM.render(<ViewEmployee/>, document.getElementById('empview'));
}

handleAdd()
{
    ReactDOM.render(<AddEmployee/>, document.getElementById('empview'));
}


handleStatistics()
{
    ReactDOM.render(<Statistics />, document.getElementById('empview'));
}


    render()
    {

        return(
           
            <nav>
                <ul>
                  <li><a onClick={this.handleHome}>Home</a></li>
                  <li><a onClick={this.handleView}>View Employee</a></li>
                  <li><a onClick={this.handleAdd}>Add Employee</a></li>
                  <li><a  onClick={this.handleStatistics}>Statistics</a></li>
                </ul>
            </nav>
            

        )
    }

}
export default Nav;