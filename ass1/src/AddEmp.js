import React, { Component } from 'react';

import './AddEmp.css';

class AddEmp extends Component{
    constructor() {
        super();
        this.state = {
            word: '',
            new: '',
            designation: '',
        };
    }

    increment() {
        this.setState({
            word: this.state.new,//this.state.word + this.state.new,
            new: '',
        })
    }

    handleChange(value) {
        this.setState({
            word: value
        });
    }
    passwordhandleChange(value) {
        this.setState({
            designation: value
        });
    }
    render(){
        return(
            <div>
                <p>The message is: { this.state.word } </p>
                Name :   <input type="text" value={this.state.word} onChange={(e) =>this.handleChange(e.target.value)} />
                <br/>
                Designation : <input type="text" value={this.state.designation} onChange={(e) =>this.handleChange(e.target.value)} />

                <input type="submit" value="Add Word" onClick={() => this.increment()} />
            </div>

        )
    }

}

export default AddEmp;