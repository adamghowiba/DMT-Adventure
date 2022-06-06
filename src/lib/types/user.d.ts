import type { Address } from "./listing";

export type UserRole  = 'admin' | 'vendor' | 'user';

export interface User {
	email: string;
	firstName: string;
	lastName: string;
	role: UserRole;
	home?: Address;
	phone?: number;
}
