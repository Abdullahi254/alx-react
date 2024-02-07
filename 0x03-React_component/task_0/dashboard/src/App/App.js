import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import Notifications from '../Notifications/Notifications';
import './App.css';
import PropTypes from 'prop-types';
import { getLatestNotification } from '../utils/utils';

const listCourses = [
	{ id: 1, name: 'ES6', credit: 60 },
	{ id: 2, name: 'Webpack', credit: 20 },
	{ id: 3, name: 'React', credit: 40 },
];

const listNotifications = [
	{ id: 1, type: 'default', value: 'New course available' },
	{ id: 2, type: 'urgent', value: 'New resume available' },
	{ id: 3, type: 'urgent', html: getLatestNotification() },
];

class App extends Component {
	constructor(props) {
		super(props);
		// Bind 'this' to the event handler method
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown);
	}
	handleKeyDown(event) {
		// Check if Ctrl key and H key are pressed down simultaneously
		if (event.ctrlKey && event.key.toLowerCase() === 'h') {
			// Trigger logOut function if it exists
			if (typeof this.props.logOut === 'function') {
				this.props.logOut();
			}
		}
	}
	render() {
		const { isLoggedIn } = this.props
		return (
			<React.Fragment>
				<div className='App'>
					<div className='heading-section'>
						<Notifications listNotifications={listNotifications} />
						<Header />
					</div>
					{isLoggedIn ? <CourseList listCourses={listCourses} /> : <Login />}
					<Footer />
				</div>
			</React.Fragment>
		)
	}
}

App.defaultProps = {
	isLoggedIn: false,
	logOut: () => { }
};

App.propTypes = {
	isLoggedIn: PropTypes.bool,
	logOut: PropTypes.func
};

export default App;
