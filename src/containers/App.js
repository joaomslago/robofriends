import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css'
import ErrorBoundry from '../components/ErrorBoundry';
import { setSearchfield, requestRobots } from '../actions'

const mapStateToProps = state => {
    return {
        searchfield: state.searchRobots.searchfield,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchfield(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

function App() {
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => { setRobots(users) });
    }, [])

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length ?
        <h1>Loading</h1> :
        (
            <div className='tc'>
                <h1 className='f 1'>RobotFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry >
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);