import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus} from 'react-icons/fi';

//configuraçao do mapa
import {Map, TileLayer}  from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../../assets/images/map.marker.svg';
import {
    PageMap,
    CreateOrphanage
} from './styles';
import { tileLayer } from 'leaflet';

const OrphanagesMap: React.FC = () => {
    return (
        <PageMap>
            <aside>
                <header>
                    <img src={mapMarkerImg} alt='happy'/>
                    <h2>
                        Escolha um orfanato no mapa
                    </h2>
                    <p>Muitas crianças estão espeerando a sua visita</p>
                </header>
                <footer>
                    <strong>Congonhas</strong>
                    <span>Minas Gerais</span>
                </footer>
            </aside>

            <Map
                center={[-20.5042125,-43.8717923]}
                zoom={15}
                style={{ width: '100%', height: '100%'}}
            >
                {/* <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'/>  */}
                <TileLayer url={ `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
            </Map>

            <CreateOrphanage to='#'>
                <FiPlus size={32} color='#fff'/>
            </CreateOrphanage>
        </PageMap>
    );
};

export default OrphanagesMap;