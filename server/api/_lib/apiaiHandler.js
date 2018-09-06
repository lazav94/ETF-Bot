const apiai = require('apiai');
const app = apiai(process.env.APIAI_ACCESS_TOKEN);
const stringSimilarity = require('string-similarity');

const {
    getCourseByID,
    getAllCoursesNamesAndCodes,
    findCourseByNameOrCode
} = require('../course/course.controller');

const {
    getAllProfessors,
    getProfessorByID,
    findProfessorByName
} = require('../professor/professor.controller');

// const {
//     sendMessage
// } = require('../messenger/messenger.controller');

/**************************** COURSES **************************************/
const getBestMatch = async course => {
    console.log(`[FUNCTION] getBestMatch -> param: ${course}`);
    const coursesNamesAndCodes = await getAllCoursesNamesAndCodes();
    var matchesByName = stringSimilarity.findBestMatch(course, coursesNamesAndCodes.map(courses => courses.name));
    var matchesByCode = stringSimilarity.findBestMatch(course, coursesNamesAndCodes.map(courses => courses.code));

    // TODO best matches by tags or something
    // console.log('Best match by name', matchesByName.bestMatch);
    // console.log('Best match by code', matchesByCode.bestMatch);

    // console.log(Math.max(matchesByName.bestMatch.rating, matchesByCode.bestMatch.rating));
    const findMax = (matches) => {
        let max = matches[0];
        for (let i = 0; i < matches.length; i++) {
            if (matches[i].rating > max.rating) {
                max = matches[i];
            }
        }
        return max;
    }

    const max = findMax([matchesByName.bestMatch, matchesByCode.bestMatch]);
    const bestMatchingCourse = await findCourseByNameOrCode(max.target);
    return bestMatchingCourse;

};

const apply = async () => {
    console.log(`[ACTION] course_apply`);
    // TODO send all subject that can be applicied
};

const content = async (course) => {
    console.log(`[ACTION] course_content -> param: ${course}`);
    const subject = await getBestMatch(course);
    return subject.content;
};

const espb = async (course) => {
    console.log(`[ACTION] course_esbp -> param: ${course}`);
    const subject = await getBestMatch(course);
    return `Pronadjeni predmet ${subject.name} nosi ${subject.esbp} ESPB.\nAko ovo nije predmet koji ste trazili pokusajte sa preciznijim imenom!`;
};

const goal = async (course) => {
    console.log(`[ACTION] course_goal -> param: ${course}`);
    const subject = await getBestMatch(course);
    return subject.goal;
};

const info = async (course) => {
    console.log(`[ACTION] course_info -> param: ${course}`);
    const subject = await getBestMatch(course);
    // TODO ovde treba sve i slika i sve i sajt
    return subject.info;
};
const passing = async (course) => {
    console.log(`[ACTION] course_passing -> param: ${course}`);
    const subject = await getBestMatch(course);
    return `Predmet ${subject.name}: ${await getHoursOfCourse(subject.hours)} i boduje se ${await getHowCourseIsScoring(subject.scoring)}`;
};

const getHowCourseIsScoring = async (scoring) => {
    console.log('Scoring', scoring)
    const scoringResult = Object.keys(scoring).map(scoringType => {
        if (scoringType != '$init' && scoring[scoringType] != 0) {
            switch (scoringType) {
                case 'activity':
                    return `Aktivnost ${scoring[scoringType]}%`;
                case 'practicalWork':
                    return `Prakticna nastava ${scoring[scoringType]}%`;
                case 'project':
                    return `Projekti ${scoring[scoringType]}%`;
                case 'colloquium':
                    return `Kolokvijum ${scoring[scoringType]}%`;
                case 'seminar':
                    return `Seminar ${scoring[scoringType]}`;
                case 'writtenExam':
                    return `Pismeni ispit ${scoring[scoringType]}%`;
                case 'oralExam':
                    return `Usmeni ispit ${scoring[scoringType]}%`;
            }
            return scoringType;
        }
        return null;
    }).filter(scoringType => scoringType);
    // console.log(scoringResult.join(', '));
    return scoringResult.join(', ');
}

const getHoursOfCourse = async (hours) => {
    const hoursResult = Object.keys(hours).map(hoursType => {
        if (hoursType != '$init' && hours[hoursType] != 0) {
            switch (hoursType) {
                case 'theory':
                    return `Predavanja ${hours[hoursType]}h`;
                case 'exercise':
                    return `Vezbe ${hours[hoursType]}h`;
                case 'other':
                    return `Ostale aktivnost ${hours[hoursType]}h`;
            }
            return hoursType;
        }
        return null;
    }).filter(hoursType => hoursType);
    // console.log(hoursResult.join(', '));
    return hoursResult.join(', ');
}




/******************************** PROFESSOR *****************************/

