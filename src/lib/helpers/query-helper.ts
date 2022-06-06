export const getSearchListingQuery = (data: {
	location: string;
	checkIn?: Date;
	checkOut?: Date;
}) => {
    const {location, checkIn, checkOut} = data;
	const urlParams = new URLSearchParams();
	urlParams.set('location', location);

    if (checkIn) urlParams.set('checkin', checkIn.toLocaleDateString('en-us', { dateStyle: 'medium' }));
	if (checkOut) urlParams.set('checkout', checkOut.toLocaleDateString('en-us', { dateStyle: 'medium' }));

    return urlParams.toString();
};


