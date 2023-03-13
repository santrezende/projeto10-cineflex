import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function ReturnBtn(props) {
    const navigate = useNavigate();

    function goLastPage() {
        navigate(-1);
    }

    return (
        <ReturnButton data-test="go-home-header-btn" onClick={goLastPage} renderButton={props.renderButton ? "flex" : "none"}>
            <ion-icon name="arrow-back-outline"></ion-icon>
        </ReturnButton>
    )
}

const ReturnButton = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    display: ${props => props.renderButton};
    justify-content: center;
    align-items: center;
    z-index: 2;
    width: 70px;
    height: 70px;
    cursor: pointer;

    ion-icon{
        font-size: 50px ;
    }
`