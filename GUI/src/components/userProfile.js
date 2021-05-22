import NavBar from './nav.js'
import React from 'react'
import styled from 'styled-components'
import {bgColors, bgColorsMidOp} from './styles/backgroundColors.js'
import ProgressBar from './styles/templates.js'



//////////////////////// STYLES \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ 
const statusColors = {...bgColors}

const progressBarColors = {...bgColorsMidOp}

let userImgStyle = {
    height: 100,
    width: 100,
    borderRadius: 90,
}

//////////////////////// VIEWS \\\\\\\\\\\\\\\\\\\\\\\\
const ProgressBarFiller = styled.div`
    width: ${props => props.width}%;
    padding: 2%;
    border-radius: 15px;

`

function UserImg(props) {
    return <img src = {props.picture} style={userImgStyle} alt="person img"/>
}

class SingleInput extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {value: undefined};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let defaultValue = this.props.defaultValue ? this.props.defaultValue : ''
        this.setState({
            value: defaultValue
        })
    }
  
    handleChange(event) {
        this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      this.props.onSubmit(this.state.value)
      this.setState({
        value: ''
      })
      event.preventDefault();
    }
  
    render() {

        const componentStyle = {
            backgroundColor: statusColors[this.props.style]
            //...
        }

      return (
        <form onSubmit={this.handleSubmit} style={componentStyle} 
            className='component-container container-hovered' >
            <div className = 'input-group '>
                <input 
                    className='form-control'
                    aria-label="Recipient's username" 
                    aria-describedby="button-addon2"
                    type={this.props.inputType} 
                    min={0}
                    value={this.state.value} 
                    onChange={this.handleChange} 
                    placeholder={this.props.inputLabel}/>

                <input 
                    className = 'btn btn-outline-secondary'
                    type="submit" 
                    value={this.props.inputSubmitLabel} />
            </div>
        </form>
      );
    }
}

function UserJumbotron(props) {
    const toSaveToday = props.userData.hasPlan? props.userData.plan.amount/(props.userData.plan.duration * 30) : 0
    const toSpendToday = props.userData.income/30-toSaveToday
    const todayExpense = props.userData.todayExpense
    const expensePercentage = () => {
        let percentage = (todayExpense*95)/toSpendToday
        percentage = percentage > 100 ? 100 : percentage
        percentage = percentage < 0 ? 0 : percentage
        return percentage
    }

    // Creating style of progress bar filler
    var componentStyle = {
        backgroundColor: statusColors[props.style]
    }

    var progressBarBackground = progressBarColors[props.style]
    

    return <div style={componentStyle} className="component-container container-hovered" >
            <h1 className="display-4" >
                <UserImg picture = {props.userData.picture}/>
                {props.userData.userName}
            </h1>
            <p className="lead">You have spent {todayExpense} out of {toSpendToday}</p>
            
            <ProgressBar
                background = {progressBarBackground}
                width = {expensePercentage()} />
        </div>
}

function PlanView(props) {
    const toSaveToday = props.hasPlan? props.plan.amount/(props.plan.duration * 30) : 0
    const todaySaving = props.income/30 - props.todayEx

    var componentStyle = {
        backgroundColor: statusColors[props.style]
        // Can add more styles...
    }

    return  props.hasPlan ? 
        <div style={componentStyle} className = 'component-container container-hovered'>
            <p>Your plan is to save {props.plan.amount} in {props.plan.duration} months</p>
            <p>Today you have saved: {todaySaving}</p>
            <p>Target saving for today: {toSaveToday}</p>
        </div> :

        <div style={componentStyle} className = 'component-container container-hovered'>
            <p>You have no plans <a href = "#">Click Here</a> to Create one</p>
        </div>
}

export default class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: 'Sagar Sikchi',
            picture: 'https://www.jbldrains.com/wp-content/uploads/2015/02/person-icon.png',
            hasPlan: true,
            income: 420000,
            availableAmount: 20000,
            plan: {
                amount: 90000,
                duration: 3,
            },
            isNewMonth: true,
            isIncomeRegular: true,
            todayExpense: 0,
        }
    }

    onSalaryReceiving(salaryAmount) {
        this.setState({
            isNewMonth: false,
            availableAmount: this.state.availableAmount + parseInt(salaryAmount),
        })
    }

    getStatus() {
        
        // Getting daily Expense Status
        let dailyExpenseStatus = '1'

        const everydayEx = this.state.income/30
        const todayEx = this.state.todayExpense
        const expenseRate = todayEx/everydayEx
        
        if(expenseRate > 1) dailyExpenseStatus = '4';
        else if(expenseRate > 0.66) dailyExpenseStatus = '3';
        else if(expenseRate > 0.33) dailyExpenseStatus = '2';


        // Getting Plan Status
        let planStatus = '1'
        const toSaveToday = this.state.hasPlan? this.state.plan.amount/(this.state.plan.duration * 30) : 0
        const todaySaving = everydayEx - todayEx                                                                
        if(todaySaving < 0) planStatus = '4';
        else if (todaySaving === 0) planStatus = '2';

        // Getting available amount status
        let availableAmountStatus = '1'
        const availableAmount = this.state.availableAmount

        if (availableAmount < 50) availableAmountStatus = '4'
        else if (availableAmount < 500) availableAmountStatus = '3'
        else if (availableAmount < 1000) availableAmountStatus = '2'
        
        // Salary Receiving Status
        let salaryStatus = '2'
        if(this.state.isIncomeRegular) {
            salaryStatus = '1'
            if (this.state.isNewMonth) 
                salaryStatus = '3'; 
        } 

        return {
            dailyExpenseStyle: dailyExpenseStatus,
            planStyle: planStatus,
            availableAmountStyle: availableAmountStatus,
            salaryStyle: salaryStatus,
            defaultsStyle: '1',
        }
    }

    onSpend(amount) {

        const prevEx = this.state.todayExpense || 0
        const newExpense = amount === '' ? 0 : parseInt(amount)

        this.setState({
            todayExpense: prevEx + parseInt(newExpense),
            availableAmount: this.state.availableAmount - parseInt(newExpense),
        })
    }

    render() {
        const status = this.getStatus()

        return <div className = "container">
            <NavBar 
                profile = ' active'/>

            <UserJumbotron 
                backgroundColorIndex = {status.backgroundColorIndex}
                userData={this.state} 
                style = {status.dailyExpenseStyle}/>

            <p 
                style = {{backgroundColor: statusColors[status.availableAmountStyle]}}
                className = 'component-container container-hovered'
                > 
                You have {this.state.availableAmount} Money</p>

            <SingleInput 
                style = {status.defaultsStyle}
                onSubmit = {(amount) => this.onSpend(amount)} 
                inputType = 'number'
                inputLabel = 'Your Expense Here'
                inputSubmitLabel = "Spend"

                />
            
            {this.state.isNewMonth ?
            <SingleInput 
                style = {status.salaryStyle}
                onSubmit = {(salary) => this.onSalaryReceiving(salary)}
                inputType = 'number'
                inputSubmitLabel = 'Recieved My Salary'
                defaultValue = {this.state.isIncomeRegular ? this.state.income : ''} /> :
                <p 
                    style={{backgroundColor: statusColors[status.salaryStyle]}}
                    className = 'component-container container-hovered'
                    >You have got your Salary</p> }

            <PlanView 
                style = {status.planStyle}
                hasPlan = {this.state.hasPlan}
                plan = {this.state.plan}
                income = {this.state.income}
                todayEx = {this.state.todayExpense} />
            
        </div>
    }

}


