export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongo_url: process.env.MONGODB,
    port: process.env.PORT || 3000,
})

