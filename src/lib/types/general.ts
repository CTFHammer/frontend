export interface Settings {
	regexFlag: string;
}

export interface Conversation {
	message: {
		sender: 'client' | 'server';
		message: string;
	}[];
	project_name: string;
	timestamp: string;
}
