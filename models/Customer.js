import mongoose from 'mongoose'

const PhoneNumberSchema = new mongoose.Schema({
  number: String
})

const CustomerSchema = new mongoose.Schema({
  name: String,
  firstName: String,
  lastName: String,
  company: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  businessType: String,
  // phoneNumbers: [PhoneNumberSchema],
  phoneNumbers: String,
  email: String,
  referredBy: String,
  adSource: String,
  useMeAsReference: Boolean
  
})

const Customer = mongoose.model('customer', CustomerSchema)

export default Customer