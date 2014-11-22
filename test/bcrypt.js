var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("mpr0xy", salt);

console.log(salt);
console.log(hash);

console.log(bcrypt.hashSync("mpr0xy", 10));

console.log(bcrypt.compareSync("mpr0xy", "$2a$10$8KyyCUYk1q5Q44HXIBBEweEkjrcfbRG1GuP5peNuNBGJLHv.fQ5xW"));
