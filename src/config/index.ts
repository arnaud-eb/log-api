import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";

type EnvConfig = {
  port?: number;
};

let envConfig: EnvConfig;

if (stage === "production") {
  const module = await import("./prod.ts");
  envConfig = module.default;
} else if (stage === "testing") {
  const module = await import("./testing.ts");
  envConfig = module.default;
} else {
  const module = await import("./local.ts");
  envConfig = module.default;
}

const defaultConfig = {
  stage,
  env: process.env.NODE_ENV,
  port: 3000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL,
  },
  logging: false,
};

export default merge(defaultConfig, envConfig);
