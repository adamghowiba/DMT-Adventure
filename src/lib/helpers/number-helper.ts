export const range = (start: number, end?: number) => {
	const maxOrder = Math.max(end || 0, start) - Math.min(end || 0, start);
	const rangeArray = Array.from({ length: maxOrder || start }, (_, x) =>
		end ? x + Math.min(end, start) : x
	);

	return rangeArray;
};