const getProfessorBestMatch = async (name) => {
    console.log(`[FUNCTION] getProfessorBestMatch -> param: ${name}`);
    const professors = await getAllProfessors();
    var matchesByFirstName = stringSimilarity.findBestMatch(name, professors.map(professor => professor.firstName));
    var matchesByLastName = stringSimilarity.findBestMatch(name, professors.map(professor => professor.lastName));
    var matchesByFullName = stringSimilarity.findBestMatch(name, professors.map(professor => `${professor.firstName} ${professor.lastName}`));

    // TODO best matches by tags or something
    // console.log('Best match by first name', matchesByFirstName.bestMatch);
    // console.log('Best match by last name', matchesByLastName.bestMatch);
    // console.log('Best match by full name', matchesByFullName.bestMatch);

    // console.log(Math.max(matchesByFirstName.bestMatch.rating, matchesByLastName.bestMatch.rating, matchesByFullName.bestMatch.rating));

    const findMax = (matches) => {
        let max = matches[0];
        for (let i = 0; i < matches.length; i++) {
            if (matches[i].rating > max.rating) {
                max = matches[i];
            }
        }
        return max;
    }

    const max = findMax([matchesByFirstName.bestMatch, matchesByLastName.bestMatch, matchesByFullName.bestMatch]);
    const bestMatchingProfessor = await findProfessorByName(max.target);
    return bestMatchingProfessor;
}

const professorInfo = async name => {
    let professor = await getProfessorBestMatch(name);
    return `${professor.image} ${professor.title} ${professor.firstName} ${professor.lastName} ${professor.email} ${professor.phone} ${professor.office}`;
};


module.exports = apiaiHandler = (sender, text) => {
    return new Promise((resolve, reject) => {

        const request = app.textRequest(text, {
            sessionId: 'sender'
        });

        request.on('response', async response => {

            // console.log('Resout APIAI', response.result);

            const action = response.result.action;
            // console.log('RESPONSE: ', response);
            console.log('ACTION: ', action);

            let course = '';
            switch (action) {
                case 'course_apply':
                    // const applyResult = await ();
                    return resolve('TODO mozete polagati sledce predmete!');
                    break;
                case 'course_content':
                    course = response.result.parameters.course;
                    console.log('Course', course);
                    const contentResult = await content(course);
                    console.log('contentResult', contentResult)
                    return resolve(contentResult);
                    break;
                case 'course_espb':
                    course = response.result.parameters.course;
                    console.log('Course', course);
                    const espbResult = await espb(course);
                    console.log('espbResult', espbResult)
                    return resolve(espbResult);
                    break;
                case 'course_goal':
                    course = response.result.parameters.course;
                    console.log('Course', course);
                    const goalResult = await goal(course);
                    console.log('result', goalResult)
                    return resolve(goalResult);
                    break;
                case 'course_info':
                    course = response.result.parameters.course;
                    console.log('Course', course);
                    const infoResult = await info(course);
                    console.log('infoResult', infoResult)
                    return resolve(infoResult);
                    break;
                case 'course_passing':
                    course = response.result.parameters.course;
                    console.log('Course', course);
                    const passingResult = await passing(course);
                    console.log('passingResult', passingResult);
                    return resolve(passingResult);
                    break;
                case 'professor_info':
                    console.log('PROFESSOR INFO', response.result.parameters.any);
                    const professorInfoResult = await professorInfo(response.result.parameters.any);
                    console.log(professorInfoResult);
                    // console.log('result', )
                    return resolve(professorInfoResult);
                    break;
                case 'input.unknown':
                default:
                    console.log("DEFAULT INTENT", action);
                    return resolve('Preformulisite pitanje');
                    break;
            }

            // return resolve();
        });

        request.on('error', error => reject(error));

        request.end();
    });
};
// apiaiHandler('123', 'test');
// apiaiHandler('123', 'Koliko espb nosi Kruska?');
// apiaiHandler('123', 'opis o  PSZ?');



const testAPIAI = async () => {

    const [
        // apply,
        content,
        espb,
        goal,
        info,
        passing
    ] = await Promise.all([
        apiaiHandler('123', 'Opis predmatea PSZ?'),
        apiaiHandler('123', 'Koliko espb nosi PSZ?'),
        apiaiHandler('123', 'cilj PSZa ?'),
        apiaiHandler('123', 'Informacije o  PSZ?'),
        apiaiHandler('123', 'kako se polaze PSZ?'),
    ]);

    // console.log('apply', apply, apply === 'course_apply');
    console.log('=====================================================');
    console.log('================== TESTING API AI ===================');

    console.log('=====================================================');
    console.log('content | ', content === 'course_content', ' | ', content );
    console.log('espb        | ', espb === 'course_espb', ' | ', espb );
    console.log('goal        | ', goal === 'course_goal', ' | ', goal );
    console.log('info        | ', info === 'course_info', ' | ', info );
    console.log('passing     | ', passing === 'course_passing', ' | ', passing );
    console.log('=====================================================');
};
// testAPIAI();