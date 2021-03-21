import * as express from 'express';
import * as _ from 'lodash';
import { IParty, Party } from '../models/party';
import { validateNewParty } from '../validation/party-routes';

const partyRouter: express.Router = express.Router();

partyRouter.post(
	'/create',

	async (req: express.Request, res: express.Response) => {
		req.body.name = req.body.name ? req.body.name : '';
		req.body.organiser = req.body.organiser ? req.body.organiser : '';
		req.body.description = req.body.description ? req.body.description : '';
		req.body.location = req.body.location ? req.body.location : '';
		req.body.date = Date.parse(req.body.date) ? req.body.date : '';
		req.body.time = req.body.time ? req.body.time : '';
		req.body.ageRate = req.body.ageRate ? req.body.ageRate : false;
    req.body.attendeesID = req.body.attendeesID ? req.body.attendeesID : [req.body.organiser];
		req.body.todoID = req.body.todoID ? req.body.todoID : '';
		req.body.publicParty = req.body.public ? req.body.public : false;

		const party = {
			name: req.body.name,
			organiser: req.body.organiser,
			description: req.body.description,
			location: req.body.location,
			date: req.body.date,
			time: req.body.time,
			ageRate: req.body.ageRate,
			attendeesID: req.body.attendeesID,
			todoID: req.body.todoID,
			publicParty: req.body.publicParty,
    };

		const errors = validateNewParty(party);
		if (!_.isEmpty(errors)) {
			return res.status(400).json(errors);
		}

    try {
			const newParty: IParty = new Party({
				name: req.body.name,
				organiser: req.body.organiser,
				description: req.body.description,
				location: req.body.location,
				date: req.body.date,
				time: req.body.time,
				ageRate: req.body.ageRate,
				attendeesID: req.body.attendeesID,
				todoID: req.body.todoID,
				publicParty: req.body.publicParty,
      });
      const foundParty = await Party.findOne({ party });      
			if (foundParty) {
				res.status(400).send('An exact party like this already exists');
      } else {        
        const savedParty = await newParty.save();      
        res.status(200).json(savedParty); 
			}
		} catch (e) {
			res.status(500).json('Oops something went wrong');
		}
	}
);

partyRouter.delete(
	'/:id',
	async (req: express.Request, res: express.Response) => {
		const partyID = req.params.id;
		try {
			const delParty = await Party.findByIdAndDelete(partyID);
			if (!delParty) {
				res.status(400).send('No party of this id exists');
			} else {
				res.status(200).json(delParty);
			}
		} catch (e) {
			res.status(500).json('Oops something went wrong');
		}
	}
);

//get party data to edit the party
partyRouter.get(
	'/edit/:id',
	async (req: express.Request, res: express.Response) => {
		try {
			const foundParty = await Party.findById(req.params.id);
			if (_.isEmpty(foundParty)) {
				res.status(400).json('An exact party like this already exists');
			} else {
				res.status(200).json({ party: foundParty });
			}
		} catch (e) {
			res.status(500).json('Oops something went wrong');
		}
	}
);

// get parties that they are the organiser/host of
partyRouter.get(
	'/my-parties',
	async (req: express.Request, res: express.Response) => {
    try {
      const idTofind = req.body.userID;
			const foundHostingParties = await Party.find({
        attendeesID: {$all: [idTofind]},
      });
			if (_.isEmpty(foundHostingParties)) {
				res.status(400).send('You have no parties');
			} else {
				res.status(200).json(foundHostingParties); // send to hosting party html page
			}
		} catch (e) {
			res.status(500).json('Oops something went wrong');
		}
	}
);

//join a party as an attendee, party id is a parameter
partyRouter.post(
	'/join/:id',
	async (req: express.Request, res: express.Response) => {
		try {
			const attenderID = req.body.attenderID;
			const updatingPartyID = req.params.id;
			const foundParty = await Party.findById(updatingPartyID);
      if (foundParty) {
        // console.log(foundParty.attendeesID);
        // foundParty.update({ $addToSet: { attendeesID: attenderID } });
        // foundParty.save()
        // console.log(foundParty.attendeesID);
        console.log(foundParty.attendeesID);
        Party.findByIdAndUpdate(updatingPartyID,
          {
            $push: {attendeesID: attenderID}
          });
        const foundParty2 = await Party.findById(updatingPartyID);
        console.log(foundParty2.attendeesID);
				res.status(200).send('Successfully joined party');
			} else {
				res.status(400).send('This party cannot be joined/does not exists.');
			}
		} catch (e) {
			res.status(500).json('Oops something went wrong');
		}
	}
);

// gettning parties they are invited to
partyRouter.get(
	'/invited-parties/:id',
	async (req: express.Request, res: express.Response) => {
		try {
      const idTofind = req.body.IDtoFind;
      const foundHostingParties = await Party.find({
        attendeesID: {$all: [idTofind]},
      });
			if (_.isEmpty(foundHostingParties)) {
				res.status(400).send('You have no parties');
			} else {
				res.status(200).json(foundHostingParties); // send to hosting party html page
			}
		} catch (e) {
			res.status(500).json('Oops something went wrong');
		}
	}
);

// getting all public parties
partyRouter.get(
	'/public-parties',
	async (req: express.Request, res: express.Response) => {
		try {
			const foundPublicParties = await Party.find({ publicParty: true });
			if (!foundPublicParties) {
				res.status(400).send('No public parties found.');
			} else {
				res.status(200).json(foundPublicParties); // send to public party html/react page
			}
		} catch (e) {
			res.status(500).json('Oops something went wrong');
		}
	}
);

export default partyRouter;
