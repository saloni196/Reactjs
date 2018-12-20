import React, { Component } from 'react';
import '../App.css';
import ReactDOM from 'react-dom';
import AddEmployee from "./AddEmployee";


/* ViewEmployee Component fetches server response and displays employee details in tabular format */
class ViewEmployee extends Component {

  /* Constructor to perform initializations */
  constructor(props)
  {
    super(props);

    // This binding is necessary to make `this` work in the callback    
    this.handleClick=this.handleClick.bind(this);

  }

  /* On 'Add Employee' button click redirect to Add Employee form */
  handleClick ()
  {
    ReactDOM.render(<AddEmployee/>, document.getElementById('empview'));     
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
            //alert(data);
            this.setState({ data });
          });
      
  }


  /* Render Employee details in tabular format */
  renderTable = () =>
  {
        
    return this.state.data[0].view.map(value=>{
    return (
          
      <tr>
        <td>{value.Name} </td>
        <td>{value.Designation} </td>
        <td>{value.Salary} </td>
      </tr>
    )
    
    })  
    
  }


  render()
  {

        return(
          <div>
          
          
          <label className="empDetailHeading"> <b> Employee Details </b> </label>


          <br/><br/><br/>
          
          <button type="button" className="Add Employee" onClick={this.handleClick} className="buttonAdd" >Add Employee</button>
          <br/><br/>


          <table border="1" align="centre" >     
            <tbody>  
                  <tr>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Salary</th>
                  </tr>        
                 {this.state && this.state.data && this.renderTable()}
            </tbody>
          </table>

          


            </div>

        )
    }

}
export default ViewEmployee;