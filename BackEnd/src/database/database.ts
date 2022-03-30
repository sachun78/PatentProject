import Mongoose from 'mongoose';
import envConfig from 'config';

export async function connectDB() {
    console.log(envConfig.db.host);
    //return Mongoose.connect(envConfig.db.host);
    return Mongoose.connect(`mongodb+srv://${envConfig.db.id}:${envConfig.db.pwd}@cluster0.64tui.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
}

export function useVirtualId(schema: Mongoose.Schema) {
    schema.virtual('id').get(function (this: {_id: Mongoose.ObjectId}) {
        return this._id.toString();
    });
    schema.set('toJSON', { virtuals: true });
}