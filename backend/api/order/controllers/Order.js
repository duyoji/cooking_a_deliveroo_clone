"use strict";

require('dotenv').config();

/**
 * docs
 *
 * https://strapi.io/documentation/3.0.0-beta.x/guides/controllers.html#core-controllers
 */


/**
 * Order.js controller
 *
 * @description: A set of functions called "actions" for managing `Order`.
 */

const stripe = require("stripe")(process.env.STRIPE_SEC_KEY);

module.exports = {
  /**
   * Retrieve order records.
   *
   * @return {Object|Array}
   */

  // find: async ctx => {
  //   if (ctx.query._q) {
  //     return strapi.services.order.search(ctx.query);
  //   } else {
  //     return strapi.services.order.fetchAll(ctx.query);
  //   }
  // },

  /**
   * Retrieve a order record.
   *
   * @return {Object}
   */

  // findOne: async ctx => {
  //   if (!ctx.params.id.match(/^[0-9a-fA-F]{24}$/)) {
  //     return ctx.notFound();
  //   }

  //   return strapi.services.order.fetch(ctx.params);
  // },

  /**
   * Count order records.
   *
   * @return {Number}
   */

  // count: async ctx => {
  //   return strapi.services.order.count(ctx.query);
  // },

  /**
   * Create a/an order record.
   *
   * @return {Object}
   */

  create: async ctx => {
    const { address, amount, dishes, token, city, state } = ctx.request.body;

    const charge = await stripe.charges.create({
      amount,
      currency: "JPY",
      description: `注文 ${new Date()} by ${ctx.state.user.username} ${ctx.state.user.email}`,
      source: token
    });

    // Register the order in the database
    const order = await strapi.services.order.create({
      user: ctx.state.user.id,
      address,
      amount,
      dishes,
      city,
      charge
    });

    return order;
  },

  /**
   * Update a/an order record.
   *
   * @return {Object}
   */

  // update: async (ctx, next) => {
  //   return strapi.services.order.edit(ctx.params, ctx.request.body);
  // },

  /**
   * Destroy a/an order record.
   *
   * @return {Object}
   */

  // destroy: async (ctx, next) => {
  //   return strapi.services.order.remove(ctx.params);
  // }
};
