import React, { Component} from 'react'
import NavBar from './nav.js'

const containerStyle = {
    backgroundColor: 'rgba(16, 77, 8,0.2)',
    padding: 30,
    borderRadius: 30,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
}

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

        console.log("Submitted")

        event.preventDefault()
    }

    render() {
        return <div className = "container">

            <NavBar signUp = ' active' />

            <form onSubmit={this.handleSubmit} className = "form-floating" style={containerStyle}>
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
                        value={this.state.password}
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

                <button type="submit" className="btn btn-primary mt-3">Submit</button>

            </form>
        
        </div>
    }
}
