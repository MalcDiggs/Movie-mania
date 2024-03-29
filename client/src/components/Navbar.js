import React, { useState } from 'react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

const AppNavbar = () => {
    // set modal display state
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
                <Navbar.Brand as={Link} to='/'>
                    FANTINDER
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar' />
                <Navbar.Collapse id='navbar'>
                    <Nav className='ml-auto'>
                        <Nav.Link as={Link} to='/search'>
                            Search For Movies
                        </Nav.Link>
                        {/* if user is logged in show saved movies and logout */}
                        {Auth.loggedIn() ? (
                            <>
                                <Nav.Link as={Link} to='/saved'>
                                    Saved Movies
                                </Nav.Link>
                                <Nav.Link onClick={Auth.logout}>
                                    Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <Nav.Link onClick={() => setShowModal(true)}>
                                Login/Sign Up
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/* set modal data up */}
            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby='signup-modal'>
                {/* tab container to do either signup or login component */}
                <Tab.Container defaultActiveKey='login'>
                    <Modal.Header closeButton>
                        <Modal.Title id='signup-modal'>
                            <Nav variant='pills'>
                                <Nav.Item>
                                    <Nav.Link eventKey='login'>Login</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tab.Content>
                            <Tab.Pane eventKey='login'>
                                <LoginForm handleModalClose={() => setShowModal(false)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey='signup'>
                                <SignUpForm handleModalClose={() => setShowModal(false)} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Modal.Body>
                </Tab.Container>
            </Modal>
        </>
    );
};

export default AppNavbar;