import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import React from "react";
import ReturnBtn from "./components/ReturnBtn";

export default function App() {

    const [renderButton, setRenderButton] = React.useState(false);

    const [nameMovie, setNameMovie] = React.useState("");
    const [day, setDay] = React.useState("");
    const [time, setTime] = React.useState("");
    const [numberSeat, setNumberSeat] = React.useState("");
    const [nameSuccess, setNameSuccess] = React.useState("");
    const [cpfSuccess, setCpfSuccess] = React.useState("");

    return (
        <>
            <BrowserRouter>
                <ReturnBtn renderButton={renderButton} />
                <NavContainer>CINEFLEX</NavContainer>
                <Routes>
                    <Route path="/" element={<HomePage setRenderButton={setRenderButton} />} />
                    <Route path="/sessoes/:idFilme" element={<SessionsPage setRenderButton={setRenderButton} />} />
                    <Route path="/assentos/:idSessao" element={<SeatsPage
                        day={day}
                        setDay={setDay}
                        nameMovie={nameMovie}
                        setNameMovie={setNameMovie}
                        time={time}
                        setTime={setTime}
                        numberSeat={numberSeat}
                        setNumberSeat={setNumberSeat}
                        nameSuccess={nameSuccess}
                        setNameSuccess={setNameSuccess}
                        cpfSuccess={cpfSuccess}
                        setCpfSuccess={setCpfSuccess}
                        setRenderButton={setRenderButton}
                    />} />
                    <Route path="/sucesso" element={<SuccessPage
                        day={day}
                        nameMovie={nameMovie}
                        time={time}
                        numberSeat={numberSeat}
                        nameSuccess={nameSuccess}
                        cpfSuccess={cpfSuccess}
                    />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`