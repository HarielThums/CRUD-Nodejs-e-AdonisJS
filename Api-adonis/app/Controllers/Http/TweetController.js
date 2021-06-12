"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Tweet = use("App/Models/Tweet");
const User = use("App/Models/User");

/**
 * Resourceful controller for interacting with tweets
 */
class TweetController {
	/**
	 * Show a list of all tweets.
	 * GET tweets
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({ request, response, view }) {
		const tweets = await Tweet.query().with("User").fetch(); // trazendo as informações da tabela User, por meio do relacionamento

		return tweets;
	}

	/**
	 * Create/save a new tweet.
	 * POST tweets
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store({ request, response, auth }) {
		const data = request.only(["content"]);

		const tweet = await Tweet.create({ user_id: auth.user.id, ...data });

		return tweet;
	}

	/**
	 * Display a single tweet.
	 * GET tweets/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async show({ params, request, response, view }) {
		const tweet = await Tweet.findOrFail(params.id);

		return tweet;
	}

	/**
	 * Delete a tweet with id.
	 * DELETE tweets/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params, request, response, auth }) {
		const tweet = await Tweet.findOrFail(params.id);

		if (tweet.user_id !== auth.user.id) return response.status(401);

		await tweet.delete();

		return response.status(200).send("deleted");
	}
}

module.exports = TweetController;
