import React from 'react';
import {Link} from 'react-router-dom';

import {
    PageLanding,
    ContentWrapper,
    Location
} from './styles';

import logoImage from '../../assets/images/logo.svg'
import {FiArrowRight} from 'react-icons/fi';

const Landing: React.FC = () => {
    return(
        <PageLanding>
            <ContentWrapper>
                <img src={logoImage} alt='happy'/>

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>
                <Location>
                    <strong>Congonhas</strong>
                    <span>Minas Gerais</span>
                </Location>
                <Link to='/app'> 
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>
            </ContentWrapper>
        </PageLanding>
    );
}

export default Landing;