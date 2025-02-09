// place files you want to import through the `$lib` alias in this folder.
export const avg_val = (len = 10) => {
	let vals: number[] = new Array(len).fill(0);
	let i = 0;
	return (val: number) => {
		vals[i] = val;
		i = (i + 1) % vals.length;
		return vals.reduce((a, b) => a + b) / vals.length;
	};
};
