module.exports = {
  getBalance: {
    tags: ['Accounts'],
    summary: 'Returns balance for account',
    operationId: 'getBalance',
    security: [],
    parameters: [
      {
        in: 'query',
        name: 'branch',
        schema: {
          type: 'string',
        },
        required: true,
      },
      {
        in: 'query',
        name: 'account',
        schema: {
          type: 'string',
        },
        required: true,
      },
      {
        in: 'query',
        name: 'type',
        schema: {
          type: 'string',
        },
        required: true,
      },
    ],
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  balance: {
                    type: 'string',
                    example: '$1,100.00',
                  },
                  branch: {
                    type: 'string',
                    example: '0001',
                  },
                  account: {
                    type: 'string',
                    example: '12345',
                  },
                  type: {
                    type: 'string',
                    example: 'CHECKING',
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },
  transfer: {
    tags: ['Accounts'],
    summary: 'Creates a new tranfer',
    operationId: 'transfer',
    security: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              origin: {
                type: 'object',
                properties:
                {
                  branch: {
                    type: 'string',
                    example: '0001',
                  },
                  account: {
                    type: 'string',
                    example: '12345',
                  },
                  type: {
                    type: 'string',
                    example: 'CHECKING',
                  },
                },
              },
              destiny: {
                type: 'object',
                properties:
                {
                  branch: {
                    type: 'string',
                    example: '0001',
                  },
                  account: {
                    type: 'string',
                    example: '12345',
                  },
                  type: {
                    type: 'string',
                    example: 'SAVINGS',
                  },
                },
              },
              amount: {
                type: 'number',
                example: 100,
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                origin: {
                  type: 'object',
                  properties:
                  {
                    branch: {
                      type: 'string',
                      example: '0001',
                    },
                    account: {
                      type: 'string',
                      example: '12345',
                    },
                    type: {
                      type: 'string',
                      example: 'CHECKING',
                    },
                    balance: {
                      type: 'string',
                      example: '$1,000.00',
                    },
                  },
                },
              },
              destiny: {
                type: 'object',
                properties:
                {
                  branch:
                  {
                    type: 'string',
                    example: '0001',
                  },
                  account:
                  {
                    type: 'string',
                    example: '12345',
                  },
                  type:
                  {
                    type: 'string',
                    example: 'SAVINGS',
                  },
                  balance: {
                    type: 'string',
                    example: '$1,000.00',
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad Request',
        },
        422: {
          description: 'Unprocessable Entity',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },
};
