import * as express from 'express';
import * as _ from 'lodash';
import { IParty, Party } from '../models/party';
import { validateNewParty } from '../validation/party-routes';
import userRouter from './user';


const partyRouter: express.Router = express.Router();

partyRouter.post('/create',

  async (req: express.Request, res: express.Response) => {
    const name = req.body.name ? req.body.name : '';
    const organiser = req.body.organiser ? req.body.organiser : '';
    const description = req.body.description ? req.body.description : '';
    const location = req.body.location ? req.body.location : '';
    const date = Date.parse(req.body.date) ? req.body.date : '';
    const time = req.body.time ? req.body.time : '';
    const ageRate = req.body.ageRate ? req.body.ageRate : '';
    const attendeesID = req.body.attendeesID ? req.body.attendeesID : [];  
    const todoID = req.body.todoID ? req.body.todoID : '';
      
    const party = {
      name,
      organiser,
      description,
      location,
      date,
      time,
      ageRate,
      attendeesID,
      todoID
    }

    const errors = validateNewParty(party);
    if (!_.isEmpty(errors)) {
      return res.status(400).json(errors);
    }

    try {
      const newParty: IParty = new Party({
        name: party.name,
        organiser: party.organiser,
        description: party.description,
        location: party.location,
        date: party.date,
        time: party.time,
        ageRate: party.ageRate,
        attendeesID: party.attendeesID,
        todoID: party.todoID
      });
      const foundParty = await Party.findOne(party);
      if (foundParty) {
        res
          .status(400)
          .send('An exact party like this already exists');
      } else { 
        const savedParty = await newParty.save();
				res.status(200).json(savedParty);
      }
    }
    catch (e) {
      res.status(500).json('Oops something went wrong');
    }

  });

partyRouter.delete('/:id',
  async (req: express.Request, res: express.Response) => {
    const partyID = req.params.id;
    try {
      const delParty = await Party.findByIdAndDelete(partyID);
      if (!delParty) {
        res
          .status(400)
          .send('No party of this id exists')
      } else {
        res.status(200).json(delParty);
      }
    }
    catch (e) {
      res.status(500).json('Oops something went wrong');
    }
    
  });

  export default partyRouter;