const bcrypt = require('bcrypt');       
const saltRounds = 10;

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return reject(err);
            bcrypt.hash(password, salt, function(err, hash) {
                if(err) return reject(err);
                resolve(hash);
            });
        });

    })
}

const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}

module.exports = {
    hashPassword,
    comparePassword,
}
