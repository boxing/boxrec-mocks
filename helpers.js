const rp = require("request-promise");
const fs = require("fs");

async function getBoxerById(cookieJar, boxrecBoxerId) {
    return rp.get({
        uri: `http://boxrec.com/en/boxer/${boxrecBoxerId}`,
        jar: cookieJar,
    });
}

async function getChampions(cookieJar) {
    return rp.get({
        uri: "http://boxrec.com/en/champions",
        jar: cookieJar,
    });
}

async function getRatings(cookieJar, qs = {}) {

    for (let i in qs) {
        qs[`r[${i}]`] = qs[i];
        delete qs[i];
    }

    return rp.get({
        uri: "http://boxrec.com/en/ratings",
        jar: cookieJar,
        qs,
    });
}

async function getSearch(cookieJar, qs = {}) {

    for (let i in qs) {
        qs[`pf[${i}]`] = qs[i];
        delete qs[i];
    }

    return rp.get({
        uri: "http://boxrec.com/en/search",
        jar: cookieJar,
        qs,
    });
}

async function getEvent(cookieJar, eventId) {
    return rp.get({
        uri: `http://boxrec.com/en/event/${eventId}`,
        jar: cookieJar,
    });
}

async function getLocation(cookieJar, qs = {}) {

    for (let i in qs) {
        qs[`l[${i}]`] = qs[i];
        delete qs[i];
    }

    return rp.get({
        uri: "http://boxrec.com/en/locations/people",
        jar: cookieJar,
        qs,
    });
}

async function getBoxerAndSave(cookieJar, boxrecBoxerId, filename = "test.log", callback = () => {
}) {
    const response = await getBoxerById(cookieJar, boxrecBoxerId);
    fs.writeFile(`./pages/profile/${filename}`, response, callback);
}

async function getChampionsAndSave(cookieJar, callback = () => {
}) {
    const response = await getChampions(cookieJar);
    fs.writeFile("./pages/champions/mockChampions.html", response, callback);
}

async function getRatingsAndSave(cookieJar, qs, filename = "test.log", callback = () => {
}) {
    const response = await getRatings(cookieJar, qs);
    fs.writeFile(`./pages/ratings/${filename}`, response, callback);
}

async function getEventAndSave(cookieJar, eventId, filename = "test.log", callback = () => {
}) {
    const response = await getEvent(cookieJar, eventId);
    fs.writeFile(`./pages/events/${filename}`, response, callback);
}

async function getSearchAndSave(cookieJar, qs, filename = "test.log", callback = () => {
}) {
    const response = await getSearch(cookieJar, qs);
    fs.writeFile(`./pages/search/${filename}`, response, callback);
}

async function getLocationAndSave(cookieJar, qs, filename = "test.log", callback = () => {
}) {
    const response = await getLocation(cookieJar, qs);
    fs.writeFile(`./pages/location/${filename}`, response, callback);
}


module.exports = {
    getBoxerAndSave,
    getChampionsAndSave,
    getRatingsAndSave,
    getEventAndSave,
    getLocationAndSave,
    getSearchAndSave,
};
