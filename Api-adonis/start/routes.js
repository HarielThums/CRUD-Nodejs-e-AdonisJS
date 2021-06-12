"use strict";

const { route } = require("@adonisjs/framework/src/Route/Manager");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
	return { greeting: "Hello world in JSON" };
}).middleware(["auth"]);

Route.post("/register", "AuthController.register");
Route.post("/authenticate", "AuthController.authenticate");

// Recebendo todas as rotas criadas em tweetController de uma unica vez,'test: "adonis route list" '
Route.group(() => {
	Route.resource("tweets", "TweetController")
		.apiOnly() // informando que são apenas rotas para api.
		.except('update'); // removendo a rota 'update'
}).middleware(["auth"]);
