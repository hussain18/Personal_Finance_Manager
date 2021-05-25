import React, { Component} from 'react'
import {Redirect} from 'react-router-dom'
import {login} from '../api'
import NavBar from './nav.js'


export default class Settings extends Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.handleChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {

        const userData = this.state
        login(userData).then(() => window.location.reload())

        event.preventDefault()
    }

    render() {
        return <div className = "container">

            <NavBar logIn = ' active' />

            <h1 className = 'page-title'>Login</h1>

            <form onSubmit={this.handleSubmit} className = "form-floating form-style component-container">
                
                <div className = "input-group input-group-lg mb-3 form-floating">
                    <input 
                        className="form-control" 
                        id="floatingInputValue"
                        type='text'
                        name= 'username'
                        value={this.state.username}
                        onChange = {(event) => this.handleInputChange(event)} />
                    
                    <label 
                        htmlFor="floatingInputValue" >
                        Username/Email:  </label>

                </div>
                <div className = "input-group input-group-lg mb-3 form-floating">
                    <input 
                        className="form-control" 
                        id="floatingInputValue"
                        type='password'
                        name= 'password'
                        value={this.state.password}
                        onChange = {(event) => this.handleInputChange(event)} />
                    
                    <label 
                        htmlFor="floatingInputValue" >
                        Password:  </label>

                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>

            </form>
        
        </div>
    }
}
