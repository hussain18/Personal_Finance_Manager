import NavBar from './nav.js'
import React from 'react'
import styled from 'styled-components'
import {bgColors, bgColorsMidOp} from './styles/backgroundColors.js'
import ProgressBar from './styles/templates.js'
import {reportReq,authRequest, POST} from '../api.js'



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
    const toSaveToday = props.userData.targetSave || 0
    const toSpendToday = props.userData.toSpendToday
    const todayExpense = props.userData.todayExpenses
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
                <UserImg picture = {props.userImg}/>
                {props.userData.userCompleteName}
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
            picture: 'https://www.jbldrains.com/wp-content/uploads/2015/02/person-icon.png',
            userData: null,
        }
    }

    async componentDidMount() {
        const user = await reportReq('/profile-report')
        const userStatus = this.getStatus(user)
        this.setState({
            userData: user,
            userStatus: userStatus
        })
    }   

    async onSalaryReceiving(salaryAmount) {
        this.setState({
            isNewMonth: false,
            availableAmount: this.state.availableAmount + parseInt(salaryAmount),
        })

        const res = await authRequest('/got-income', POST, {amount: parseInt(salaryAmount)})

        if (!res.success) console.log(res.message)
    }

    getStatus(userData) {
        
        // Getting daily Expense Status
        let dailyExpenseStatus = '1'

        const everydayEx = userData.toSpendToday
        const todayEx = userData.todayExpenses
        const expenseRate = todayEx/everydayEx
        
        if(expenseRate > 1) dailyExpenseStatus = '4';
        else if(expenseRate > 0.66) dailyExpenseStatus = '3';
        else if(expenseRate > 0.33) dailyExpenseStatus = '2';


        // Getting Plan Status
        let planStatus = '1'
        const toSaveToday = userData.targetSave || 0
        const todaySaving = everydayEx - todayEx                                                                
        if(todaySaving < 0) planStatus = '4';
        else if (todaySaving === 0) planStatus = '2';

        // Getting available amount status
        let availableAmountStatus = '1'
        const availableAmount = userData.availableAmount

        if (availableAmount < 50) availableAmountStatus = '4'
        else if (availableAmount < 500) availableAmountStatus = '3'
        else if (availableAmount < 1000) availableAmountStatus = '2'
        
        // Salary Receiving Status
        let salaryStatus = '2'
        if(userData.isIncomeRegular) {
            salaryStatus = '1'
            if (!userData.incomeReceived) 
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

    async onSpend(amount) {

        const prevEx = this.state.todayExpense || 0
        const newExpense = amount === '' ? 0 : parseInt(amount)

        this.setState({
            todayExpense: prevEx + parseInt(newExpense),
            availableAmount: this.state.availableAmount - parseInt(newExpense),
        })

        const res = await authRequest('/spendMoney', POST, {amount: newExpense})

    }

    render() {
        const status = this.state.userStatus

        const user = this.state.userData
        return <div className = "container">
            <NavBar 
                profile = ' active'/>

            {(user === null) ? <p>Loading...</p> : 
            
            <>
                <UserJumbotron 
                    backgroundColorIndex = {status.backgroundColorIndex}
                    userData={user} 
                    style = {status.dailyExpenseStyle}
                    userImg = {this.state.picture}/>

                <p 
                    style = {{backgroundColor: statusColors[status.availableAmountStyle]}}
                    className = 'component-container container-hovered'
                    > 
                    You have {user.availableAmount} Money</p>

                <SingleInput 
                    style = {status.defaultsStyle}
                    onSubmit = {(amount) => this.onSpend(amount)} 
                    inputType = 'number'
                    inputLabel = 'Your Expense Here'
                    inputSubmitLabel = "Spend"

                    />
                
                { !user.incomeReceived ?
                <SingleInput 
                    style = {status.salaryStyle}
                    onSubmit = {(salary) => this.onSalaryReceiving(salary)}
                    inputType = 'number'
                    inputSubmitLabel = 'Received My Salary'
                    defaultValue = {user.isIncomeRegular ? user.incomeAmount : ''} /> :
                    <p 
                        style={{backgroundColor: statusColors[status.salaryStyle]}}
                        className = 'component-container container-hovered'
                        >You have got your Salary</p> }

                <PlanView 
                    style = {status.planStyle}
                    hasPlan = {user.hasPlan}
                    plan = {user.plan}
                    income = {user.income}
                    todayEx = {user.todayExpense} />
            </>}
        </div>
    }
}


