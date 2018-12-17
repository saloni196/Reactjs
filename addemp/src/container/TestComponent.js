import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './TestComponent.css';
import serialize from 'form-serialize';
import restApi from '../rest-api';


class TestComponent extends Component{

    constructor(props) {
        super(props);    

        this.state = {
            name: '',
            designation: '',
            salary:'',
            errorMessage: null,
        };


        // This binding is necessary to make `this` work in the callback
        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (event){

        event.preventDefault();
        var data =  {
          'name': this.state.name,
          'designation': this.state.designation,
          'salary':this.state.salary,
        }


        
        
            const data = serialize(event.target, { hash: true });
        
            restApi.post('/user', data)
              .then(res => {
                // success
              })
              .catch(err => {
                this.setState({ errorMessage: err });
              });
          
        



    }


    /* Reset form fields */
    handleReset (e){
        this.refs.name.value="";
        this.refs.designation.value="";
        this.refs.salary.value="";
    }
    
    render(){
        return(

            <div class="emp">       


             <form className="form" onSubmit={this.handleSubmit} id="formContact">


            <label>Enter Name :</label> <input type="text" name="name" placeholder="Name" ref="name" required/><br/>
            <label>Enter Designation :</label><input type="text" name="designation" placeholder="Designation" ref="designation" required/><br/>
            <label>Enter Salary :</label> <input type="text" name="salary" placeholder="Salary" ref="salary" required/><br/><br/>
            <button type="button" name="Save" onClick={this.handleClick} class="button" >Add Employee</button>
            <button type="reset" onClick={this.handleReset.bind(this)}>Reset</button>
            
            </form>

            </div>
        )


    }

}
ReactDOM.render(<TestComponent />, document.getElementById('root'));
export default TestComponent;