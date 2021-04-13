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
		req.body.attendeesID = req.body.attendeesID
			? req.body.attendeesID
			: [req.body.organiser];
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

// get parties that they are the organiser/host of
partyRouter.get(
	'/my-parties/:id',
	async (req: express.Request, res: express.Response) => {
		try {
			const idTofind = req.params.id;
			const foundHostingParties = await Party.find({
				attendeesID: { $all: [idTofind] },
			});
			if (_.isEmpty(foundHostingParties)) {
				res.status(404).send('You have no parties');
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
				foundParty.attendeesID.push(attenderID);
				await foundParty.save();
				res.status(200).send(foundParty);
			} else {
				res.status(404).send('This party cannot be joined/does not exists.');
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
			const idTofind = req.params.id;
			const foundParties = await Party.find({
				attendeesID: { $in: [idTofind] },
			});

			if (_.isEmpty(foundParties)) {
				res.status(404).send('You have no parties');
			} else {
				res.status(200).json(foundParties); // send to hosting party html page
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
			if (foundPublicParties.length === 0) {
				res.status(404).send('No public parties found.');
			} else {
				res.status(200).json(foundPublicParties); // send to public party html/react page
			}
		} catch (e) {
			res.status(500).json('Oops something went wrong');
		}
	}
);

partyRouter.patch(
	'/update/:id',

	async (req: express.Request, res: express.Response) => {
		const { updates } = req.body;

		const errors = validateNewParty(updates);
		if (!_.isEmpty(errors)) {
			return res.status(400).json(errors);
		}

		try {
			const idToUpdate = req.params.id;
			const existing = await Party.findById(idToUpdate);
			if (_.isEmpty(existing)) {
				res.status(404).json('This party does not exist');
			} else {
				const result = await Party.findByIdAndUpdate(idToUpdate, updates, {
					new: true,
				});
				res.status(200).json(result);
			}
		} catch (e) {
			res.status(500).json('Oops something went wrong');
		}
	}
);

// Get a party by an ID
partyRouter.get('/party/:id', async (req: express.Request, res: express.Response) => {
	try {
		const id = req.params.id;
		const foundParty: IParty = await Party.findOne({_id: id});
		if (foundParty) {
			res.status(200).json(foundParty);
		}
	} catch (e) {
		res.status(500).json('Oops something went wrong');
	}
});

export default partyRouter;
