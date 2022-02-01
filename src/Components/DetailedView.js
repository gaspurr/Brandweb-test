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
import { useLocation } from 'react-router';

function DetailedView() {
    const location = useLocation()
    const {id} = location.state

    const fetchDetailedData = async(gameName) =>{
       // await axios.get("")
    }

    console.log(name)

    return (
        <Container>
            <Row>
                <Col>
                    <img style={{ width: "100%", height: "100%" }} src="https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg" alt="Text" />
                </Col>
                <Col>
                    <Container>
                        <h1>{name}</h1>
                        <h2>Here comes the sun!</h2>
                        <p>Dudu du dun</p>

                        <h4>Here comes the sun and I say: </h4>
                        <h5>It's alright</h5>
                    </Container>
                </Col>
            </Row>
            <Row style={{ maxWidth: "50%" }}>
                <Col>
                    <h1>Description</h1>
                    <p>Lorem ipsu a hundred times and more, Lorem ipsu a hundred times and more, Lorem ipsu a hundred times and more, Lorem ipsu a hundred times and more, Lorem ipsu a hundred times and more</p>
                </Col>
            </Row>
        </Container>
    );
}

export default DetailedView;
