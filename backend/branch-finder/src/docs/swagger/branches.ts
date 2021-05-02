export default {
  getAll: {
    tags: ['Branches'],
    summary: 'Returns all branches according to filters',
    operationId: 'getAll',
    security: [],
    parameters: [
      {
        in: 'query',
        name: 'lat',
        schema: {
          type: 'number',
        },
        required: false,
      },
      {
        in: 'query',
        name: 'lon',
        schema: {
          type: 'number',
        },
        required: false,
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
                  location: {
                    type: 'object',
                    properties: {
                      type: {
                        type: 'string'
                      },
                      coordinates: {
                        type: 'array',
                        items: {
                          type: 'number',
                          format: 'double',
                        }
                      }
                    }
                  },
                  name: {
                    type: 'string',
                  },
                  address: {
                    type: 'string',
                  },
                  city: {
                    type: 'string',
                  },
                  state: {
                    type: 'string',
                  },
                  zipCode: {
                    type: 'string',
                  },
                  country: {
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
