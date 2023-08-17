import axios from "axios"
import { useContext } from "react"
import { Navbar, Container, Nav, Button } from "react-bootstrap"
import { MyContext } from "../MyContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

function Navigation(){
    //using context to check for user
    const { userInfo } = useContext(MyContext)

    //function to log out user
    async function logout(e) {
        e.preventDefault()
        axios.get(
            'http://localhost:5000/auth/logout',
            { withCredentials: true }
        )
        .then(res => { 
            if(res.data){
                window.location.assign('/')
            }
        })
        .catch(err => console.log(err))
    }

    return(
        <Navbar bg="info" variant="dark" expand="lg" sticky="top">
            <Container className="d-flex justify-space-between">
                <Navbar.Brand href="/">Bloggy</Navbar.Brand>

                {/* collapsible nav menu */}
                <div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav
                            className="me-auto d-flex align-items-center justify-content-center"
                        >
                            <Nav.Link href="/about">Who We Are</Nav.Link>
                            <Nav.Link href="/addblog">Write</Nav.Link>

                            <Nav.Item>
                                {/* conditional rendering of login/account button */}
                                { 
                                userInfo 
                                    ?   
                                    /* if user is logged in, display avatar and link to account */
                                    <div 
                                        style={{display:'flex', alignItems:'center'}}
                                    >
                                        <Nav.Link href="/account">
                                            {/* conditionally rendering avatar or icon */}
                                            {userInfo.avatar
                                                ?
                                                (
                                                    <img 
                                                        style={{ width:'2rem', height:'2rem', borderRadius:'100%' }}
                                                        src={`http://localhost:5000/uploads/${userInfo.avatar}`}
                                                        alt="user avatar" 
                                                    />
                                                )
                                                :
                                                <FontAwesomeIcon 
                                                    icon={faUser} 
                                                    style={{ color:'white', height:'1.5rem', width:'1.5rem' }} 
                                                />
                                            }                                            
                                        </Nav.Link>

                                        {/* Logout button */}
                                        <Button 
                                            variant="danger" 
                                            type='button'
                                            onClick={logout}
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                    :   
                                    /* if no logged in user, links to login and register */
                                    <div style={{ display:'flex' }}>
                                        <Nav.Link href="/login">Login</Nav.Link> 
                                        <Nav.Link href="/register">Register</Nav.Link>
                                    </div>
                                }
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Container>
        </Navbar>
    )
}

export { Navigation }