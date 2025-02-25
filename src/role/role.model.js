import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

export default mongoose.model('Role', roleSchema);