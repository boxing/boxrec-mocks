const fs = require("fs");
const {BoxrecRequests} = require("boxrec-requests");
const shell = require("shelljs");

async function getPersonAndSave(cookieJar, boxrecBoxerId, filename = "test.log", role = "boxer", callback = () => {
}) {
    const response = await BoxrecRequests.getPersonById(cookieJar, boxrecBoxerId, role);
    writeTo(`./dist/pages/profile/`, filename, response, callback);
}

async function getChampionsAndSave(cookieJar, callback = () => {
}) {
    const response = await BoxrecRequests.getChampions(cookieJar);
    writeTo("./dist/pages/champions/", "mockChampions.html", response, callback);
}

async function getRatingsAndSave(cookieJar, qs, filename = "test.log", callback = () => {
}) {
    const response = await BoxrecRequests.getRatings(cookieJar, qs);
    writeTo(`./dist/pages/ratings/`, filename, response, callback);
}

async function getEventAndSave(cookieJar, eventId, filename = "test.log", callback = () => {
}) {
    const response = await BoxrecRequests.getEventById(cookieJar, eventId);
    writeTo(`./dist/pages/events/`, filename, response, callback);
}

async function getSearchAndSave(cookieJar, qs, filename = "test.log", callback = () => {
}) {
    const response = await BoxrecRequests.search(cookieJar, qs);
    writeTo(`./dist/pages/search/`, filename, response, callback);
}

async function getPeopleByLocationAndSave(cookieJar, qs, filename = "test.log", callback = () => {
}) {
    const response = await BoxrecRequests.getPeopleByLocation(cookieJar, qs);
    writeTo(`./dist/pages/location/`, filename, response, callback);
}

async function getEventsByLocationAndSave(cookieJar, qs, filename = "test.log", callback = () => {
}) {
    const response = await BoxrecRequests.getEventsByLocation(cookieJar, qs);
    writeTo(`./dist/pages/location/`, filename, response, callback);
}

async function getScheduleAndSave(cookieJar, qs, filename = "test.log", callback = () => {
}) {
    const response = await BoxrecRequests.getSchedule(cookieJar, qs);
    writeTo(`./dist/pages/schedule/`, filename, response, callback);
}

async function getVenueAndSave(cookieJar, qs, filename = "test.log", callback = () => {
}) {
    const response = await BoxrecRequests.getVenueById(cookieJar, qs);
    writeTo(`./dist/pages/venue/`, filename, response, callback);
}

async function getBeltInformationAndSave(cookieJar, belt, filename = "test.log", callback = () => {
}) {
    const response = await BoxrecRequests.getTitleById(cookieJar, belt);
    writeTo(`./dist/pages/title/`, filename, response, callback);
}

async function getTitlesAndSave(cookieJar, qs, filename = "test.log", callback = () => {
}) {
    const response = await BoxrecRequests.getTitles(cookieJar, qs);
    writeTo(`./dist/pages/titles/`, filename, response, callback);
}

async function getResultsAndSave(cookieJar, qs, filename = "test.log", callback = () => {
}) {
    const response = await BoxrecRequests.getResults(cookieJar, qs);
    writeTo(`./dist/pages/results/`, filename, response, callback);
}

async function getBoutAndSave(cookieJar, url, filename = "test.log", callback = () => {
}) {
    const response = await BoxrecRequests.getBout(cookieJar, url);
    writeTo(`./dist/pages/events/bout/`, filename, response, callback);
}

async function getDateAndSave(cookieJar, dateString, filename = "test.log", callback = () => {
}) {
    const response = await BoxrecRequests.getDate(cookieJar, dateString);
    writeTo(`./dist/pages/date/`, filename, response, callback);
}

async function getWatchAndSave(cookieJar, boxerGlobalId, filename = "test.log", callback = () => {
}) {
    const response = await BoxrecRequests.watch(cookieJar, boxerGlobalId);
    writeTo(`./dist/pages/watch/`, filename, response, callback);
}

const writeTo = (fullPath, fileName, response, callback) => {
    console.log("try to create directory structure:", fullPath);
    shell.mkdir('-p', fullPath);
    console.log("write to file:", fullPath + fileName);
    return fs.writeFile(fullPath + fileName, response, callback);
};

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
    getTitlesAndSave,
    getWatchAndSave,
};
