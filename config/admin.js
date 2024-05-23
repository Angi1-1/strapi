module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'yourAdminJwtSecret'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'QXJlTm90UmFuZG9tU3RyaW5n'), // Reemplaza este valor con el salt generado
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
