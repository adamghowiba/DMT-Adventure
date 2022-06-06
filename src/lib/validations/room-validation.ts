import { string, number, array, object } from 'yup';

export const roomSchema = object({
	name: string().required(),
	price: number().required(),
	beds: array().required(),
	id: number().required(),
	stock: number().required()
});
