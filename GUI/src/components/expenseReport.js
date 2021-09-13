import React, { Component } from 'react';
import NavBar from './nav.js'
import {bgColors, bgColorsFullOp} from './styles/backgroundColors.js'
import {reportReq} from '../api'

///////////////////// STYLINGS \\\\\\\\\\\\\\\\\\\\\
const ulStyle = {
    padding: 0,
    marginRight: 20,
}

const collapseButtonStyle = {
    paddingTop: 1,
    paddingBottom: 1,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
}

const statusExpandedColors = {...bgColors}

const statusColors = {...bgColorsFullOp}

///////////////////// DATA COMING FROM DATABASE \\\\\\\\\\\\\\\\\\\\\
const days = [
    {
        day: 1,
        totalExpense: 15500,
        toBeSpent: 16000,
        availibleAmount: 41000,
    }, 
    {
        day: 2,
        totalExpense: 10000,
        toBeSpent: 16000,
        availibleAmount: 41000,
    },
    {
        day: 3,
        totalExpense: 10000,
        toBeSpent: 16000,
        availibleAmount: 41000,
    },
    {
        day: 4,
        totalExpense: 16100,
        toBeSpent: 16000,
        availibleAmount: 41000,
    },
    {
        day: 5,
        totalExpense: 10000,
        toBeSpent: 16000,
        availibleAmount: 41000,
    },
    {
        day: 6,
        totalExpense: 16100,
        toBeSpent: 16000,
        availibleAmount: 41000,
    },
    {
        day: 7,
        totalExpense: 10000,
        toBeSpent: 16000,
        availibleAmount: 41000,
    },
    {
        day: 8,
        totalExpense: 10000,
        toBeSpent: 16000,
        availibleAmount: 41000,
    },
    {
        day: 9,
        totalExpense: 10000,
        toBeSpent: 16000,
        availibleAmount: 41000,
    },
    {
        day: 11,
        totalExpense: 10000,
        toBeSpent: 16000,
        availibleAmount: 41000,
    },
]

const months = [
    {
        name: 'January',
        totalExpense: 39000,
        toBeSpent: 40000,
        availableAmount: 50000,
        days: JSON.parse(JSON.stringify(days))
    },
    {
        name: 'February',
        totalExpense: 39000,
        toBeSpent: 40000,
        availableAmount: 490000,
        days: JSON.parse(JSON.stringify(days))
    },
    {
        name: 'March',
        totalExpense: 41000,
        toBeSpent: 40000,
        availableAmount: 410000,
        days: JSON.parse(JSON.stringify(days))
    },
    {
        name: 'April',
        totalExpense: 30000,
        toBeSpent: 40000,
        availableAmount: 40000,
        days: JSON.parse(JSON.stringify(days))
    },
]

const years = [
    {
        year: 2020,
        totalExpense: 391000,
        toBeSpent: 491000,
        months: JSON.parse(JSON.stringify(months))
    },
    {
        year: 2021,
        totalExpense: 391000,
        toBeSpent: 491000,
        months: JSON.parse(JSON.stringify(months))
    }
]

////////////////////// UTILITY FUNCTIONS \\\\\\\\\\\\\\\\\\\\\\\\\
function getStatusColor(expectedExpense, expense) {
    if (!expectedExpense || !expense) return '1';

    if(expense/expectedExpense < 0.5) return '1';
    if(expense/expectedExpense < 0.95) return '2';
    if(expense/expectedExpense < 1) return '3';
    
    return '4';
}

function getStatusStyle(expectedExpense, expense, isExpanded) {
    const colorIndex = getStatusColor(expectedExpense, expense)
    var style = {
        paddingRight: 40,
        paddingLeft: 40,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 5,
        backgroundColor: statusExpandedColors[colorIndex],
        //...
    }

    if(!isExpanded) style.backgroundColor = statusColors[colorIndex]

    return style
}


///////////////////// VIEWS OF EACH REPORT ELEMENT \\\\\\\\\\\\\\\\\\\\\
//TODO: Make views expand softly 
function ListTitle(props) {
    return <div className="component-container container-hovered fs-4"
        style={{
            backgroundColor: 'gray',
            fontWeight: 'bold',
            paddingTop: 15,
            paddingBottom: 15,
        }} >
        
        <CompactView 
            name = {props.name}
            savings = 'Savings'
            expense = 'Expense' />

    </div>
}

