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

export interface Project {
	id: string;
	name: string;
	port: number;
}
