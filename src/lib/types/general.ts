export interface Settings {
	regexFlag: string;
	vulIp: string;
	vulPass: string;
	vulPort: number | string;
	vulUser: string;
	ssh_active: boolean;
	ssh_docker_present: boolean;
	durationDump: number | string;
}

export interface Conversation {
	message: {
		sender: 'client' | 'server';
		message: string;
		format: 'hex' | 'ascii';
		converted: boolean;
	}[];
	project_name: string;
	timestamp: string;
	flag_tag: string;
}

export interface Project {
	id: string;
	name: string;
	pid_tcpdump: string;
	task_total: string;
	port: number;
}

export enum CTFNotificationType {
	success,
	error
}

export interface CTFNotification {
	id?: string;
	type: CTFNotificationType;
	message: string;
	title: string;
}
