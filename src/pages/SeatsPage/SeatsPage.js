import styled from "styled-components";
import { useParams } from 'react-router-dom';
import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function SeatsPage(props) {

    const { idSessao } = useParams();

    const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
    const [seats, setSeats] = React.useState([]);
    const [sessionData, setSessionData] = React.useState([]);
    const [sessionMovie, setSessionMovie] = React.useState([]);
    const [sessionDay, setSessionDay] = React.useState([]);

    useEffect(() => {
        const request = axios.get(url);

        request.then((response) => {
            setSeats(
                response.data.seats.map((seat) => ({
                    ...seat,
                    isSelected: false,
                }))
            );
            setSessionData(response.data);
            setSessionMovie(response.data.movie);
            setSessionDay(response.data.day.weekday);
            props.setDay(response.data.day.date);
            props.setNameMovie(response.data.movie.title);
            props.setTime(response.data.name);
        });
        request.catch((erro) => {
            console.log(erro.response.data);
        });
    }, []);

    const [arrayIds, setArrayIds] = React.useState([]);
    const [name, setName] = React.useState("");
    const [cpf, setCpf] = React.useState("");

    const postTemplate =
    {
        ids: arrayIds,
        name: name,
        cpf: cpf
    }

    function selectSeat(seatId) {
        if (!arrayIds.includes(seatId)) {
            setArrayIds([...arrayIds, seatId]);
        } else {
            setArrayIds(arrayIds.filter(item => item != seatId));
        };
        setSeats(
            seats.map((seat) => {
                if (seat.id === seatId) {
                    if (seat.isSelected === true) {
                        return {
                            ...seat,
                            isSelected: false,
                        }
                    }
                    return {
                        ...seat,
                        isSelected: true,
                    };
                } else {
                    return seat;
                }
            }
            )
        );
    }

    function selectUnavailableSeat() {
        alert("Esse assento não está disponível");
    }

    const urlPost = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";

    function bookSeat() {
        props.setNumberSeat(arrayIds);
        props.setNameSuccess(name);
        props.setCpfSuccess(cpf);
        const promise = axios.post(urlPost, postTemplate);

        promise.then((response) => {
            console.log(response.config.data);
        });

        promise.catch((error) => {
            console.log(error);
        });
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.map((seat) => (
                    <SeatItem
                        data-test="seat"
                        onClick={seat.isAvailable ? () => selectSeat(seat.id) : selectUnavailableSeat}
                        colorBackground={
                            seat.isSelected ? "#1AAE9E" :
                                seat.isAvailable ? "#C3CFD9" : "#FBE192"
                        }
                        colorBorder={
                            seat.isSelected ? "#0E7D71" :
                                seat.isAvailable ? "#7B8B99" : "#F7C52B"
                        }
                        key={seat.id}
                    >
                        {seat.name}
                    </SeatItem>
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle colorBorder={"#0E7D71"} colorBackground={"#1AAE9E"} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle colorBorder={"#7B8B99"} colorBackground={"#C3CFD9"} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle colorBorder={"#F7C52B"} colorBackground={"#FBE192"} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input onChange={event => setName(event.target.value)} data-test="client-name" placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input onChange={event => setCpf(event.target.value)} data-test="client-cpf" placeholder="Digite seu CPF..." />
                <Link to={"/sucesso"}>
                    <button onClick={bookSeat} data-test="book-seat-btn">Reservar Assento(s)</button>
                </Link>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={sessionMovie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{sessionMovie.title}</p>
                    <p>
                        {sessionDay} - {sessionData.name}
                    </p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.colorBorder};
    background-color: ${props => props.colorBackground};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${props => props.colorBorder};
    background-color: ${props => props.colorBackground};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
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