import React, { useState } from 'react';
import axios from "axios"

function MainPage() {
    const [results, setResults] = useState([])

    const fetcher = async (e) => {
        e.preventDefault()
        await axios.get("http://localhost:8080/")
            .then(res => {
                res.data.forEach(obj => {
                    setResults(prev => [...prev, obj])
                })
                console.log(results)
            }).catch(e => {
                console.log(e)
            })
    }


    return (
        <div>
            <h1>Heeeey</h1>
            <button onClick={(e) => {
                fetcher(e)
            }}>click</button>
        </div>
    )
}

export default MainPage;
