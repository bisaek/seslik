export interface Item {
	id?: string;
	name?: string;
	price?: number;
	quantity?: number;
	stocks?: number;
	url?: string;
}

export interface Order {
	items?: Item[];
	id?: string;
	totalPrice?: number;
	exists?: boolean;
	elevNr: number;
	levering: boolean;
	name: string;
	roomNumber: number;
}
