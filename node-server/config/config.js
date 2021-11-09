const env = process.env.NODE_ENV || "dev";
process.env.NODE_ENV = env;
console.log(env);
const config = {
  dev: {
    conn:'***',
    jwt_secret:'***'
  },
  prod: {
    conn:'***',
    jwt_secret:'***'
  },
};

module.exports = config[env];