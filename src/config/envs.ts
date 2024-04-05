import 'dotenv/config';
import * as joi from 'joi';


interface EnvVars { 
    PORT: number;
    PRODUCTS_MICROSERVICE_HOST: string;
    PRODUCTS_MICROSERVICE_PORT: number;
    ORDERS_MICROSERVICE_HOST: string;
    ORDERS_MICROSERVICE_PORT: number;
}

const envVarsSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
    ORDERS_MICROSERVICE_HOST: joi.string().required(),
    ORDERS_MICROSERVICE_PORT: joi.number().required(),
}).unknown(true);

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVarsConfig: EnvVars = envVars;

export const envs = {
    port: envVarsConfig.PORT,
    productsMicroservicePort: envVarsConfig.PRODUCTS_MICROSERVICE_PORT,
    productsMicroserviceHost: envVarsConfig.PRODUCTS_MICROSERVICE_HOST,
    ordersMicroservicePort: envVarsConfig.ORDERS_MICROSERVICE_PORT,
    ordersMicroserviceHost: envVarsConfig.ORDERS_MICROSERVICE_HOST,
}