import React, { ChangeEvent, FormEvent, useCallback, useState} from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import {useHistory} from 'react-router-dom';
import L from 'leaflet';
import {LeafletMouseEvent} from 'leaflet';
//import { useHistory } from "react-router-dom";

import api from '../../services/api';
import { FiPlus } from "react-icons/fi";

import mapMarkerImg from '../../assets/images/map.marker.svg';

import Sidebar from '../../components/Sidebar';

import './styles.css';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
});

export default function CreateOrphanage() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0});
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, SetInstructions] = useState('');
  const [opening_hours, setOpening_hours] = useState('');
  const [open_on_weekends, setOpen_on_weekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const history = useHistory();

  const handlerMapClick = useCallback((event: LeafletMouseEvent)=> {
    const {lat, lng} = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng
    });
  },[]);

  const handlerOnSubmit = useCallback(async (event: FormEvent)=> {
    event.preventDefault();

    const {latitude, longitude} = position;

    const data = new FormData();

    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude))
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours',opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    
    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('/orphanages', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/app');   


  },[about, history, images, instructions, name, open_on_weekends, opening_hours, position]);

  const handlerSelectImages = useCallback((event: ChangeEvent<HTMLInputElement>)=>{
    if(!event.target.files){
      return;
    }

    const imagesUpload = Array.from(event.target.files);
    setImages(imagesUpload);

    const imagesUploadPreview = imagesUpload.map(image => {
      return URL.createObjectURL(image);

     });

     setPreviewImages(imagesUploadPreview);
  },[]);
  
  return (
    <div id="page-create-orphanage">
      <Sidebar/>

      <main>
        <form className="create-orphanage-form" onSubmit={handlerOnSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handlerMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && <Marker interactive={false} icon={happyMapIcon} position={[position.latitude,position.longitude]} />}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={(e)=>{setName(e.target.value)}} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={(e)=> setAbout(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  previewImages.map(image => {
                    return <img key={image} src={image} alt={name} />
                  })
                }
                <label htmlFor='images[]'  className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
                <input multiple onChange={handlerSelectImages} type='file' id='images[]'/>
              </div>

             
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"
                value={instructions} 
                onChange={(e) => SetInstructions(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={e => setOpening_hours(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpen_on_weekends(true)}
                >
                  Sim
                </button>
                <button
                 type="button"
                 className={!open_on_weekends ? 'active' : ''}
                 onClick={() => setOpen_on_weekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
