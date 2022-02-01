import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from "react-router-dom"
import { Container, Form, FormControl } from 'react-bootstrap';
import axios from "axios"
import "./SearchBar.css"
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DetailedView from './DetailedView';

function SearchBar({ placeholder }) {

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
            <Container style={{ display: "flex" }}>
                <Form.Label htmlFor="Searchbar" />
                <Form.Control
                    type="text"
                    id="search-query"
                    placeholder={placeholder}
                    onChange={(e) => { handleFiltering(e) }}
                />
                <FormControl.Feedback>
                    <FontAwesomeIcon icon={faSearch} />
                </FormControl.Feedback>

            </Container>
            {input.length > 0 ?
                <Container className="search-results">
                    {input.length != 0 ? input.map((game) => {
                        return (
                            <Link key={game._id} to='/game' state={{
                                name: game.id
                            }} >{game.name}</Link>
                        )

                    }) : null}
                </Container>
                : null}



        </Container>
    )

}

export default SearchBar;
