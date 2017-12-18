module.exports = {

  development: {
    client: 'pg',
    connection: 'postgress://localhost/garage_bin',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  }

};
