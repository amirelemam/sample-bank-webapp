module.exports = {
  getAll: {
    tags: ['Plans'],
    summary: 'Returns all plans and their features',
    operationId: 'getAll',
    security: [],
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
                  id: {
                    type: 'string',
                  },
                  name: {
                    type: 'string',
                  },
                  price: {
                    type: 'number',
                    format: 'double',
                  },
                  extra: {
                    type: 'string',
                  },
                  free: {
                    type: 'number',
                    format: 'double',
                  },
                  pro: {
                    type: 'number',
                    format: 'double',
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
  selectBestPlan: {
    tags: ['Plans'],
    summary: 'Returns cheapest plan for features usage',
    operationId: 'selectBestPlan',
    security: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                },
                quantity: {
                  type: 'number',
                },
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
                cheaper: {
                  type: 'object',
                  properties: {
                    cost: {
                      type: 'number',
                    },
                    plan: {
                      type: 'string',
                    },
                  },
                },
                expensive: {
                  type: 'object',
                  properties: {
                    cost: {
                      type: 'number',
                    },
                    plan: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad Request',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },
};
