const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }]
});

// Change some keys identifiers of the response object
DoctorSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Doctor', DoctorSchema);