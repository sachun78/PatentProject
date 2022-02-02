import Mongoose from 'mongoose';
import config from 'config';

export async function connectDB() {
    return Mongoose.connect(config.db.host);
}

export function useVirtualId(schema: Mongoose.Schema) {
    schema.virtual('id').get(function (this: {_id: Mongoose.ObjectId}) {
        return this._id.toString();
    });
    schema.set('toJSON', { virtuals: true });
}