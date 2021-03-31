
function NavBar(props) {

    const profile = props.profile || ''
    const makePlan = props.makePlan || ''
    const settings = props.Settings || ''
    const expenseReport = props.expenseReport || ''
    const logIn = props.logIn || ''
    const signUp = props.signUp || ''

    return <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className={"nav-link" + profile} href="/profile">Profile</a>
                </li>
                <li className="nav-item">
                <a className={"nav-link" + makePlan} href="/make_plan">Make Plan</a>
                </li>
                <li className="nav-item">
                <a className={"nav-link" + settings} href="/settings">settings</a>
                </li>
                <li className="nav-item">
                <a className={"nav-link" + expenseReport} href="/expense_report">Expense Report</a>
                </li>
                <li className="nav-item">
                <a className={"nav-link" + logIn} href="/log_in">Log In</a>
                </li>
                <li className="nav-item">
                <a className={"nav-link" + signUp} href="/sign_up">Sign Up</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>

}


export default NavBar;