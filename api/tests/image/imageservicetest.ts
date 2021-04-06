import {ImageService} from '../../src/image/Imageservice';
import * as path from 'path';

const testImage = new ImageService();
const location = path.join(__dirname, 'testimage.png');
console.log(location);
const test = async () => {
	const response =  await testImage.uploadImage(location);
	console.log(response);
};

test();
