export const config = () => ({
  port: parseInt(process.env.PORT) || 3000 ,
  secret: process.env.SECRET || "token_secret",
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: ['dist/**/*.entity.js'],
  },
});