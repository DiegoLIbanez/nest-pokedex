export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongo_url: process.env.MONGO_URI,
    port: process.env.PORT || 3000,
})

