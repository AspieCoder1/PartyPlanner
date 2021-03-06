import * as express from 'express';
import { read } from 'fs/promises';
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

  }
);

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
  }
);

partyRouter.post('/update/:id',
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
      const updatedParty: IParty = new Party({
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
      const updatingPartyID = req.params.id;
      const foundParty = await Party.findById(updatingPartyID);
      if (foundParty) {
        const savedParty = await Party.findOneAndUpdate({ _id: updatingPartyID }, updatedParty);
				res.status(200).json(savedParty);
      } else { 
        res
          .status(400)
          .send('An exact party like this already exists');}
    }
    catch (e) {
      res.status(500).json('Oops something went wrong');
    }

  }
);

//get party data to edit the party 
partyRouter.get('/edit/:id',
  async(req: express.Request, res: express.Response) => {
    try {
      const foundParty = await Party.findById(req.params.id);
      if (foundParty == null) {
        res
          .status(400)
          .send('An exact party like this already exists');
      } else {
        res
          .status(200)
          .render('/update', { party: foundParty }); // send to update party html page
      }
    }
    catch (e) {
      res.status(500).json('Oops something went wrong');
    }
  }
);

// get parties that they are the organiser/host of
partyRouter.get('/my-parties/:id',
  async(req: express.Request, res: express.Response) => {
    try {
      const foundHostingParties = await Party.find({organiser : req.params.id});
      if (foundHostingParties == null) {
        res
          .status(400)
          .send('An exact party like this already exists');
      } else {
        res
          .status(200)
          .render('/hosting', { parties: foundHostingParties }); // send to hosting party html page
      }
    }
    catch (e) {
      res.status(500).json('Oops something went wrong');
    }
  }
);

// gettning parties they are invited to
partyRouter.get('/invited-parties/:id',
  async(req: express.Request, res: express.Response) => {
    try {
      const foundHostingParties = await Party.find({​​​​attendeesID: [req.params.id]}​​​​);
      if (foundHostingParties == null) {
        res
          .status(400)
          .send('An exact party like this already exists');
      } else {
        res
          .status(200)
          .render('/invited', { parties: foundHostingParties }); // send to invited party html/react page
      }
    }
    catch (e) {
      res.status(500).json('Oops something went wrong');
    }
  }
);

// getting all public parties
partyRouter.get('/public-parties',
  async(req: express.Request, res: express.Response) => {
    try {
      const foundPublicParties = await Party.find({public : true}​​​​);
      if (foundPublicParties == null) {
        res
          .status(400)
          .send('An exact party like this already exists');
      } else {
        res
          .status(200)
          .render('/public', { parties: foundPublicParties }); // send to public party html/react page
      }
    }
    catch (e) {
      res.status(500).json('Oops something went wrong');
    }
  }
);

//join a party as an attendee, party id is a parameter
partyRouter.post('/join/:id',
  async (req: express.Request, res: express.Response) => {
    try {
      const attenderID = req.body.username;
      const updatingPartyID = req.params.id;
      const foundParty = await Party.findById(updatingPartyID);
      if (foundParty) {
        foundParty.update({ $addToSet: attenderID });
        res
          .status(200)
          .send('Successfully Joined Party')
      } else { 
        res
          .status(400)
          .send('This party cannot be joined/does not exists.');}
    }
    catch (e) {
      res.status(500).json('Oops something went wrong');
    }

  }
);





export default partyRouter;