import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import axios from "axios"
import "./SearchBar.css"

function SearchBar({ placeholder, data }) {

    const [results, setResults] = useState([])
    const [input, setInput] = useState([])

    //I should use usememo here
    const fetchSearchQueries = async () => {
        await axios.get('http://localhost:8080/games/names')
            .then(res => {
                setResults(...results, res.data)
            }).catch(e => {
                console.log(e)
            })
    }

    const handleFiltering = (e) => {
        const searchWord = e.target.value
        const filter = results.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase())
        })

        if (searchWord === 0 || null) {
            setInput([])
        } else {
            setInput(filter)
        }

        console.log(searchWord)
    }



    useEffect(() => {
        fetchSearchQueries()
    }, [])
    return (
        <Container>
            <Container>
                <Form.Label htmlFor="Searchbar" />
                <Form.Control
                    type="text"
                    id="search-query"
                    placeholder={placeholder}
                    onChange={(e) => { handleFiltering(e) }}
                />
            </Container>
            {input.length > 0 ?
                <Container className="search-results">
                    {input.length != 0 ? input.map((game) => {
                        return (
                            <a key={game._id} className="result-item" href="#" target="_blank">{game.name}</a>
                        )

                    }) : null}
                </Container>
                : null}



        </Container>
    )

}

export default SearchBar;
