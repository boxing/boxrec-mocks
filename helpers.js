const rp = require("request-promise");
const fs = require("fs");

// note: this is garbage in that the `BOXREC_USERNAME` better have toggleRatings=y otherwise it screws everything up
// so if it doesn't, use the browser to show the ratings and then run this
async function getPersonById(cookieJar, boxrecGlobalId, role = "boxer") {

    let queryString = "";

    return rp.get({
        uri: `http://boxrec.com/en/${role}/${boxrecGlobalId}${queryString}`,
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
        qs[`ktO[${i}]`] = qs[i];
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

async function getPeopleByLocation(cookieJar, qs = {}) {
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

async function getEventsByLocation(cookieJar, qs = {}) {
    for (let i in qs) {
        qs[`l[${i}]`] = qs[i];
        delete qs[i];
    }

    return rp.get({
        uri: "http://boxrec.com/en/locations/event",
        jar: cookieJar,
        qs,
    });
}

async function getSchedule(cookieJar, qs = {}) {
    for (let i in qs) {
        qs[`c[${i}]`] = qs[i];
        delete qs[i];
    }

    return rp.get({
        uri: "http://boxrec.com/en/schedule",
        jar: cookieJar,
        qs,
    });
}

async function getVenue(cookieJar, qs = {}) {
    return rp.get({
        uri: `http://boxrec.com/en/venue/${qs.id}`,
        jar: cookieJar,
    });
}

async function getBeltInformation(cookieJar, belt = null) {
    return rp.get({
        uri: `http://boxrec.com/en/title/${belt}`,
        jar: cookieJar,
    });
}

async function getResults(cookieJar, qs) {
    for (let i in qs) {
        qs[`c[${i}]`] = qs[i];
        delete qs[i];
    }

    return rp.get({
        uri: "http://boxrec.com/en/results",
        jar: cookieJar,
        qs,
    })
}

async function getDate(cookieJar, date) {
    return rp.get({
        uri: `http://boxrec.com/en/date?date=${date}`,
        jar: cookieJar,
    })
}

async function getBout(cookieJar, url) {
    return rp.get({
        uri: `http://boxrec.com/en/event/${url}`,
        jar: cookieJar,
    });
}

async function getPersonAndSave(cookieJar, boxrecBoxerId, filename = "test.log", role = "boxer", callback = () => {
}) {
    const response = await getPersonById(cookieJar, boxrecBoxerId, role);
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

async function getPeopleByLocationAndSave(cookieJar, qs, filename = "test.log", callback = () => {
}) {
    const response = await getPeopleByLocation(cookieJar, qs);
    fs.writeFile(`./pages/location/${filename}`, response, callback);
}

async function getEventsByLocationAndSave(cookieJar, qs, filename = "test.log", callback = () => {
}) {
    const response = await getEventsByLocation(cookieJar, qs);
    fs.writeFile(`./pages/location/${filename}`, response, callback);
}

async function getScheduleAndSave(cookieJar, qs, filename = "test.log", callback = () => {
}) {
    const response = await getSchedule(cookieJar, qs);
    fs.writeFile(`./pages/schedule/${filename}`, response, callback);
}

async function getVenueAndSave(cookieJar, qs, filename = "test.log", callback = () => {
}) {
    const response = await getVenue(cookieJar, qs);
    fs.writeFile(`./pages/venue/${filename}`, response, callback);
}

async function getBeltInformationAndSave(cookieJar, belt, filename = "test.log", callback = () => {
}) {
    const response = await getBeltInformation(cookieJar, belt);
    fs.writeFile(`./pages/title/${filename}`, response, callback);
}

async function getResultsAndSave(cookieJar, qs, filename = "test.log", callback = () => {
}) {
    const response = await getResults(cookieJar, qs);
    fs.writeFile(`./pages/results/${filename}`, response, callback);
}

async function getBoutAndSave(cookieJar, url, filename = "test.log", callback = () => {
}) {
    const response = await getBout(cookieJar, url);
    fs.writeFile(`./pages/events/bout/${filename}`, response, callback);
}

async function getDateAndSave(cookieJar, dateString, filename = "test.log", callback = () => {
}) {
    const response = await getDate(cookieJar, dateString);
    fs.writeFile(`./pages/date/${filename}`, response, callback);
}

module.exports = {
    getPersonAndSave,
    getChampionsAndSave,
    getRatingsAndSave,
    getEventsByLocationAndSave,
    getEventAndSave,
    getPeopleByLocationAndSave,
    getSearchAndSave,
    getScheduleAndSave,
    getVenueAndSave,
    getBeltInformationAndSave,
    getResultsAndSave,
    getBoutAndSave,
    getDateAndSave,
};
