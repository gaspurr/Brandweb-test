import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import axios from "axios"
import {
    Button,
    Container,
    Row,
    Col,
    Card,
    Pagination
} from "react-bootstrap"

function MainPage() {
    const [gameCards, setGameCards] = useState([])
    const [page, setPage] = useState(1)

    //I should use usememo here maybe?
    const fetchCards = async (page) => {
        setGameCards([])
        await axios.get(`http://localhost:8080/games/query?page=${page}&limit=${6}`)
            .then(res => {
                setGameCards(...gameCards, res.data)
            }).catch(e => {
                console.log(e)
            })
    }

    const handlePageChange = (value) => {
        //e.preventDefault()
        setPage(value)
    }

    useEffect(() => {
        fetchCards(page)
    }, [page]);



    return (
        <Container>
            <h1>Games</h1>
            <Row xxl={7} xl={4} lg={4} md={3} sm={2} style={{ marginBottom: "2vh" }}>
                {
                    gameCards.length > 0 ? gameCards.map((game) => {

                        return (
                            <Col alt="columns" key={game.id} style={{ marginBottom: "1rem" }} >
                                <Card style={{
                                    minWidth: "10vh",
                                    width: "100%",
                                    marginBottom: "1rem",
                                    maxHeight: "68vh",
                                    height: "100%"
                                }}>
                                    <Card.Img alt="Game background" variant="top" style={{ minHeight: "20vh", minWidth: "24vh", maxHeight: "22vh", width: "100%" }} src={game.background_image} alt="Game image" />
                                    <Card.Body alt="Body" style={{ alignItems: "space-between", display: "grid" }}>
                                        <h5 className="card-title">{game.name}</h5>
                                        <Card.Text alt="Game's rating" className="card-text">Rating: {game.rating}</Card.Text>
                                        <Card.Text style={{ display: "flex", height: "100%", flexWrap: "wrap" }}>
                                            {game["genres"].map((genre) => {
                                                return <span style={{
                                                    background: "lightgrey",
                                                    width: "min-content",
                                                    margin: "0px 5px 4px 0px",
                                                    borderRadius: "5px",
                                                    height: "min-content",
                                                    padding: "2px 4px 2px 4px",
                                                    flexWrap: "wrap"
                                                }} key={genre.id}>{genre.name}</span>
                                            })}
                                        </Card.Text>
                                        <Card.Text alt="Card text" style={{ fontSize: "0.8rem", color: "grey" }}>Last updated: {game.updated.slice(0, 10)}</Card.Text>
                                        <Card.Text >{game.description}</Card.Text>
                                        <Card.Body >
                                            <Link className="link-btn" key={game._id} to="/game" state={{
                                                id: game.id
                                            }}>See details</Link>
                                        </Card.Body>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }) : null
                }
            </Row>
            <p>This pagination below here doesn't work yet....</p>
            <Pagination style={{ justifyContent: "center", marginTop: "10vh" }}>

                <Pagination.First alt="First page" />
                <Pagination.Prev alt="Prev page" />
                {gameCards.length > 0 ? gameCards.map((page, index) => {
                    return <Pagination.Item alt="Page selection" value={index + 1} key={index + 1} onClick={(e) => {
                        handlePageChange(index + 1)
                    }}>{index + 1}</Pagination.Item>
                }) : null}
                <Pagination.Next alt="next page" />
                <Pagination.Last alt="Last page" />
            </Pagination>
        </Container>
    )
}

export default MainPage;
