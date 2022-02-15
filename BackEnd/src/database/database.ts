import Mongoose from 'mongoose';
import envConfig from 'config';

export async function connectDB() {
    console.log(envConfig.db.host);
    return Mongoose.connect(envConfig.db.host);
}

export function useVirtualId(schema: Mongoose.Schema) {
    schema.virtual('id').get(function (this: {_id: Mongoose.ObjectId}) {
        return this._id.toString();
    });
    schema.set('toJSON', { virtuals: true });
}