import mongoose from 'mongoose';
import Envconfigs from './Classes/EnvConfigs';

class Database {

  /** Mongo db config */
  config = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  connect(){
    // warning disable
    mongoose.set('useFindAndModify', false);

    const uri = `mongodb://${Envconfigs.DB_HOST}:${Envconfigs.DB_PORT}/${Envconfigs.DB_NAME}`;

    /** Create db connection */
    mongoose.connect(uri, this.config)
      .then(db => console.log('DB is connected'))
      .catch(err => console.error(err));
  }
}

const database = new Database();
export default database;
