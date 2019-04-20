const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid'), hashSum = require('hash-sum');
const charMap = new Map([['@.?', 1], ['abc', 2], ['def', 3], ['ghi', 4], ['jkl', 5], ['mno', 6], ['pqrs', 7], ['tuv', 8], ['wxyz', 9]]);



const HeroSchema = new Schema({
    heroId: String,
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String
    },
    phone: {
        countryCode: Number,
        number: Number
    }
}, {
        versionKey: false
    });

HeroSchema.index({
    phone: 1
}, { required: 1, unique: true });

HeroSchema.pre('save', function (next) {
    this.heroId = hashSum(uuid());
    let charCode = Array.from(this.name.toLowerCase());
    let codes = [...charMap.keys()];
    charCode = charCode.map((char) => {
        for (let code of codes) {
            if (code.includes(char)) return charMap.get(code);
        }
    })
    this.code = charCode.join('');
    next();
})

module.exports = mongoose.model('Hero', HeroSchema);
