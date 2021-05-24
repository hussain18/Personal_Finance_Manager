import React, { Component} from 'react'
import NavBar from './nav.js'
import {bgColors} from './styles/backgroundColors.js'
import {signup} from '../api.js'

export default class Settings extends Component {
    constructor(props) {
        super(props)

        this.state = {}
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
        event.preventDefault()

        const userData = {
            username: 'username',
            password: 'pass'
        }
        
        signup(userData)
        .then(() => console.log("Submitted"))
    }

    render() {
        return <div className = "container">

            <NavBar signUp = ' active' />

            <h1 className = 'page-title'>Sign Up</h1>

            <form onSubmit={this.handleSubmit} className = "form-floating form-style component-container" >
                <div className = "input-group input-group-lg mb-3 form-floating">
                    <input 
                        className="form-control" 
                        id="floatingInputValue"
                        type='text'
                        name= 'name'
                        value={this.state.name}
                        onChange = {(event) => this.handleInputChange(event)} />
                    
                    <label 
                        htmlFor="floatingInputValue" >
                        Name:  </label>

                </div>
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
                        Username:  </label>

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
                <div className = "input-group input-group-lg mb-3 form-floating">
                    <input 
                        className="form-control" 
                        id="floatingInputValue"
                        type='password'
                        name= 'confirm-password'
                        value={this.state.confirmPassword}
                        onChange = {(event) => this.handleInputChange(event)} />
                    
                    <label 
                        htmlFor="floatingInputValue" >
                        Confirm Password:  </label>

                </div>
                <div className = "input-group input-group-lg mb-3 form-floating">
                    <input 
                        className="form-control" 
                        id="floatingInputValue"
                        type='email'
                        name= 'email'
                        value={this.state.email}
                        onChange = {(event) => this.handleInputChange(event)} />
                    
                    <label 
                        htmlFor="floatingInputValue" >
                        Email  </label>

                </div>

                { this.state.isIncomeRegular ?
                  <div>
                  <div className = "input-group input-group-lg mb-3 form-floating">
                    <input 
                        className="form-control" 
                        id="floatingInputValue"
                        type='number'
                        name= 'incomeAmount'
                        value={this.state.incomeAmount}
                        onChange = {(event) => this.handleInputChange(event)} />
                    
                    <label 
                        htmlFor="floatingInputValue" >
                        Income Amount  </label>

                </div>
                <div className = "input-group input-group-lg mb-3 form-floating">
                    <input 
                        className="form-control" 
                        id="floatingInputValue"
                        type='text'
                        name= 'incomePeriod'
                        value={this.state.incomePeriod}
                        onChange = {(event) => this.handleInputChange(event)} />
                    
                    <label 
                        htmlFor="floatingInputValue" >
                        Income Period  </label>

                </div> 
                </div>: null}

                <div className="form-check">
                    <input 
                            name = "isIncomeRegular"
                            type = 'checkbox'
                            onChange = {(event) => this.handleInputChange(event)}
                            checked = {this.state.isIncomeRegular} 
                            className="form-check-input"
                            id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault" >
                        Regular Income
                    </label>
                </div>

                <button type="submit" className="btn btn-primary mt-3 mb-4">Submit</button>

                <hr/>
                <p>if you already have an account <a href = '/log_in'>click here</a> </p>

            </form>
        
        </div>
    }
}
