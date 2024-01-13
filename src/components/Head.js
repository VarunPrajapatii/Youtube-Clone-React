import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice';

const Head = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchCache = useSelector((store) => store.search);

    useEffect(() => {
        // make an api call after every key press but if difference between
        // 2 Api calls is <200ms decline the API call
        const timer = setTimeout(() => { 
            if(searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            } else {
                getSearchSuggestions();
            }
        }, 200);

        // so when we hit a key before 200ms then again reconciliation triggers
        // then it has to clear things up, so this function return wala will called when the component is unmounted
        return () => {
            clearTimeout(timer);
        };
            
    }, [searchQuery]);

    /** key- i
     * - render the component
     * - useEffect();
     * start timer => make api call after 200ms
     * 
     * key - ip
     * - destroy the component then useEffect return method
     * - re-render the component
     * - useEffect()
     * - start timer => make api call after 200ms
     */

    
    const dispatch = useDispatch();

    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    };

    const getSearchSuggestions = async () => {
        // console.log("APT CALL - " + searchQuery)
        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
        const json = await data.json();
        setSuggestions(json[1]);

        //update cache
        dispatch(cacheResults( {
            [searchQuery]: json[1],
        }));
    }



    return (
        <div className="bg-white fixed w-full grid grid-flow-col p-5 shadow-lg">
            {/* logo section */}
            <div className='flex col-span-1'>
                <img 
                    className="h-8 cursor-pointer" 
                    onClick={() => toggleMenuHandler()}
                    alt="menu" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8iICGSkZIkHyEPDA3z8vIyMTEhGx40MDEeHB4jICEeHR4AAAAxMTEgHh4gHB3W1tYtKyyXlpe6uroKBQhzcnJ+fX7CwsKysrJmZWX19fXk5OQYFhc5ODgoJidta2xUVFRfXV7Kysqsq6yjo6MHDa+eAAAB8UlEQVR4nO3c3VLaQBgGYJY/IQtE1Iogrfbn/q+xCaQ2TqtFm222+jwHDC8MMO8EdjnY+QYDAAAAAAAAAAAAAAAAeI/OL4Z5uDhP0m+yXYwzcbX4cJug4d045GN8Pem84GYd+67VUq6/dN7wou9Sjy1u0jQcjUZ9V2skaHhZfUuLbBrGYtN5w8F2HLNpGFOsNIPddlo3XGUgTK9T7BbVFzWbHX+zS1IQAAAAAAAAAABeZJKHVPXO76dHs9msul1OH+JfpOmr0ufuz15Wbhb78uzBvJzPWym2U/XU6Sk+lc6eTnEfv3Zf8PZjeTib2AihnYpwOJl5Qhp1kULY33d/1Pvbp9XTDcO/bhjGl503HD5uUX/Mn1PxTPr964pTUkhygra+hj9U16V10LS6+/pUtFLxTAo/00GCa1j/DhtFDw2Lxw1T/A7rtTRWS+ZhES2rdS3O22lep/qBX1LZSmetFI+pfvzk1HximrW03g9ns4edadboIy2XafbDWt9/Zhqp6gEAAAAAAAAAwAu89Zl7u+00xFXse2ZiLdHcxO24PLx7DpLMvrxcHy9f3+WOUswvHYZVRg2TTNktqnqjTCa0Jmm4WZcZNUwxC3pwd5VPwyLJlN3JdnHV9zD2RqKZ7G9/rj4AAAAAAAAAAAAAAAD8T74DVhZG6MsBqOQAAAAASUVORK5CYII="
                />
                <a href='/'>
                    <img 
                        className="h-8 mx-2" 
                        alt="youtube-logo" 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1024px-YouTube_Logo_2017.svg.png"
                    />
                </a>
            </div>

            {/* Search section*/}
            <div className='col-span-10'>
                <div>
                <input
                    className='w-1/2 border border-gray-400 p-2 rounded-l-full' 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setShowSuggestions(false)}
                />
                <button className= 'border border-gray-400 border-l-0 p-2 rounded-r-full bg-gray-100' >Search</button>
                </div>

                {showSuggestions && (
                <div className='fixed bg-white py-2 px-2 w-[48rem] shadow-lg rounded-lg border-gray-100 '>
                    <ul>
                        {suggestions.map(s => <li key={s} className='py-2 px-3 shadow-sm hover:bg-gray-100'>{s}</li>)}
                    </ul>
                </div>
                )}    
                            
            </div>

            {/* User Icon section */}
            <div className='col-span-1'>
                <img className='h-8' alt="user" src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"/>
            </div>
        </div>
    );
};


export default Head; 