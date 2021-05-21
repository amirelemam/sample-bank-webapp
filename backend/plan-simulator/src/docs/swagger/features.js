module.exports = {
  getAll: {
    tags: ['Features'],
    summary: 'Returns all features',
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
                  priceType: {
                    type: 'string',
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
};
