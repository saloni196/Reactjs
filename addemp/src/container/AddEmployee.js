import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import axios from 'axios';
import querystring from 'querystring';
import '../App.js';
import ViewArea from '../ViewEmployee';
import Home from './Home';

class AddEmployee extends Component{

    /* Constructor to perform initializations */
    constructor(props)
    {
        super(props);    


        this.state = {
            name: '',
            designation: '',
            salary:'',
            errorMessage: null,
        };


        // This binding is necessary to make `this` work in the callback
        this.handleBack = this.handleBack.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDesignation = this.handleChangeDesignation.bind(this);
        this.handleChangeSalary = this.handleChangeSalary.bind(this);
    }

    /* On Name Change Handler --- */
    handleChangeName(event)
    {
        var lname=event.target.value;
        var len=lname.length-1;

        /* Following block doesn't allow users to enter numbers or special character in 'Name' field */
        if( (lname[len]>='a' && lname[len]<='z' ) || (lname[len]>='A' && lname[len]<='Z') || lname[len]<=' ')
        {

            this.setState({
                name:event.target.value,           
           
           });
            
        }
            
        else
        {            
            this.refs.name.value=lname.substring(0,len);
        }
    }

    /* On Designation Change Handler --- */
    handleChangeDesignation(event)
    {
        var ldes=event.target.value;
        var len=ldes.length-1;

        /* Following block doesn't allow users to enter numbers or special character in 'Designation' field */
        if( (ldes[len]>='a' && ldes[len]<='z' ) || (ldes[len]>='A' && ldes[len]<='Z') || ldes[len]<=' ')
        {

            this.setState({
                designation:event.target.value,           
           
           });
            
        }
            
        else
        {
            this.refs.designation.value=ldes.substring(0,len);
        }

    }

    /* On Salary Change Handler --- */
    handleChangeSalary(event)
    {
        var lsal=event.target.value;
        var len=lsal.length-1;

        /* Following block doesn't allow users to enter alphabets or special character in 'Salary' field */
        if( (lsal[len]>='0' && lsal[len]<='9' ))
        {

            this.setState({
                salary:event.target.value,           
           
           });
            
        }
            
        else
        {            
            this.refs.salary.value=lsal.substring(0,len);
        }

        this.setState({
             salary:event.target.value,           
        });
    }

    /* On 'Save' Button Click add Employee to .csv using nodejs*/
    handleSubmit (event)
    {        
        event.preventDefault();

        /* Extract the form field values into emp object */
        var emp =  {
          'name': this.state.name,
          'designation': this.state.designation,
          'salary':this.state.salary,
        }
    
        /* Stringify the emp object and send request to server listening on port 5000 */
        axios.post("http://localhost:5002/",querystring.stringify(emp))
        .then(res => { console.log(res.data);
            ReactDOM.render(<Home/>, document.getElementById('empview'));
        })
        .catch(err=>{
          console.log(err);
          alert("Errpr : "+err);
        })

        
    }

    /* On 'Back' Button Cick Render Employee Table */
    handleBack()
    {
        ReactDOM.render(<Home/>, document.getElementById('empview'));        
    }

    /* On 'Reset' Button Cick  reset/clear the form fields */
    handleReset (e){
        this.refs.name.value="";
        this.refs.designation.value="";
        this.refs.salary.value="";
    }

    
    /*Renders a form to add Employee details */
    render(){
        return(

            <div className="addEmpForm">       

                <form className="form" method="POST" onSubmit={this.handleSubmit} id="formContact">

                <br/>

                <lable className="addEmpHeading"> <b>  Add Employee  </b> </lable>


                <br/><br/><br/>
 
                <label>Enter Name <span className="required">*</span>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    : </label>
                 <input type="text" onChange={this.handleChangeName} value={this.name} name="name" placeholder="Name" className="txtbox" ref="name" required/><br/><br/>
                <label>Enter Designation <span className="required">*</span> &nbsp;:</label>
                 <input type="text" onChange={this.handleChangeDesignation} name="designation" placeholder="Designation" className="txtbox" ref="designation" required/><br/><br/>
                <label>Enter Salary <span className="required">*</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    :</label>
                 <input type="text" onChange={this.handleChangeSalary} name="salary" placeholder="Salary" className="txtbox" ref="salary" required/><br/><br/><br/>
 
                <button type="submit" name="Save" onClick={this.handleClick} className="buttonsave" >Save</button>
                
                
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button  type="button" onClick={this.handleReset.bind(this)} className="buttonreset">Reset</button>
            
                <button type="button" onClick={this.handleBack.bind(this)} className="buttonback">Back</button>
            
                </form>

            </div>
        )

    }

}
ReactDOM.render(<AddEmployee />, document.getElementById('root'));
export default AddEmployee;