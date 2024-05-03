export interface Settings {
	regexFlag: string;
  vulIp: string,
  vulPass: string
  vulPort: number
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

export enum CTFNotificationType {
  success,
  error
}

export interface CTFNotification{
  id?: string
  type: CTFNotificationType,
  message: string,
  title: string,
}
