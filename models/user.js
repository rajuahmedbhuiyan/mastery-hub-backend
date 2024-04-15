
const mongoose = require('mongoose');


const rolesEnums = ["ROLE_OWNER", "ROLE_ADMIN", "ROLE_USER", "ROLE_STUDENT", "ROLE_TEACHER", "ROLE_MANAGER", "ROLE_DEVELOPER"];
const statusEnums = ["ACTIVE", "INACTIVE", "PENDING", "SUSPENDED", "DELETED"];

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastname: {
        type: String,
        required: [true, 'Last name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address`
        },
        unique: true


    },
    password: {
        type: String,
        minlength: [6, 'Password is too short'],
        required: [true, 'Password is required'],
    },
    roles: {
        type: [{
            type: String,
            enum: rolesEnums
        }],
        default: ["ROLE_USER"]
    },
    image: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: statusEnums,
        default: "ACTIVE"
    }

}

);

module.exports = mongoose.model('User', userSchema);

