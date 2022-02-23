
const mongoose = require('mongoose');
const Joi = require("joi");
const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        minlength: 5
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
const Customer = mongoose.model('Customer', CustomerSchema);

const validateCustomer=(customer)=>{
    const schema =Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    });
  return schema.validate(customer);
}
exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
