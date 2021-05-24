import './style.css'

// Images paths
const add_img = require('../img/add_img.png').default
const plan_img = require('../img/plan_img.png').default
const manage_img = require('../img/manage_img.png').default
const team_member_img = require('../img/team_member_img.png').default
const phone_img = require('../img/phone_img.png').default
const email_img = require('../img/email_img.png').default
const address_img = require('../img/address_img.png').default

// NON-Authorized link
const NON_AUTH_LINK = '/'

console.log(add_img)

// Utility Views
function GetStartedButton(props) {
    return <a className ='btn btn-primary btn-lg mt-2' 
        href="/sign_up" >
        {props.content}
    </a>
}

function Card(props) {
    const img = props.img || "some img"
    const content = props.content || "some content"

    return <>
        <img src = {img} className='rounded card-img' alt = "a png"/>
        <hr/>
        <p className = 'fs-5 font-monospace'>{content}</p>
    </>
}

function Row(props) {

    const col_1 = props.col_1 || "Empty Column ..."
    const col_2 = props.col_2 || "Empty Column ..."
    const col_3 = props.col_3 || "Empty Column ..."

    return <div className = "row align-content-center">
        <div className = 'col text-center'>
            {col_1}
        </div>

        <div className = 'col text-center'>
            {col_2}
        </div>

        <div className = 'col text-center'>
            {col_3}
        </div>
    </div>
}

// Main Views
function GettingStartedView(props) {

    const buttonContent = props.auth ? 'To Your Profile...' : 'Get Started...'
    const link = true ? '/profile' : '/sign_up'

    return <div 
        className="getting-started-container 
            hovered">

        <div className = 'text-box'>
            <h1 className='fs-1 fw-bolder '>Personal Finance Manger</h1>
            <hr className='mb-5'/>
            <p >Make it easy to manage the pocket</p>
            <GetStartedButton 
                content = {buttonContent}
                link = {link} />
        </div>

    </div>
}

function AboutAppView(props) {
    return <div className = 'about-app-b landing-components hovered'>
        <div className = 'text-box'>
            <h1 className = 'landing-title'>About App</h1>
            <Row 
                col_1 = {<Card img = {add_img} content = 'Add it (expense/income)'/>}
                col_2 = {<Card img = {plan_img} content = 'Create a saving plan'/>}
                col_3 = {<Card img = {manage_img} content = 'We manage all your personal finance'/>} />
        </div>
    </div>
}

function OurTeamView(props) {
    return <div className = 'our-team-b landing-components hovered'>
        <div className = 'text-box'>
            <h1 className = 'landing-title'>Our Team</h1>
            <Row 
                col_1 = {<Card img = {team_member_img} content = 'Talib Hussain Naseri'/>}
                col_2 = {<Card img = {team_member_img} content = 'Shantanu Suntake'/>}
                col_3 = {<Card img = {team_member_img} content = 'Adarsh Kadewar'/>} />
        </div>
    </div>
}

function ContactUsView(props) {
    return <div className = 'contact-us-b landing-components hovered'>
        <div className = 'text-box'>
            <h1 className='landing-title' >Contact Us</h1>
            <Row 
                col_1 = {<Card img = {phone_img} content = '(+91) 9158798418'/>}
                col_2 = {<Card img = {email_img} content = 'personal_f_m@gmail.com'/>}
                col_3 = {<Card img = {address_img} content = 'VIT, Pune, Maharashtra, India'/>} />
        </div>
    </div>
}

// Exported 
export default function LandingPage(props) {

    return <div className = "container">

        <GettingStartedView auth = {props.auth} />
        <AboutAppView auth = {props.auth} />
        <OurTeamView auth = {props.auth} />
        <ContactUsView auth = {props.auth} />

    </div>
}
