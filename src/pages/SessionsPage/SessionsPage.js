import styled from "styled-components";
import { useParams } from 'react-router-dom';
import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function SessionsPage(props) {

    const { idFilme } = useParams();

    const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;
    const [sessions, setSessions] = React.useState([]);
    const [sessionsDays, setSessionsDays] = React.useState([]);

    useEffect(() => {
        const request = axios.get(url);
        props.setLastAddress("/");

        request.then(response => {
            setSessions(response.data);
            setSessionsDays(response.data.days);
        });
        request.catch(erro => {
            console.log(erro.response.data);
        })
    }, []);

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {sessionsDays.map(day =>
                    <SessionContainer data-test="movie-day" key={day.id}>
                        {day.weekday} - {day.date}
                        <ButtonsContainer>
                            {day.showtimes.map(showtime =>
                                <Link onClick={() => {
                                    props.setRenderButton(true);
                                    props.setLastAddress(`/sessoes/${idFilme}`);
                                }} key={showtime.id} to={`/assentos/${showtime.id}`}>
                                    <button data-test="showtime" key={showtime.id}>{showtime.name}</button>
                                </Link>
                            )}
                        </ButtonsContainer>
                    </SessionContainer>
                )}
            </div>

            <FooterContainer data-test="footer">
                <div>
                    <img src={sessions.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{sessions.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`