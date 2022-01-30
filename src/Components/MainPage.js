import React, { useEffect, useState } from 'react';
import axios from "axios"

function MainPage() {
    const [results, setResults] = useState([])
    const [gameCards, setGameCards] = useState([])

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

    const fetchCards = async () => {
        await axios.get(`http://localhost:8080/games`)
            .then(res => {
                setGameCards(...gameCards, res.data)
            }).catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        fetchCards()
    }, []);



    return (
        <div className="container-sm">
            <h1>Games</h1>
            <div className="row row-cols-4">
                {
                    gameCards ? gameCards.map(game => {

                        return (
                            <div className="col">
                                <div className="card" style={{
                                    maxWidth: "20rem",
                                    marginBottom: "1rem"

                                }}>
                                    <img style={{ height: "22vh" }} src={game.background_image} className="card-img-top" alt="Game image" />
                                    <div className="card-body">
                                        <h5 className="card-title">{game.name}</h5>
                                        <p className="card-text">Rating: {game.rating}</p>
                                        <p>
                                            {game["genres"].map(genre => {
                                                return <span style={{
                                                    background: "lightgrey",
                                                    width: "100%",
                                                    margin: "5px",
                                                    borderRadius: "5px",
                                                    padding: "2px 4px 2px 4px"
                                                }}>{genre.name}</span>
                                            })}
                                        </p>
                                        <p style={{fontSize: "0.8rem", color: "grey"}} className="card-text">Last updated: {game.updated.slice(0, 10)}</p>
                                        <p className="card-text">{game.description}</p>
                                        <button type="button" className="btn btn-primary">See details</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : null
                }
            </div>


        </div>
    )
}

export default MainPage;
