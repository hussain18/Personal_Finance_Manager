import React, { Component } from 'react';
import NavBar from './nav.js'

///////////////////// STYLINGS \\\\\\\\\\\\\\\\\\\\\
const containerStyle = {
    backgroundColor: 'rgba(16, 77, 8,0.2)',
    padding: 10,
    borderRadius: 30,
    margin: 10,
}

const titleStyle = {
    padding: 10,
    borderRadius: 30,
    margin: 10,
    marginTop: 13,
    fontWeight: 'bold',
}

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

const statusExpandedColors = {
    1: 'rgba(16, 77, 8,0.2)',
    2: 'rgba(112, 185, 43,0.2)',
    3: 'rgba(219, 146, 63,0.2)',
    4: 'rgba(102, 27, 9,0.2)',
}

const statusColors = {
    1: 'rgba(16, 77, 8,0.7)',
    2: 'rgba(112, 185, 43, 0.7)',
    3: 'rgba(219, 146, 63, 0.7)',
    4: 'rgba(245, 61, 14, 0.7)',
}

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
function getStatusColor(expectedExpense, expense, isExpanded) {
    if (!expectedExpense || !expense) return;

    let colors = isExpanded ? statusExpandedColors : statusColors

    if(expense/expectedExpense < 0.5) return colors['1'];
    if(expense/expectedExpense < 0.95) return colors['2'];
    if(expense/expectedExpense < 1) return colors['3'];
    return colors['4'];
}

function getStatusStyle(expectedExpense, expense, isExpanded) {
    let elementStyle = {...containerStyle}
    const statusColor = getStatusColor(expectedExpense, expense, isExpanded)

    elementStyle.backgroundColor = statusColor
    return elementStyle;
}


///////////////////// VIEWS OF EACH REPORT ELEMENT \\\\\\\\\\\\\\\\\\\\\

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

class DaysView extends Component {

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

        const expectedExpense = this.state.data.toBeSpent;
        const expense = this.state.data.totalExpense;
        const style = getStatusStyle(expectedExpense, expense, false);
        const savings = expectedExpense-expense;
        const name = this.state.data.day;
        const expenseOverExpected = expense.toString() + '/' + expectedExpense.toString();

        return this.state.expanded ?
            <div 
                className = "container" 
                style ={style}
                onClick = {() => this.expandToggling()} >
                
                expanded days

            </div> :
            <div 
                className = "container" 
                style ={style}
                onClick = {() => this.expandToggling()} >
                <CompactView name = {name}
                    savings = {savings}
                    expense = {expenseOverExpected} />
            </div>
    }

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

        const expectedExpense = this.state.data.toBeSpent;
        const expense = this.state.data.totalExpense;
        const styleExpanded = getStatusStyle(expectedExpense, expense, true);
        const style = getStatusStyle(expectedExpense, expense, false);
        const savings = expectedExpense-expense;
        const name = this.state.data.name;
        const expenseOverExpected = expense.toString() + '/' + expectedExpense.toString();

        return this.state.expanded ?
            <div 
                className = "container" 
                style ={styleExpanded} >

                <Title 
                    name = {this.state.data.name}
                    fontSize = {25} />
                
                <ul type = 'none' style = {ulStyle}>
                    {this.state.data.days.map((day) => 
                    <DaysView
                        data = {day} /> ) }
                </ul>

                <CollapseButton 
                    onClick = {() => this.expandToggling()} />

            </div> :
            <div 
                className = "container" 
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

        const expectedExpense = this.state.data.toBeSpent;
        const expense = this.state.data.totalExpense;
        const savings = expectedExpense-expense;
        const name = this.state.data.year;
        const expenseOverExpected = expense.toString() + '/' + expectedExpense.toString();
        const styleExpanded = getStatusStyle(expectedExpense, expense, true);

        return this.state.expanded ?
            <div 
                className = "container" 
                style ={styleExpanded} >
                
                <Title 
                    name = {this.state.data.year}
                    fontSize = {25} />
                
                <ul type = 'none' style = {ulStyle}>

                    {this.state.data.months.map((month) => 
                    <MonthsView
                        data = {month} /> ) }
                </ul>

                <CollapseButton onClick = {() => this.expandToggling()}/>

            </div> :
            <div 
                className = "container" 
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
            years: JSON.parse(JSON.stringify(years)),
        };
    }
    
    
    render() {

        const years = this.state.years

        const yearsViewList = years.map((year) => {
            return <li key={years.indexOf(year)} style={{margin: 5}}>
                <YearsView 
                    expanded = {false}
                    data = {year} />
            </li>
        })

        return (
            <div className = "container">
                <NavBar 
                    profile = ''
                    makePlan = ''
                    settings = ''
                    expenseReport = ' active'/>

                <ul type="none" style = {ulStyle}>
                    {yearsViewList}
                </ul>
            
            </div>
        );
    }
}

export default ExpenseReport;