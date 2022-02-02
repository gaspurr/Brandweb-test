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
import "./DetailedView.css"

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
            <Row style={{ marginBottom: "40px", marginTop: "40px" }}>
                <Col>
                    <img style={{ borderRadius: "8px", boxShadow: "10px 10px 5px grey", marginTop: "6rem", width: "80vh", height: "40vh" }} src={gameData.background_image} alt="Game's background picture" />
                </Col>
                <Col>
                    <Col>
                        <h1 style={{ marginBottom: "30px" }}>{gameData.name}</h1>
                        <Container style={{ background: "#e3e3e3", borderRadius: "8px", maxWidth: "100%" }}>
                            <h2>Description</h2>
                            {gameData.description_raw}
                            <a style={{ marginTop: "20px" }} href={gameData.website}>Read more on their website</a>
                            <p style={{ marginTop: "20px" }}>Released: {gameData.released} by {developers ? developers.map((dev, index) => {
                                return dev.name
                            }) : null}</p>
                        </Container>
                    </Col>
                </Col>
            </Row>
            <Row>
                <Col xs={4}>
                    <h3>Tags</h3>
                    <div style={{ marginTop: "20px", flexWrap: "wrap", display: "flex" }}>
                        {tags ? tags.map(tag => {
                            return <p className="tag">{tag.name}</p>
                        }) : null}
                    </div>
                </Col>
                <Col xs={2} sm={{ width: "50%", height: "50%" }} md={{ width: "20%", height: "20%" }} style={{ width: "80", heigth: "50%", marginBottom: "40px" }}>

                    <h3>Genres</h3>
                    <Container style={{ display: "flex", flexWrap: "wrap" }}>
                        {genres ? genres.map((genre) => {
                            return <p className="genre">{genre.name}</p>
                        }) : null}
                    </Container>
                </Col>
                <Col xs={5}>
                    <h1>Ratings</h1>
                    <Row>
                        <Col>
                            <h3>Metacritic ratings</h3>
                            <Container>
                                <p><strong>Overall: </strong>{gameData.metacritic}</p>
                                <ul key="unordered list">
                                    {platforms ? platforms.map((platform) => {
                                        return <li key={platform.id}>{platform.platform.name}: {platform.metascore}</li>
                                    }) : <div>No platforms yet</div>}
                                </ul>
                            </Container>
                        </Col>
                        <Col>
                            <h3>Gamer's feedback</h3>
                            <h5>Overall rating: {gameData.rating}</h5>
                            {
                                ratings ? ratings.map((rating) => {
                                    return (
                                        <Container>
                                            <ul>
                                                <li>

                                                </li>
                                            </ul>
                                            <p key={rating.id}><strong>{rating.title === "exceptional" ? `Exceptional 🏆` : rating.title === "recommended" ? "Recommended 👍" : rating.title === "skip" ? "Skip 🙅‍♂️" : "Meh 🤷‍♀️"}:</strong> {rating.count}</p><p><strong>Percent:</strong> {rating.percent}%</p>
                                        </Container>)

                                }) : <p>No ratings yet :(</p>
                            }
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Container>

    )
}

export default DetailedView;
