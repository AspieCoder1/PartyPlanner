import { EmailService } from '../../src/email/EmailService';

const testEmail: EmailService = new EmailService();

testEmail.sendMail(
	'sayed.sayed@student.manchester.ac.uk',
	'Hello',
	'Hello from gmailService'
);
