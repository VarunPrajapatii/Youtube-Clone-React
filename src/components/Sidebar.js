import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const isMenuOpen = useSelector(store => store.app.isMenuOpen);
    if(!isMenuOpen) return null;            //This type of coding pattern is known as early return pattern.

    return (
        <div className='p-5 shadow-lg w-48'>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li>Shorts</li>
                <li>Subscriptions</li>
                <li>Youtube Music</li>
            </ul>

            <h1 className='font-bold pt-4'>You</h1>
            <ul>
                <li>Your Channel</li>
                <li>History</li>
                <li>Your videos</li>
                <li>Watch later</li>
            </ul>

            <h1 className='font-bold pt-4'>Subscriptions</h1>
            <ul>
                <li>Music</li>
                <li>Sports</li>
                <li>Movies</li>
                <li>Gaming</li>
            </ul>
        </div>
    )
}

export default Sidebar
