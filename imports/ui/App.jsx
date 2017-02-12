import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../api/messages.js';

import Message from './Message.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Messages.insert({
            text,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),           // _id of logged in user
            username: Meteor.user().username,  // username of logged in user
        });

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    renderMessages() {
        return this.props.messages.map((message) => (
            <Message key={message._id} message={message} />
        ));
    }

    render() {
        return (
            <div className="container">
                <div className="navbar-fixed">
                    <nav>
                        <div className="nav-wrapper">
                            <a href="#" className="brand-logo center">Wessel en Nadia chat</a>
                            <AccountsUIWrapper />
                            <ul id="nav-mobile" className="right hide-on-med-and-down">

                            </ul>
                        </div>
                    </nav>
                </div>
                <main>
                <ul className="collection">
                    {this.renderMessages()}
                </ul>

                
                </main>
                <footer className="page-footer">
                    <form className="col s12" onSubmit={this.handleSubmit.bind(this)} >
                    <div className="row">
                        <div className="input-field col s8">
                            <input
                                type="text"
                                ref="textInput"
                                placeholder="message"
                            />
                        </div>
                        <div className="col s3">
                            <button className="btn waves-effect waves-light" style={{ 'marginTop': '1rem' }} type="submit" name="action">Submit</button>
                        </div>
                    </div>
                </form>
                </footer>

            </div>
        );
    }
}

App.propTypes = {
    messages: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    return {
        messages: Messages.find({}).fetch(),
    };
}, App);