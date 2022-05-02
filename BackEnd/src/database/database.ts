import Mongoose from 'mongoose';
import envConfig from 'config';

export async function connectDB() {
  // return Mongoose.connect("mongodb://localhost:27017/wemet");
  return Mongoose.connect(
    `mongodb+srv://${envConfig.db.id}:${envConfig.db.pwd}@cluster0.64tui.mongodb.net/test?retryWrites=true&w=majority`
  );
}

export function useVirtualId(schema: Mongoose.Schema) {
  schema.virtual('id').get(function (this: { _id: Mongoose.ObjectId }) {
    return this._id.toString();
  });
  schema.set('toJSON', { virtuals: true });
  schema.set('toObject', { virtuals: true });
}
