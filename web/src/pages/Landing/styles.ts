import styled from 'styled-components';

import landingImage from '../../assets/images/landing.svg';

export const PageLanding = styled.div`
    background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    main {
        max-width: 350px;

        h1{
            
            font-size: 76px;
            font-weight: 900;
            line-height: 70px;
        }

        p{
            margin-top: 40px;
            font-size: 24px;
            line-height: 34px;
        }
        
    }
`;
export const ContentWrapper = styled.div`
    position: relative;

    width: 100%;
    max-width: 1100px;

    height: 100%;
    max-height: 680px;

    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;

    background: url(${landingImage}) no-repeat 80% center;

    > a {
        position: absolute;
        right: 0;
        bottom: 0;

        width: 80px;
        height: 80px;
        background: #ffd666;
        border-radius: 30px;

        display: flex;
        align-items: center;
        justify-content: center;

        transition: background-color 0.2s;

        &:hover{
            background: #96fefe;
        }
    }

    

`;

export const Location = styled.div`
    position: absolute;
    right: 0;
    top: 0;  
    
    font-size: 24px;
    line-height: 34px;
    display: flex;
    flex-direction: column;
    align-items: right;

    strong {
        font-weight: 800;
    }
`;
