'use strict';

const router = require('express').Router();
const validation = require('./validation');
const authentication = require('../../common/middlewares/authentication');
const controller = require('./controller');

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: account management
 */

/**
 * @swagger
 * /api/v1/accounts/branch/{branch}/account/{account}/type/{type}/balance:
 *   get:
 *     description: Returns balance for account
 *     tags:
 *      - Accounts
 *     parameters:
 *     - in: path
 *       name: branch
 *       required: true
 *       schema:
 *         type: string
 *     - in: path
 *       name: account
 *       required: true
 *       schema:
 *         type: string
 *     - in: path
 *       name: type
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: account information
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   balance:
 *                     type: string
 *                     example: "$1,100.00"
 *                   branch:
 *                     type: string
 *                     example: "0001"
 *                   account:
 *                     type: string,
 *                     example: "12345"
 *                   type:
 *                     type: string,
 *                     example: "CHECKING"
 *
 */
router.get(
  '/branch/:branch/account/:account/type/:type/balance',
  authentication,
  async (req, res, next) => {
    try {
      const { branch, account, type } = req.params;

      const result = await controller.getBalance({ account, branch, type });

      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  }
);

/**
 * @swagger
 * /api/v1/accounts/transfer:
 *   post:
 *     description: Creates a new tranfer
 *     tags:
 *      - Accounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *               type: object
 *               properties:
 *                  origin:
 *                     type: object
 *                     properties:
 *                        branch:
 *                          type: string
 *                          example: "0001"
 *                        account:
 *                          type: string
 *                          example: "12345"
 *                        type:
 *                          type: string
 *                          example: "CHECKING"
 *                  destiny:
 *                     type: object
 *                     properties:
 *                        branch:
 *                          type: string
 *                          example: "0001"
 *                        account:
 *                          type: string
 *                          example: "12345"
 *                        type:
 *                          type: string
 *                          example: "SAVINGS"
 *                  amount:
 *                     type: number
 *                     example: 100
 *     responses:
 *       200:
 *         description: account information
 */
router.post(
  '/transfer',
  authentication,
  validation.transfer,
  async (req, res, next) => {
    try {
      const { amount, origin, destiny } = req.body;

      const result = await controller.transfer({
        amount,
        origin,
        destiny,
      });

      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