function Title(props) {

    return <h1 style = {{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: props.fontSize,
    }}>{props.name}</h1>

}

function CollapseButton(props) {

    return <div className = "d-grid gap-2">
        <button
            onClick = {() => props.onClick()}
            style = {collapseButtonStyle}
            type="button"
            className = "btn btn-outline-success "
            >&#x39B;</button>
    </div>

}

function CompactView(props) {
    return <div className="row">
        <div className = "col-sm" style= {{fontWeight: 'bold'}}>
            {props.name}
        </div>
        <div className="col-sm">
            {props.savings}
        </div>
        <div className="col-sm" style = {{textAlign: 'right'}} >
            {props.expense}
        </div>
    </div>
}

function YearsViewList(props) {
    return props.list.map((year) => {
        return <li key={props.list.indexOf(year)} style={{margin: 5}}>
            <YearsView 
                expanded = {false}
                data = {year} />
        </li>
    })
}

function DaysView(props) {

    const day = props.data
    const expectedExpense = day.income;
    const expense = day.expense;
    const style = getStatusStyle(expectedExpense, expense, false);
    const savings = day.saving;
    const name = day.day;
    const expenseOverExpected = expense.toString() + '/' + expectedExpense.toString();

    return <div 
        className = "component-container container-hovered" 
        style ={style} >
        <CompactView name = {name}
            savings = {savings}
            expense = {expenseOverExpected} />
    </div>
}

class MonthsView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
            data: props.data,
        }
    }

    expandToggling() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {

        const expectedExpense = this.state.data.income;
        const expense = this.state.data.expense;
        const styleExpanded = getStatusStyle(expectedExpense, expense, true);
        const style = getStatusStyle(expectedExpense, expense, false);
        const savings = this.state.data.saving;
        const name = this.state.data.name;
        const expenseOverExpected = expense.toString() + '/' + expectedExpense.toString();

        return this.state.expanded ?
            <div 
                className = "component-container" 
                style ={styleExpanded} >

                <Title 
                    name = {this.state.data.name}
                    fontSize = {25} />
                
                <ul type = 'none' style = {ulStyle}>

                    <ListTitle name = 'Day' />

                    {this.state.data.days.map((day) => 
                    <DaysView
                        data = {day} /> ) }
                </ul>

                <CollapseButton 
                    onClick = {() => this.expandToggling()} />

            </div> :
            <div 
                className = "component-container container-hovered" 
                style ={style}
                onClick = {() => this.expandToggling()} >
                <CompactView name={name}
                    savings = {savings}
                    expense = {expenseOverExpected} />
            </div>
    }

}

class YearsView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
            data: props.data,
        }
    }

    expandToggling() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {

        const data = this.state.data;
        const expectedExpense = data.income;
        const expense = data.expense;
        const savings = data.saving;
        const name = data.name;
        const expenseOverExpected = expense.toString() + '/' + expectedExpense.toString();
        const styleExpanded = getStatusStyle(expectedExpense, expense, true);

        return this.state.expanded ?
            <div 
                className = "component-container container-hovered" 
                style ={styleExpanded} >
                
                <Title 
                    name = {name}
                    fontSize = {25} />
                
                <ul type = 'none' style = {ulStyle}>

                    <ListTitle name='Month' />

                    {data.months.map((month) => 
                    <MonthsView
                        data = {month}/> ) }
                </ul>

                <CollapseButton onClick = {() => this.expandToggling()}/>

            </div> :
            <div 
                className = "component-container container-hovered" 
                style ={styleExpanded}
                onClick = {() => this.expandToggling()} >

                <CompactView name = {name}
                    savings = {savings}
                    expense = {expenseOverExpected} />
            </div>
    }

}

class ExpenseReport extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            years: null,
        };
    }

    async componentDidMount() {
        const years = await reportReq('/expense-report');
        this.setState({
            years: years
        })
    }
    
    
    render() {

        const years = this.state.years

        return (
            <div className = "container">
                <NavBar 
                    expenseReport = ' active'/>

                <h1 className = 'page-title'>Expense Report</h1>

                <ul type="none" style = {ulStyle}>
                    {(years === null)? <p>Loading....</p>: // TODO: make it more of a loading style :[
                        <YearsViewList list = {years} />}
                </ul>
            
            </div>
        );
    }
}

export default ExpenseReport;