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

            <NavBar logIn = ' active' />

            <form onSubmit={this.handleSubmit} className = "form-floating" style={containerStyle}>
                
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
