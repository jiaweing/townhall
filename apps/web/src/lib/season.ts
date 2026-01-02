import { differenceInWeeks } from "date-fns";

export interface Season {
	id: string;
	number: number;
	title: string;
	startDate: Date;
	endDate: Date;
}

// Hardcoded start date for Season 1 (Example: Starts next Monday)
const SEASON_1_START = new Date(); // Today for development
SEASON_1_START.setHours(0, 0, 0, 0);

export const CURRENT_SEASON: Season = {
	id: "s1",
	number: 1,
	title: "Genesis",
	startDate: SEASON_1_START,
	endDate: new Date(SEASON_1_START.getTime() + 6 * 7 * 24 * 60 * 60 * 1000), // 6 weeks
};

export function isSeasonActive(season: Season = CURRENT_SEASON): boolean {
	const now = new Date();
	return now >= season.startDate && now <= season.endDate;
}

export function getSeasonWeek(season: Season = CURRENT_SEASON): number {
	const now = new Date();
	if (now < season.startDate) return 0;
	if (now > season.endDate) return 7; // Finished

	return differenceInWeeks(now, season.startDate) + 1;
}

export function getLeagueId(
	seasonId: string,
	weekNumber: number,
	leagueIndex: number,
): string {
	return `${seasonId}-w${weekNumber}-l${leagueIndex}`;
}
