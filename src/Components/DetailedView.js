import React, { useEffect, useState } from 'react';
import axios from "axios"
import {
    Button,
    Container,
    Row,
    Col,
} from "react-bootstrap"
import { useLocation } from 'react-router';
import { API_KEY } from "../env"

function DetailedView() {
    const [gameData, setGameData] = useState([])

    const location = useLocation()
    const { id } = location.state

    const fetchDetailedData = async (id) => {
        await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            .then(res => {
                setGameData(...gameData, res.data)
            }).catch(e => {
                console.log({ message: e })
            })
    }

    const platforms = gameData.metacritic_platforms
    const ratings = gameData.ratings
    const developers = gameData.developers
    const genres = gameData.genres
    const tags = gameData.tags

    console.log(id)

    useEffect(() => {
        fetchDetailedData(id)
    }, [location])

    return (
        <Container>
            <Row>
                <Col sm={{ width: "50%", height: "50%" }} md={{ width: "20%", height: "20%" }} style={{ width: "80", heigth: "50%", marginBottom: "40px" }}>
                    <img style={{ width: "80%", height: "80%" }} src={gameData.background_image} alt="Game's background picture" />
                    <Row style={{ marginTop: "20px", height: "min-content", display: "flex" }}>
                        {tags ? tags.map(tag => {
                            return <p style={{
                                fontSize: "10px",
                                height: "min-content",
                                borderRadius: "5px",
                                padding: "5px",
                                marginRight: "5px",
                                backgroundColor: "lightgrey",
                                width: "max-content"
                            }} >{tag.name}</p>
                        }) : null}
                    </Row>
                </Col>
                <Col>
                    <Container>
                        <h1>{gameData.name}</h1>
                        <Row>
                            <Col>
                                <Container>
                                    <p>Released: {gameData.released} by {developers ? developers.map((dev, index) => {
                                        return dev.name
                                    }) : null}</p>
                                    <h3>Genres</h3>
                                    <Container style={{ display: "flex", flexWrap: "wrap" }}>
                                        {genres ? genres.map((genre) => {
                                            return <p style={{
                                                borderRadius: "5px",
                                                padding: "5px",
                                                marginRight: "5px",
                                                backgroundColor: "lightgrey",
                                                width: "min-content",
                                                display: "flex"
                                            }}>{genre.name}</p>
                                        }) : null}
                                    </Container>
                                </Container>
                            </Col>
                            <Col>
                                <Container>
                                    <h4>Metacritic ratings</h4>
                                    <p><strong>Overall: </strong>{gameData.metacritic}</p>
                                    <ul key="unordered list">
                                        {platforms ? platforms.map((platform) => {
                                            return <li key={platform.id}>{platform.platform.name}: {platform.metascore}</li>
                                        }) : <div>No platforms yet</div>}
                                    </ul>
                                    <h5>Overall rating: {gameData.rating}</h5>
                                    {
                                        ratings ? ratings.map((rating) => {
                                            return (
                                                <Container>
                                                    <p key={rating.id}><strong>{rating.title}:</strong> {rating.count}</p><p><strong>Percent:</strong> {rating.percent}%</p>
                                                </Container>)

                                        }) : <p>No ratings yet :(</p>
                                    }
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row style={{ maxWidth: "50%" }}>
                <Col>
                    <h1>Description</h1>
                    {gameData.description_raw}
                    <a href={gameData.website}>Read more on their website</a>
                </Col>
            </Row>
        </Container>
    );
}

export default DetailedView;
