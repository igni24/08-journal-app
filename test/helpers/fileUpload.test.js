import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
    cloud_name: 'igni24',
    api_key: '712299622574433',
    api_secret: 'S2CTBhoLfIaZE7S74gA30duxfPA',
    secure: true
});

describe('Pruebas en fileUpload', () => {
    test('Debe subir un archivo al servidor', async () => {
        const imageUrl = 'https://picsum.photos/100/100';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'test.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg','');

        await cloudinary.api.delete_resources([`journal/${imageId}`]);
    });

    test('Debe retornar null', async () => {
        const file = new File([], 'test.jpg');

        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
});