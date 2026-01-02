export const XP_VALUES = {
	POST_UPDATE: 100,
	STREAK_BONUS: 50,
	HIGH_FIVE: 10, // Giving a like
	RECEIVE_HIGH_FIVE: 5, // Receiving a like
} as const;

export type XpAction = keyof typeof XP_VALUES;

export const LEAGUE_SIZE = 50;

/**
 * Calculates the XP for a given action.
 * Can be expanded to include multipliers, active streak bonuses, etc.
 */
export function calculateXp(
	action: XpAction,
	currentStreak: number = 0,
): number {
	let xp = XP_VALUES[action];

	if (action === "POST_UPDATE" && currentStreak > 0) {
		// Determine streak bonus logic here.
		// For now, flat bonus if you have a streak.
		xp += XP_VALUES.STREAK_BONUS;
	}

	return xp;
}

/**
 * Determines the level based on total XP.
 * Simple formula: Level = floor(sqrt(XP / 100))
 */
export function calculateLevel(totalXp: number): number {
	if (totalXp < 0) return 0;
	return Math.floor(Math.sqrt(totalXp / 100)) + 1;
}

/**
 * Returns the XP required to reach the next level.
 */
export function xpForNextLevel(currentLevel: number): number {
	return currentLevel ** 2 * 100;
}
