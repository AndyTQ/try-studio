// Validate whether the id has the correct format.
const validateId = (id) => {
    let err = "";
    if (id === undefined || id == "") {
        err += "id cannot be empty.\n";
    } else if (!/^[a-z0-9]+$/i.test(id)) {
        err += "id should be alphanumeric.\n";
    }
    return err;
  };
  
const countDecimals = (num) => {
    const numStr = String(num);
    if (numStr.includes(".")) {
        return numStr.split(".")[1].length;
    }
    return 0;
};

// Validate the metadata (value) of an item.
const validateBusinessData = (data) => {
    let res = "";
    if (typeof data.country !== 'string' || data.country == ""){
        res += "ERROR: country is not a non-empty string \n";
    }
    if (typeof data.location !== 'string' || data.location == ""){
        res += "ERROR: location is not a non-empty string \n";
    }
    if (typeof data.name !== 'string' || data.name == ""){
        res += "ERROR: name is not a non-empty string \n";
    }
    if (isNaN(data.size)){
        res += "ERROR: size is not a number \n";
    }
    if (typeof data.type !== 'string' || data.type == ""){
        res += "ERROR: type is not a non-empty string \n";
    }
    if (res != "") console.log(res);
    return res;
};

// Validate the metadata (value) of an item.
const validateLicenseData = (data) => {
    let res = "";
    if (validateId(data.businessId) != ""){
        res += "ERROR: business id is not valid \n";
    }
    if (typeof data.cmo !== 'string' || data.cmo == ""){
        res += "ERROR: cmo is not a non-empty string \n";
    }
    if (
        data.price === undefined ||
        data.price == "" ||
        isNaN(data.price) ||
        countDecimals(data.price) > 2
    ) {
        res += "Invalid price (need decimal number (<=2 decimals) or integer.)\n";
    }
    if (typeof data.type !== 'string' || data.cmo == ""){
        res += "ERROR: type is not a non-empty string \n";
    }
    if (
        data.validity === undefined ||
        data.validity == "" ||
        isNaN(data.validity) ||
        data.validity % 1 != 0
    ) {
        res += "Quantity is not valid (needs to be an integer.)\n";
    }
    if (res != "") console.log(res);
    return res;
};

module.exports.validateId = validateId;
module.exports.validateBusinessData = validateBusinessData;
module.exports.validateLicenseData = validateLicenseData;