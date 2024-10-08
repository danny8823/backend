const mongoose = rquiore('mongoose')

const todoSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.types.ObjectId,
            ref:'User'
        },
        task: {
            type: String,
            required: true
        },
        done: {
            type: Boolean,
            default: false
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)w