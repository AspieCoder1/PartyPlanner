import { ImgurClient } from 'imgur';


export class Imageservice { 

 
uploadImage(location: string): void {

(async function(){

const client = new ImgurClient({
    username: "partyplannerx1",
    password: "UOM2021abc",
    clientId: "32d18e1fe0b8209",
  });

const response = await client.upload(location);
console.log(response);
})()

}

}
