const  mongoose=require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    registrationtype: {
        type: String,
        required: true
    },
    numtickets: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});


var Candidates= mongoose.model('Candidate',candidateSchema);

module.exports= Candidates;