import * as express from 'express';
import * as _ from 'lodash';
import { IParty, Party } from '../models/party';
import { validateNewParty } from '../validation/party-routes';


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
  
    const party = {
      name,
      organiser,
      description,
      location,
      date,
      time,
      ageRate
    }

    const errors = validateNewParty(party);
    if (!_.isEmpty(errors)) {
      return res.status(400).json(errors);
    }
});