var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var companySchema = new Schema({

  company: { type: String },

  ticker:    { type: String }

});

module.exports = mongoose.model('Company', companySchema);
