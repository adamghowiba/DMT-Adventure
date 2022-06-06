import { USER } from '$lib/constants/user';
import type { GetSession } from '@sveltejs/kit';

export const getSession: GetSession = (event) => {
	return { user: USER };
};
