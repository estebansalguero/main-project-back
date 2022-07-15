// helpers file

// dependencies


// container
const helpers = {};


helpers.parseJsonToObject = function (str) {
  try {
    var obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
};

// export the module
module.exports = helpers;
