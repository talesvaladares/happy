import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import * as Yup from 'yup';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';

export default class OrphanageControllers {


    async create (request: Request, response: Response) {
        const orphanagesRespository = getRepository(Orphanage);

        //indica que o tipo sao muitos arquivos ou um array do multer
        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename };
        });
        
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;

        const data  = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape(
                {path: Yup.string().required()}
            ))

        }); 
        
        //duranta a validação dos campos
        //caso esteja faltando algum campo
        //a operação será encerrada
        await schema.validate(data,{
            abortEarly: false
        });

        const orphanage = orphanagesRespository.create(data);

        await orphanagesRespository.save(orphanage);

        return response.status(201).json(orphanage);

        
    }

    async index (request: Request , response: Response) {
        const orphanagesRespository = getRepository(Orphanage);

        const orphanages = await orphanagesRespository.find({relations: ['images']});

        return response.json(orphanageView.renderMany(orphanages));
    }

    async show (request: Request , response: Response) {
        const orphanagesRespository  = getRepository(Orphanage);

        const { id } = request.params;

        const orphanage = await orphanagesRespository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(orphanageView.render(orphanage));
    }
}