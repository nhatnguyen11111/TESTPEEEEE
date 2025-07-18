import mongoose from 'mongoose';

export interface IPost {
  _id?: string;
  name: string;
  description: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PostSchema = new mongoose.Schema<IPost>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  image: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);