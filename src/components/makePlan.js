import React, { Component } from 'react';
import NavBar from './nav.js'

const containerStyle = {
    backgroundColor: 'rgba(16, 77, 8,0.2)',
    padding: 30,
    borderRadius: 30,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
}

const statusColors = {
    1: 'rgba(16, 77, 8,0.2)',
    2: 'rgba(112, 185, 43,0.2)',
    3: 'rgba(219, 146, 63,0.2)',
    4: 'rgba(102, 27, 9,0.2)',
}

function InvalidFeedBack(props) {
    return <div id="validationServerUsernameFeedback" className="invalid-feedback">
        some message
    </div>
}

class MakePlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: {
                active: false,
                message: '',
            },
            planStatusStyle: {...containerStyle},
            income: 40000,
        };
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    // clear() {
    //     this.setState({
    //         amount: null,
    //         duration: null,
    //     })
    // }

    handleSubmit(event) {
        event.preventDefault()
        
        const amount = parseInt(this.state.amount)
        const duration = parseInt(this.state.duration)
        const income = this.state.income
        let dangerStyle = {...this.state.planStatusStyle}
        dangerStyle.backgroundColor = statusColors['4']
        
        if(amount && duration) {
            if (income - amount/duration <= 1000) {
                this.setState({
                    alert: {
                        active: true,
                        message: 'You cannot save more than your income in a month',
                    },
                    planStatusStyle: dangerStyle
                })
                return;
                
            } else {
                this.setState({
                    alert: {
                        active: false,
                        message: '',
                    },
                    planStatusStyle: {...containerStyle}
                })
            }
        } else {
            
            // give message
            
            this.setState({
                alert: {
                    active: true,
                    message: 'Please fill all the fields',
                },
                planStatusStyle: dangerStyle
            })
            
            return;
        }
        
        
        console.log("Submitted")
        
        // After submission clear the inputs A PROBLEM TO BE SOLVED
        // this.clear();
        
        console.log(this.state) //test...
        
    }

    render() {
        return (
            <div className="container">
                <NavBar 
                    profile = ''
                    makePlan = ' active'
                    settings = ''
                    expenseReport = ''/>

                {this.state.alert.active ? 
                    <div className="alert alert-danger" role="alert">
                    {this.state.alert.message}
                  </div>: null}

                <form onSubmit={(event) => this.handleSubmit(event)} className = "form-floating" style ={this.state.planStatusStyle}>
                    <div className = "input-group input-group-lg mb-3 has-validation form-floating">
                        <input 
                            className="form-control" 
                            id="floatingInputValue"
                            type='number'
                            name= 'amount'
                            value={this.state.name}
                            onChange = {(event) => this.handleInputChange(event)} />
                        
                        <label 
                            htmlFor="floatingInputValue" >
                            Saving Amount:  </label>
                        
                        <InvalidFeedBack  
                            message = "Above field cannot be empty"/>
                        
                        {/* {this.state.noAmount ? <InvalidFeedBack  
                            message = "Above field cannot be empty"/>: null } */}

                    </div>
                    <div className = "input-group input-group-lg has-validation mb-3 form-floating ">
                        <input 
                            className="form-control" 
                            id="floatingInputValue"
                            type='number'
                            name= 'duration'
                            value={this.state.username}
                            onChange = {(event) => this.handleInputChange(event)} />
                        <label 
                            htmlFor="floatingInputValue" >
                            Duration in Months  </label>
                        
                        {!this.state.isPlanValid && <InvalidFeedBack 
                            message = 'You Cannot save more than your income in a month' />}

                    </div>

                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                
                </form>            
            </div>
        );
    }
}

export default MakePlan;


