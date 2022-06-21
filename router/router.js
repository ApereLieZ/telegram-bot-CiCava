const router = require("express").Router();
const controller = require("../controllers/controller");
const bot = require("../controllers/bot");
router.use(controller.checkAutorization);



router.post("/order", (req, res) => {
    var correctJson = JSON.stringify(req.body).replace(/:\s*"([^"]*)"/g, function(match, p1) {
		return ': "' + p1.replace(/:/g, '@colon@') + '"';
	})

	// Replace ":" with "@colon@" if it's between single-quotes
	.replace(/:\s*'([^']*)'/g, function(match, p1) {
		return ': "' + p1.replace(/:/g, '@colon@') + '"';
	})

	// Add double-quotes around any tokens before the remaining ":"
	.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')

	// Turn "@colon@" back into ":"
	.replace(/@colon@/g, ':')
    bot.messageBroadcaster(correctJson);
    res.send("ok");
})

module.exports = router;