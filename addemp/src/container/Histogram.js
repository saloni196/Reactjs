import React, { Component } from 'react'
import '../App.css';

import * as ReactD3 from 'react-d3-components';
class Histogram extends Component {
state={

};



constructor(props)
{ 
  super(props);
  //this.renderTable=this.renderTable.bind(this);
}

  componentDidMount()
  {
    /* Set the header attributes */
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json"
        });
    
    /* fetch the employee details from server on port 5000 */
   fetch("http://localhost:5002/", {
     headers: myHeaders,      
    })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
            console.log(data);

        
            this.setState({ data });

          })

      
  }




  /* Render Employee details in tabular format */
  renderTable = () =>
  {

    return this.state.data[0].values.map(value=>{
    return (
          
      <tr>            
        <td>{value.x} </td>
        <td className="heights">{JSON.stringify(value.details).replace(/"/g," ").substring(1,JSON.stringify(value.details).replace(/"/g," ").length-1)} </td>
        <td>{value.y} </td>
      </tr>
    )
    
    })  
    
  }  

  scale = value => { 
    // some color selection
    return 'rgb(68, 105, 173)';//'rgb(255, 72, 0)';//'rgb(68, 105, 173)';
};

   render() {

    var BarChart = ReactD3.BarChart;

   return (
      <div className='App'>
        <div className='App-header'>
        <h2 className="histogram"> Histogram </h2>
        </div>
        <br/>
        <label className="ylabel"> No. of people </label>
        {document.getElementById('location')}
        <BarChart
            data={this.state.data}
            width={600}
            height={500}
            margin={{top: 50, bottom: 50, left: 50, right: 10}}
            colorScale={this.scale}
            />
          <label className="xlabel"> Range of Heights </label>

          <br/><br/><br/><br/><br/>
          <h2 className="histogram"> Details </h2>
            <table>
              <tbody>
                <tr>
                  <th> Range </th>
                  <th> Heights </th>
                  <th> Total </th>
                </tr>
                
                {//this.state && this.state.data && this.renderTable()
                }

              </tbody>
            </table>
            

        <br/><br/><br/>
          
        <br/>
      <div>


      </div>
      </div>
   )
   }
}

export default Histogram