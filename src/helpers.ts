import * as fs from "fs";
import {CookieJar} from "request";
import * as shell from "shelljs";
import {BoxrecRole} from "boxrec-requests/dist/boxrec-requests.constants";
import {BoxrecRequests} from "boxrec-requests";

async function
getPersonAndSave(cookieJar: CookieJar, boxrecBoxerId: number, filename = "test.log", role: BoxrecRole, callback =
    () => {/**/
    }): Promise<void> {
    const response: string = await BoxrecRequests.getPersonById(cookieJar, boxrecBoxerId, role);
    writeTo(`./src/pages/profile/`, filename, response, callback);
}

async function getChampionsAndSave(cookieJar: CookieJar, callback = () => {/**/
}): Promise<void> {
    const response: string = await BoxrecRequests.getChampions(cookieJar);
    writeTo("./src/pages/champions/", "mockChampions.html", response, callback);
}

async function getRatingsAndSave(cookieJar: CookieJar, qs: any, filename = "test.log", callback = () => {/**/
}): Promise<void> {
    const response: string = await BoxrecRequests.getRatings(cookieJar, qs);
    writeTo(`./src/pages/ratings/`, filename, response, callback);
}

async function getEventAndSave(cookieJar: CookieJar, eventId: number, filename = "test.log", callback = () => {/**/
}): Promise<void> {
    const response: string = await BoxrecRequests.getEventById(cookieJar, eventId);
    writeTo(`./src/pages/events/`, filename, response, callback);
}

async function getSearchAndSave(cookieJar: CookieJar, qs: any, filename = "test.log", callback = () => {/**/
}): Promise<void> {
    const response: string = await BoxrecRequests.search(cookieJar, qs);
    writeTo(`./src/pages/search/`, filename, response, callback);
}

async function getPeopleByLocationAndSave(cookieJar: CookieJar, qs: any, filename = "test.log", callback = () => {/**/
}): Promise<void> {
    const response: string = await BoxrecRequests.getPeopleByLocation(cookieJar, qs);
    writeTo(`./src/pages/location/`, filename, response, callback);
}

async function getEventsByLocationAndSave(cookieJar: CookieJar, qs: any, filename = "test.log", callback = () => {/**/
}): Promise<void> {
    const response: string = await BoxrecRequests.getEventsByLocation(cookieJar, qs);
    writeTo(`./src/pages/location/`, filename, response, callback);
}

async function getScheduleAndSave(cookieJar: CookieJar, qs: any, filename = "test.log", callback = () => {/**/
}): Promise<void> {
    const response: string = await BoxrecRequests.getSchedule(cookieJar, qs);
    writeTo(`./src/pages/schedule/`, filename, response, callback);
}

async function getVenueAndSave(cookieJar: CookieJar, qs: any, filename = "test.log", callback = () => {/**/
}): Promise<void> {
    const response: string = await BoxrecRequests.getVenueById(cookieJar, qs);
    writeTo(`./src/pages/venue/`, filename, response, callback);
}

async function getBeltInformationAndSave(cookieJar: CookieJar, belt: any, filename = "test.log", callback = () => {/**/
}): Promise<void> {
    const response: string = await BoxrecRequests.getTitleById(cookieJar, belt);
    writeTo(`./src/pages/title/`, filename, response, callback);
}

async function getTitlesAndSave(cookieJar: CookieJar, qs: any, filename = "test.log", callback = () => {
}) {
    const response = await BoxrecRequests.getTitles(cookieJar, qs);
    writeTo(`./src/pages/titles/`, filename, response, callback);
}

async function getResultsAndSave(cookieJar: CookieJar, qs: any, filename = "test.log", callback = () => {/**/
}): Promise<void> {
    const response: string = await BoxrecRequests.getResults(cookieJar, qs);
    writeTo(`./src/pages/results/`, filename, response, callback);
}

async function getBoutAndSave(cookieJar: CookieJar, url: string, filename = "test.log", callback = () => {/**/
}): Promise<void> {
    const response: string = await BoxrecRequests.getBout(cookieJar, url);
    writeTo(`./src/pages/events/bout/`, filename, response, callback);
}

async function getDateAndSave(cookieJar: CookieJar, dateString: string, filename = "test.log", callback = () => {/**/
}): Promise<void> {
    const response: string = await BoxrecRequests.getDate(cookieJar, dateString);
    writeTo(`./src/pages/date/`, filename, response, callback);
}

async function getWatchedAndSave(cookieJar: CookieJar, filename = "test.log", callback = () => {/**/
}): Promise<void> {
    const response: string = await BoxrecRequests.getWatched(cookieJar);
    writeTo(`./src/pages/watch/`, filename, response, callback);
}

const writeTo: (fullPath: string, fileName: string, response: string, callback: any) => void =
    (fullPath: string, fileName: string, response: string, callback: any): void => {
        console.log("try to create directory structure:", fullPath);
        shell.mkdir("-p", fullPath);
        console.log("write to file:", fullPath + fileName);
        return fs.writeFile(fullPath + fileName, response, callback);
    };

export {
    getPersonAndSave,
    getChampionsAndSave,
    getRatingsAndSave,
    getEventsByLocationAndSave,
    getEventAndSave,
    getTitlesAndSave,
    getPeopleByLocationAndSave,
    getSearchAndSave,
    getScheduleAndSave,
    getVenueAndSave,
    getBeltInformationAndSave,
    getResultsAndSave,
    getBoutAndSave,
    getDateAndSave,
    getWatchedAndSave,
};
