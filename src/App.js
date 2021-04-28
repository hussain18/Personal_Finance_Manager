// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import LandingPage from './components/landingPage.js'
import UserProfile from './components/userProfile.js'
import Settings from './components/settings.js'
import MakePlan from './components/makePlan.js'
import ExpenseReport from './components/expenseReport.js'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login  from './components/login.js'
import Signup from './components/signUp.js'


function App(props) {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component={LandingPage} />
        <Route path = "/profile" component={UserProfile} />
        <Route path = "/settings" component={Settings} />
        <Route path = "/expense_report" component={ExpenseReport} />
        <Route path = "/make_plan" component={MakePlan} />
        <Route path = "/log_in" component={Login} />
        <Route path = "/sign_up" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
