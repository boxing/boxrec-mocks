const rp = require("request-promise");
const {getPersonAndSave, getChampionsAndSave, getRatingsAndSave, getEventAndSave, getPeopleByLocationAndSave, getSearchAndSave, getEventsByLocationAndSave, getScheduleAndSave, getVenueAndSave, getBeltInformationAndSave, getResultsAndSave, getBoutAndSave, getDateAndSave} = require("./helpers");
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

const judges = {
    DaveMoretti: 401002,
};

const doctor = {
    AnthonyRuggeroli: 412676,
};

const events = {
    MayweatherMcGregor: 752960,
    BellewHaye2: 761332,
};

const promoter = {
    LeonardEllerbe: 419406,
};

const referee = {
    RobertByrd: 400886,
};

const inspector = {
    MichaelBuchato: 775611,
};

const manager = {
    MichaelMcSorleyJr: 785510,
};

const matchmaker = {
    VeliPekkaMaeki: 709331,
};

const supervisor = {
    SammyMacias: 406714,
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

    await getPersonAndSave(cookieJar, boxers.RoyJonesJr, "mockProfileBoxerRJJ.html");
    await getPersonAndSave(cookieJar, boxers.GennadyGolovkin, "mockProfileBoxerGGG.html");
    await getPersonAndSave(cookieJar, judges.DaveMoretti, "mockProfileJudgeDaveMoretti.html", "judge");
    await getPersonAndSave(cookieJar, doctor.AnthonyRuggeroli, "mockProfileDoctorAnthonyRuggeroli.html", "doctor");
    await getPersonAndSave(cookieJar, promoter.LeonardEllerbe, "mockProfilePromoterLeonardEllerbe.html", "promoter");
    await getPersonAndSave(cookieJar, referee.RobertByrd, "mockProfileRefereeRobertByrd.html", "referee");
    await getPersonAndSave(cookieJar, inspector.MichaelBuchato, "mockProfileInspectorMichaelBuchato.html", "inspector");
    await getPersonAndSave(cookieJar, manager.MichaelMcSorleyJr, "mockProfileManagerMichaelMcSorleyJr.html", "manager");
    await getPersonAndSave(cookieJar, matchmaker.VeliPekkaMaeki, "mockProfileMatchmakerVeliPekkaMaeki.html", "matchmaker");
    await getPersonAndSave(cookieJar, supervisor.SammyMacias, "mockProfileSupervisorSammyMacias.html", "supervisor");
    await getChampionsAndSave(cookieJar);
    await getRatingsAndSave(cookieJar, {
        division: "welterweight",
        status: "a", // active
    }, "mockRatings.html");
    await getEventAndSave(cookieJar, events.BellewHaye2, "mockEventPageBellewHaye2.html");
    await getEventAndSave(cookieJar, events.MayweatherMcGregor, "mockEventPageMayweatherMcGregor.html");
    await getSearchAndSave(cookieJar, {
        first_name: "floyd",
        last_name: "mayweather",
        role: "boxer",
    }, "mockSearchMayweather.html");
    await getPeopleByLocationAndSave(cookieJar, {
        country: "US",
        role: "boxer",
    }, "mockUSALocation.html");
    await getPeopleByLocationAndSave(cookieJar, {
        role: "matchmaker",
    }, "mockMatchmaker.html");
    await getPeopleByLocationAndSave(cookieJar, {
        country: "US",
        role: "boxer",
        division: "welterweight",
    }, "mockUSAWelterweight.html");
    await getEventsByLocationAndSave(cookieJar, {
        country: "UK",
        region: "LON",
        year: "2017",
    }, "mockEventsLondon2017.html");
    await getScheduleAndSave(cookieJar, {}, "mockScheduleWorldwide.html");
    await getVenueAndSave(cookieJar, {
        id: 38555
    }, "mockVenueMGMGrand.html");
    await getBeltInformationAndSave(cookieJar, "6/Middleweight", "mockMiddleweightWBCbelt.html");
    await getResultsAndSave(cookieJar, {
        country: "US",
        division: "middleweight",
    }, "mockResultsUSMiddleweight.html");
    await getBoutAndSave(cookieJar, "751017/2160855", "mockBoutCaneloGGG1.html");
    await getDateAndSave(cookieJar, "2010-05-20", "mockDate2010-05-20.html");

    // event page where venue and region/town is missing
    await getEventAndSave(cookieJar, 775798, "mockEventPageNoVenueNoRegionTown.html");
})();
