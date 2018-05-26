const rp = require("request-promise");
const {getBoxerAndSave, getChampionsAndSave, getRatingsAndSave, getEventAndSave, getSearchAndSave} = require("./helpers");
const {BOXREC_USERNAME, BOXREC_PASSWORD} = process.env;


if (!BOXREC_USERNAME) {
    throw new Error("missing required env var BOXREC_USERNAME");
}

if (!BOXREC_PASSWORD) {
    throw new Error("missing required env var BOXREC_PASSWORD");
}

const boxers = {
    RoyJonesJr: 774820,
    GennadyGolovkin: 356831,
};

const events = {
    BellewHaye2: 761332,
};

(async () => {

    const cookieJar = rp.jar();

    const rawCookies = await rp.get({
        uri: "http://boxrec.com",
        resolveWithFullResponse: true,
    }).then(data => data.headers["set-cookie"]);


    const cookie = rp.cookie(rawCookies[0]); // create the cookie
    cookieJar.setCookie(cookie, "http://boxrec.com", () => {
    });

    const options = {
        uri: "http://boxrec.com/en/login", // boxrec does not support HTTPS
        followAllRedirects: true, // 302 redirect occurs
        resolveWithFullResponse: true,
        formData: {
            "_username": BOXREC_USERNAME,
            "_password": BOXREC_PASSWORD,
            "_remember_me": "on",
            "_target_path": "http://boxrec.com", // not required
            "login[go]": "", // not required
        },
        jar: cookieJar,
    };

    await rp.post(options);

    await getBoxerAndSave(cookieJar, boxers.RoyJonesJr, "mockProfileRJJ.html");
    await getBoxerAndSave(cookieJar, boxers.GennadyGolovkin, "mockProfileGGG.html");
    await getChampionsAndSave(cookieJar);
    await getRatingsAndSave(cookieJar, {
        division: "welterweight",
        status: "a", // active
    }, "mockRatings.html");
    await getEventAndSave(cookieJar, events.BellewHaye2, "mockEventPage.html");
    await getSearchAndSave(cookieJar, {
        first_name: "floyd",
        last_name: "mayweather",
        role: "boxer",
    }, "mockSearchMayweather.html")
})();
