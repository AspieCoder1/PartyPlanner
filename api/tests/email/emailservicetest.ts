import {Emailservice} from '../../src/email/Emailservice'; 
 
let testEmail = new Emailservice(); 

testEmail.sendMail( 
  'sayed.sayed@student.manchester.ac.uk',  
  'Hello',  
  'Hello from gmailService'); 