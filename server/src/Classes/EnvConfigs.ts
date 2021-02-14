
class MollaEnv {
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;

    constructor(){
        this.DB_HOST = process.env.DB_HOST as string;
        this.DB_PORT = Number.parseInt(process.env.DB_PORT as string);
        this.DB_NAME = process.env.DB_NAME as string;
        this.PORT = Number.parseInt(process.env.PORT as string);
    }
}

const Envconfigs = new MollaEnv();
export default Envconfigs;
