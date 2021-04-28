import NavBar from './nav.js'
import React from 'react'



//////////////////////// STYLES \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ 
const statusColors = {
    1: 'rgba(16, 77, 8,0.2)',
    2: 'rgba(112, 185, 43,0.2)',
    3: 'rgba(219, 146, 63,0.2)',
    4: 'rgba(102, 27, 9,0.2)',
}


let userImgStyle = {
    height: 100,
    width: 100,
    borderRadius: 90,
}

let containerStyle = {
    backgroundColor: 'rgba(0,0,0,0.099999',
    padding: 17,
    borderRadius: 30,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
}

let pageStyle = {
    paddingTop: 20,
}


//////////////////////// VIEWS \\\\\\\\\\\\\\\\\\\\\\\\
function UserImg(props) {
    return <img src = {props.picture} style={userImgStyle} alt="person img"/>
}

class SingleInput extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {value: ''};

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
      return (
        <form onSubmit={this.handleSubmit} style={this.props.style}>
            <div className = 'input-group '>
                <input 
                    className='form-control'
                    aria-label="Recipient's username" 
                    aria-describedby="button-addon2"
                    type={this.props.inputType} 
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
    // alert(props.hasPlan)

    const toSaveToday = props.userData.hasPlan? props.userData.plan.amount/(props.userData.plan.duration * 30) : 0

    return <div style={props.style}>
            <h1 className="display-4" >
                <UserImg picture = {props.userData.picture}/>
                {props.userData.userName}
            </h1>
            <p className="lead">You have spent {props.userData.todayExpense} out of {props.userData.income/30-toSaveToday}</p>
        </div>
}

function PlanView(props) {
    const toSaveToday = props.hasPlan? props.plan.amount/(props.plan.duration * 30) : 0
    const todaySaving = props.income/30 - props.todayEx
    return  props.hasPlan ? 
        <div style={props.style}>
            <p>Your plan is to save {props.plan.amount} in {props.plan.duration} months</p>
            <p>Today you have saved: {todaySaving}</p>
            <p>Target saving for today: {toSaveToday}</p>
        </div> :

        <div style={containerStyle}>
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
        let dailyExpenseStatus = {
            ...containerStyle
        }

        const everydayEx = this.state.income/30
        const todayEx = this.state.todayExpense
        
        if(todayEx/everydayEx < 0.5) {
            dailyExpenseStatus.backgroundColor = statusColors['1']
        } else if (todayEx/everydayEx < 0.8) {
            dailyExpenseStatus.backgroundColor = statusColors['2']
        } else if(todayEx/everydayEx < 1) {
            dailyExpenseStatus.backgroundColor = statusColors['3']
        } else {
            dailyExpenseStatus.backgroundColor = statusColors['4']
        }


        // Getting Plan Status
        let planStatus = {
            ...containerStyle
        }
        const toSaveToday = this.state.hasPlan? this.state.plan.amount/(this.state.plan.duration * 30) : 0
        const todaySaving = everydayEx - todayEx                                                                
        if((todaySaving - toSaveToday) > 0) {
            planStatus.backgroundColor = statusColors['1']
        } else if ((todaySaving - toSaveToday) === 0) {
            planStatus.backgroundColor = statusColors['2']
        } else {
            planStatus.backgroundColor = statusColors['4']
        }

        // Getting available amount status
        let availableAmountStatus = {...containerStyle}
        const availableAmount = this.state.availableAmount

        if (availableAmount > 1000) {
            availableAmountStatus.backgroundColor = statusColors['1']
        } else if (availableAmount > 500){
            availableAmountStatus.backgroundColor = statusColors['2']
        } else if (availableAmount > 10) {
            availableAmountStatus.backgroundColor = statusColors['3']
        } else {
            availableAmountStatus.backgroundColor = statusColors['4']
        }

        // Salary Receiving Status
        let salaryStatus = {...containerStyle}
        if(this.state.isIncomeRegular) {
            if (this.state.isNewMonth) {
                salaryStatus.backgroundColor = statusColors['3']
            } else {
                salaryStatus.backgroundColor = statusColors['1']
            }
        } 

        return {
            dailyExpenseStyle: dailyExpenseStatus,
            planStyle: planStatus,
            availableAmountStyle: availableAmountStatus,
            salaryStyle: salaryStatus,
            defaultsStyle: {...containerStyle}
        }
    }

    onSpend(amount) {

        const prevEx = this.state.todayExpense

        this.setState({
            todayExpense: prevEx + parseInt(amount),
            availableAmount: this.state.availableAmount - parseInt(amount),
        })
    }

    render() {
        return <div className = "container">
            <NavBar 
                profile = ' active'/>

            <UserJumbotron 
                userData={this.state} 
                style = {this.getStatus().dailyExpenseStyle}/>

            <p 
                style = {this.getStatus().availableAmountStyle}> 
                You have {this.state.availableAmount} Money</p>

            <SingleInput 
                style = {this.getStatus().defaultsStyle}
                onSubmit = {(amount) => this.onSpend(amount)} 
                inputType = 'number'
                inputLabel = 'Your Expense Here'
                inputSubmitLabel = "Spend"

                />
            
            {this.state.isNewMonth ?
            <SingleInput 
                style = {this.getStatus().salaryStyle}
                onSubmit = {(salary) => this.onSalaryReceiving(salary)}
                inputType = 'number'
                inputSubmitLabel = 'Recieved My Salary'
                defaultValue = {this.state.isIncomeRegular ? this.state.income : ''} /> :
                <p style={this.getStatus().salaryStyle}>You have got your Salary</p> }

            <PlanView 
                style = {this.getStatus().planStyle}
                hasPlan = {this.state.hasPlan}
                plan = {this.state.plan}
                income = {this.state.income}
                todayEx = {this.state.todayExpense} />
            
        </div>
    }

}



// DONE
// 7. Profile Page
// 	i. Name 
// 	ii. picture
// 	iii. status of plan (if exist)/none plan
// 	iv. expense input
// 	v. recieved confirming input (in case of first of months of regular income)
// 	vi. recieved income amount input (in case of non-regular income)