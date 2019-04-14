import {BoxrecRequests} from "boxrec-requests";
import {CookieJar} from "request";
import * as helperFunctions from "./helpers";

const {BOXREC_USERNAME, BOXREC_PASSWORD} = process.env;

if (!BOXREC_USERNAME) {
    throw new Error("missing required env var BOXREC_USERNAME");
}

if (!BOXREC_PASSWORD) {
    throw new Error("missing required env var BOXREC_PASSWORD");
}

const boxers: any = {
    GennadyGolovkin: 356831,
    RoyJonesJr: 774820,
    FloydMayweatherJr: 352,
};

const judges: any = {
    DaveMoretti: 401002,
};

const doctor: any = {
    AnthonyRuggeroli: 412676,
};

const events: any = {
    BellewHaye2: 761332,
    MayweatherMcGregor: 752960,
};

const promoter: any = {
    LeonardEllerbe: 419406,
};

const referee: any = {
    RobertByrd: 400886,
};

const inspector: any = {
    MichaelBuchato: 775611,
};

const manager: any = {
    MichaelMcSorleyJr: 785510,
};

const matchmaker: any = {
    VeliPekkaMaeki: 709331,
};

const supervisor: any = {
    SammyMacias: 406714,
};

(async () => {
    const cookieJar: CookieJar = await BoxrecRequests.login(BOXREC_USERNAME, BOXREC_PASSWORD);

    await helperFunctions.getPersonAndSave(cookieJar, boxers.RoyJonesJr, "mockProfileBoxerRJJ.html");
    await helperFunctions.getPersonAndSave(cookieJar, boxers.GennadyGolovkin, "mockProfileBoxerGGG.html");
    await helperFunctions.getPersonAndSave(cookieJar, boxers.FloydMayweatherJr, "mockProfileBoxerFloydMayweatherJr.html");
    await helperFunctions.getPersonAndSave(cookieJar, judges.DaveMoretti, "mockProfileJudgeDaveMoretti.html", "judge");
    await helperFunctions.getPersonAndSave(cookieJar, doctor.AnthonyRuggeroli, "mockProfileDoctorAnthonyRuggeroli.html", "doctor");
    await helperFunctions.getPersonAndSave(cookieJar, promoter.LeonardEllerbe, "mockProfilePromoterLeonardEllerbe.html", "promoter");
    await helperFunctions.getPersonAndSave(cookieJar, referee.RobertByrd, "mockProfileRefereeRobertByrd.html", "referee");
    await helperFunctions.getPersonAndSave(cookieJar, inspector.MichaelBuchato, "mockProfileInspectorMichaelBuchato.html", "inspector");
    await helperFunctions.getPersonAndSave(cookieJar, manager.MichaelMcSorleyJr, "mockProfileManagerMichaelMcSorleyJr.html", "manager");
    await helperFunctions.getPersonAndSave(cookieJar, matchmaker.VeliPekkaMaeki, "mockProfileMatchmakerVeliPekkaMaeki.html", "matchmaker");
    await helperFunctions.getPersonAndSave(cookieJar, supervisor.SammyMacias, "mockProfileSupervisorSammyMacias.html", "supervisor");
    await helperFunctions.getChampionsAndSave(cookieJar);
    await helperFunctions.getRatingsAndSave(cookieJar, {
        country: "",
        division: "Welterweight",
        sex: "M",
        stance: "",
        status: "a", // active
    }, "mockRatings.html");
    await helperFunctions.getEventAndSave(cookieJar, events.BellewHaye2, "mockEventPageBellewHaye2.html");
    await helperFunctions.getEventAndSave(cookieJar, events.MayweatherMcGregor, "mockEventPageMayweatherMcGregor.html");
    await helperFunctions.getSearchAndSave(cookieJar, {
        first_name: "floyd",
        last_name: "mayweather",
        role: "boxer",
    }, "mockSearchMayweather.html");

    await helperFunctions.getPeopleByLocationAndSave(cookieJar, {
        country: "US",
        role: "boxer",
    }, "mockUSALocation.html");
    await helperFunctions.getPeopleByLocationAndSave(cookieJar, {
        role: "matchmaker",
    }, "mockMatchmaker.html");

    await helperFunctions.getPeopleByLocationAndSave(cookieJar, {
        country: "US",
        division: "welterweight",
        role: "boxer",
    }, "mockUSAWelterweight.html");
    await helperFunctions.getEventsByLocationAndSave(cookieJar, {
        country: "UK",
        region: "LON",
        year: "2017",
    }, "mockEventsLondon2017.html");
    await helperFunctions.getScheduleAndSave(cookieJar, {}, "mockScheduleWorldwide.html");
    await helperFunctions.getVenueAndSave(cookieJar, 38555, "mockVenueMGMGrand.html");
    await helperFunctions.getBeltInformationAndSave(cookieJar, "6/Middleweight", "mockMiddleweightWBCbelt.html");
    await helperFunctions.getResultsAndSave(cookieJar, {
        country: "US",
        division: "middleweight",
    }, "mockResultsUSMiddleweight.html");
    await helperFunctions.getBoutAndSave(cookieJar, "751017/2160855", "mockBoutCaneloGGG1.html");
    await helperFunctions.getDateAndSave(cookieJar, "2010-05-20", "mockDate2010-05-20.html");
    await helperFunctions.getDateAndSave(cookieJar, "2010-12-01", "mockDate2018-12-01.html");

    // event page where venue and region/town is missing
    await helperFunctions.getEventAndSave(cookieJar, 775798, "mockEventPageNoVenueNoRegionTown.html");

    await helperFunctions.getTitlesAndSave(cookieJar, {
        bout_title: 72,
        division: "Super Middleweight",
    }, "mockTitlesTitleSelectedSuperMiddleweight.html"); // 12 columns
    await helperFunctions.getTitlesAndSave(cookieJar, {
        bout_title: 75, // is the same format column number if you "all titles"
        division: "schedule", // 8 columns
    }, "mockTitlesTitleSelectedAllScheduled.html");
    await helperFunctions.getTitlesAndSave(cookieJar, {
        bout_title: null,
        division: "schedule", // 8 columns
    }, "mockTitlesAllTitleAllScheduled.html");

    await helperFunctions.getWatchedAndSave(cookieJar, "mockWatched.html");
})();
