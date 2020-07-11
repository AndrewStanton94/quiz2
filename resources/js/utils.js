export const sortObjectListByKey =
	(
		list,
		key,
		fx = (a,b) => a[key] - b[key]
	) => list.sort(fx);
