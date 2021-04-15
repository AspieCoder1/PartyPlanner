// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ImgurClient } from 'imgur';
import * as fs from 'fs';

export class ImageService {
	private client = new ImgurClient({
		username: 'partyplannerx1',
		password: 'UOM2021abc',
		clientId: '32d18e1fe0b8209',
	});

	async uploadImage(file: string): Promise<any> {
		return await this.client.upload(file);
	}
}
