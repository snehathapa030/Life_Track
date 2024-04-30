module.exports.wrapasync = (fn) => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next);
		} catch (err) {
			console.log(err.message);
			res.json({ error: err.message });
		}
	};
};
