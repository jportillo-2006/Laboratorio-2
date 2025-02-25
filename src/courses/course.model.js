import { Schema, model } from 'mongoose';

const courseSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLength: [25, 'Cannot exceed 25 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: [100, 'Cannot exceed 25 characters']
    },
    status: {
        type: Boolean,
        default: true
    }
});

export default model('Course', courseSchema);