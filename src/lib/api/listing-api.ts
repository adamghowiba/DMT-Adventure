import { PLACES } from '../constants/places';

const getListingById = (id: number) => {
	return PLACES.find((place) => place.id === id);
};

export default { getListingById };
