import React, { useEffect, useState } from 'react';
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
        <Container>
            <h1>Games</h1>
            <Row xl={5} xxl={7} lg={4} md={3} sm={2} s>
                {
                    gameCards.length > 0 ? gameCards.map((game) => {

                        return (
                            <Col key={game.id} >
                                <Card style={{
                                    minWidth: "10vh",
                                    width: "100%",
                                    marginBottom: "1rem",
                                    maxHeight: "68vh",
                                    height: "100%"

                                }}>
                                    <Card.Img variant="top" style={{ minHeight: "20vh", minWidth: "24vh", maxHeight: "22vh", width: "100%" }} src={game.background_image} alt="Game image" />
                                    <Card.Body style={{ alignItems: "space-between", display: "grid" }}>
                                        <h5 className="card-title">{game.name}</h5>
                                        <Card.Text className="card-text">Rating: {game.rating}</Card.Text>
                                        <Card.Text>
                                            {game["genres"].map((genre) => {
                                                return <span style={{
                                                    background: "lightgrey",
                                                    width: "100%",
                                                    margin: "0px 5px 0px 0px",
                                                    borderRadius: "5px",
                                                    padding: "2px 4px 2px 4px",
                                                }} key={genre.id}>{genre.name}</span>
                                            })}
                                        </Card.Text>
                                        <Card.Text style={{ fontSize: "0.8rem", color: "grey" }}>Last updated: {game.updated.slice(0, 10)}</Card.Text>
                                        <Card.Text >{game.description}</Card.Text>
                                        <Button variant="primary">See details</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }) : null
                }
            </Row>
            <p>This pagination below here doesn't work yet....</p>
            <Pagination style={{ justifyContent: "center", marginTop: "10vh" }}>

                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>


        </Container>
    )
}

export default MainPage;
