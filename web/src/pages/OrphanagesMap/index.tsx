import React , {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight} from 'react-icons/fi';
import api from '../../services/api'; 

//configuraçao do mapa
import {Map, TileLayer, Marker, Popup}  from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {
    PageMap,
    CreateOrphanage
} from './styles';


import mapMarkerImg from '../../assets/images/map.marker.svg';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    
    popupAnchor: [170, 2],

}); 

interface IOrphanage{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

const OrphanagesMap: React.FC = () => {

    const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);


    useEffect(()=> {
        api.get('/orphanages').then(response => {
            setOrphanages(response.data)
        })
    },[]);

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
                center={[-20.5027352,-43.8597653]}
                zoom={15}
                style={{ width: '100%', height: '100%'}}
            >
                {/* <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'/>  */}
                <TileLayer url={ `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                
                {
                orphanages.map(orphanage => {
                    return (
                        <Marker
                            key={orphanage.id}
                            icon={mapIcon}
                            position={[orphanage.latitude,orphanage.longitude]}
                        >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>
                            {orphanage.name}
                            <Link to={`/orphanage/${orphanage.id}`}>
                                <FiArrowRight size={20} color='#fff'/>
                            </Link>
                        </Popup>
    
                    </Marker>
                    );
                })
            }


               
           </Map>

            <CreateOrphanage to='/orphanage/create'>
                <FiPlus size={32} color='#fff'/>
            </CreateOrphanage>
        </PageMap>
    );
};

export default OrphanagesMap;