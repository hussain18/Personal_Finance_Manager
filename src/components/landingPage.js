import NavBar from './nav.js'

export default function LandingPage(props) {
    return <div className = "container">
        {/* this is only for test (the nav here) */}
        <NavBar 
            profile = ''
            makePlan = ''
            settings = ''
            expenseReport = ''/>


        <p>This is going to be the landing Page</p>
    </div>
}