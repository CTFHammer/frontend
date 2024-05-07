import { format, parseISO } from 'date-fns';

export function parseDate(dateISO: string) {
	try {
		const rest = parseISO(dateISO);
		return format(rest, 'k:m.sSSS d/L/y ');
	} catch (e) {
		return 'invalid date';
	}
}
