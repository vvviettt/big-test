/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { log } from 'console';
import ImageKit from 'imagekit';
import { env } from 'src/config/env.config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MediaStorageService {
    private imagekit: ImageKit;

    constructor() {
        this.imagekit = new ImageKit({
            publicKey: env.IMAGEKIT.IMAGEKIT_PUBLIC_KEY,
            privateKey: env.IMAGEKIT.IMAGEKIT_PRIVATE_KEY,
            urlEndpoint: env.IMAGEKIT.IMAGEKIT_URL_ENDPOINT
        });
    }

    test() {
        log('ok');
    }

    async saveFiles(files: any[]) {
        const images = [];
        for (const file of files) {
            try {
                const { buffer } = file;
                const fileName = uuidv4();
                const res = await this.imagekit.upload({
                    file: buffer,
                    fileName
                });
                images.push(res.url);
            } catch (e) {}
        }
        return images;
    }
}
