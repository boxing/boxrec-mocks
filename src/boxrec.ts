import * as helperFunctions from "./helpers";
import {CookieJar} from "request";
import {BoxrecRequests} from "boxrec-requests";
import {
    BoxrecRole,
    Country,
    WeightDivision,
    WeightDivisionCapitalized
} from "boxrec-requests/dist/boxrec-requests.constants";

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

    await helperFunctions.getPersonAndSave(cookieJar, boxers.RoyJonesJr, "mockProfileBoxerRJJ.html", BoxrecRole.proBoxer);
    await helperFunctions.getPersonAndSave(cookieJar, boxers.GennadyGolovkin, "mockProfileBoxerGGG.html", BoxrecRole.proBoxer);
    await helperFunctions.getPersonAndSave(cookieJar, boxers.FloydMayweatherJr, "mockProfileBoxerFloydMayweatherJr.html", BoxrecRole.proBoxer);
    await helperFunctions.getPersonAndSave(cookieJar, judges.DaveMoretti, "mockProfileJudgeDaveMoretti.html", BoxrecRole.judge);
    await helperFunctions.getPersonAndSave(cookieJar, doctor.AnthonyRuggeroli, "mockProfileDoctorAnthonyRuggeroli.html", BoxrecRole.doctor);
    await helperFunctions.getPersonAndSave(cookieJar, promoter.LeonardEllerbe, "mockProfilePromoterLeonardEllerbe.html", BoxrecRole.promoter);
    await helperFunctions.getPersonAndSave(cookieJar, referee.RobertByrd, "mockProfileRefereeRobertByrd.html", BoxrecRole.referee);
    await helperFunctions.getPersonAndSave(cookieJar, inspector.MichaelBuchato, "mockProfileInspectorMichaelBuchato.html", BoxrecRole.inspector);
    await helperFunctions.getPersonAndSave(cookieJar, manager.MichaelMcSorleyJr, "mockProfileManagerMichaelMcSorleyJr.html", BoxrecRole.manager);
    await helperFunctions.getPersonAndSave(cookieJar, matchmaker.VeliPekkaMaeki, "mockProfileMatchmakerVeliPekkaMaeki.html", BoxrecRole.matchmaker);
    await helperFunctions.getPersonAndSave(cookieJar, supervisor.SammyMacias, "mockProfileSupervisorSammyMacias.html", BoxrecRole.supervisor);
    await helperFunctions.getChampionsAndSave(cookieJar);
    await helperFunctions.getRatingsAndSave(cookieJar, {
        country: "",
        division: WeightDivisionCapitalized.welterweight,
        sex: "M",
        stance: "",
        status: "a", // active (division)
    }, "mockRatings.html");
    await helperFunctions.getRatingsAndSave(cookieJar, {
        country: "",
        division: WeightDivisionCapitalized.welterweight,
        sex: "M",
        stance: "",
        status: "", // active and inactive (division)
    }, "mockActiveAndInactiveRatings.html");
    await helperFunctions.getRatingsAndSave(cookieJar, {
        country: "",
        division: "",
        sex: "M",
        stance: "",
        status: "a", // active (no division)
    }, "mockNoDivisionRatings.html");
    await helperFunctions.getRatingsAndSave(cookieJar, {
        country: "",
        division: "",
        sex: "M",
        stance: "",
        status: "", // active and inactive (no division)
    }, "mockActiveAndInactiveNoDivisionRatings.html");
    await helperFunctions.getEventAndSave(cookieJar, events.BellewHaye2, "mockEventPageBellewHaye2.html");
    await helperFunctions.getEventAndSave(cookieJar, events.MayweatherMcGregor, "mockEventPageMayweatherMcGregor.html");
    await helperFunctions.getSearchAndSave(cookieJar, {
        first_name: "floyd",
        last_name: "mayweather",
        role: BoxrecRole.proBoxer,
    }, "mockSearchMayweather.html");

    await helperFunctions.getPeopleByLocationAndSave(cookieJar, {
        country: Country.USA,
        role: BoxrecRole.proBoxer,
    }, "mockUSALocation.html");
    await helperFunctions.getPeopleByLocationAndSave(cookieJar, {
        role: BoxrecRole.matchmaker,
    }, "mockMatchmaker.html");

    await helperFunctions.getPeopleByLocationAndSave(cookieJar, {
        country: Country.USA,
        division: WeightDivision.welterweight,
        role: BoxrecRole.proBoxer,
    }, "mockUSAWelterweight.html");
    await helperFunctions.getEventsByLocationAndSave(cookieJar, {
        country: Country["United Kingdom"],
        region: "LON",
        year: "2017",
    }, "mockEventsLondon2017.html");
    await helperFunctions.getScheduleAndSave(cookieJar, {}, "mockScheduleWorldwide.html");
    await helperFunctions.getVenueAndSave(cookieJar, 38555, "mockVenueMGMGrand.html");
    await helperFunctions.getBeltInformationAndSave(cookieJar, "6/Middleweight", "mockMiddleweightWBCbelt.html");
    await helperFunctions.getResultsAndSave(cookieJar, {
        country: Country.USA,
        division: WeightDivision.middleweight,
    }, "mockResultsUSMiddleweight.html");
    await helperFunctions.getBoutAndSave(cookieJar, "751017/2160855", "mockBoutCaneloGGG1.html");
    await helperFunctions.getDateAndSave(cookieJar, "2010-05-20", "mockDate2010-05-20.html");
    await helperFunctions.getDateAndSave(cookieJar, "2019-11-16", "mockDate2019-11-16.html");

    // event page where venue and region/town is missing
    await helperFunctions.getEventAndSave(cookieJar, 775798, "mockEventPageNoVenueNoRegionTown.html");

    await helperFunctions.getTitlesAndSave(cookieJar, {
        bout_title: 72,
        division: WeightDivisionCapitalized.superMiddleweight,
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
