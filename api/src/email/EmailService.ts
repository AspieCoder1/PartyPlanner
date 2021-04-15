import * as nodemailer from 'nodemailer';

export class EmailService {
	private _transporter: nodemailer.Transporter;

	constructor() {
		this._transporter = nodemailer.createTransport(
			'smtps://partyplannerx1%40gmail.com:UOM2021abc@smtp.gmail.com'
		);
	}

	sendMail(to: string, subject: string, content: string): void {
		const options = {
			from: 'partyplannerx1@gmail.com',
			to: to,
			subject: subject,
			text: content,
		};

		this._transporter.sendMail(options, (error, info) => {
			if (error) {
				return console.log(`error: ${error}`);
			}
			console.log(`Message Sent ${info.response}`);
		});
	}
}
