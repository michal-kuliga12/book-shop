import mongoose from 'mongoose'
const { Schema } = mongoose;

const RefreshToken = new Schema({
    token: {
        type: String,
        unique: true,
        required: true
    }
})

const Token = mongoose.model('Token',RefreshToken);
export default Token;