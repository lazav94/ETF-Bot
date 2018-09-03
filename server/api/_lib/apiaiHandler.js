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

    console.log(Math.max(matchesByName.bestMatch.rating, matchesByCode.bestMatch.rating));
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
const espb = async (course) => {
    console.log(`[ACTION] esbp -> param: ${course}`);
    const subject = await getBestMatch(course);
    return subject.esbp;
}

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


const wayOfPassing = async (course) => {
    console.log(`[ACTION] way_of-passing -> param: ${course}`);
    const subject = await getBestMatch(course);
    return `Predmet ${subject.name}: ${await getHoursOfCourse(subject.hours)} i boduje se ${await getHowCourseIsScoring(subject.scoring)}`;
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

            switch (action) {
                case 'espb':
                    const espbResult = await espb(response.result.parameters.any);
                    console.log('ESPB', espbResult)
                    break;
                case 'way_of_passing':
                    console.log('VALUE', response.result.parameters.any);
                    const wayOfPassingResult = await wayOfPassing(response.result.parameters.any);
                    console.log(wayOfPassingResult);
                    break;
                case 'professor_info':
                    console.log('PROFESSOR INFO', response.result.parameters.any);
                    const professorInfoResult = await professorInfo(response.result.parameters.any);
                    console.log(professorInfoResult);
                    break;
                case 'input.unknown':
                default:
                    console.log("DEFAULT INTENT", action);
                    break;
            }

            return resolve();
        });

        request.on('error', error => {
            console.log('Error APIAI', error);
            reject(error);
        });

        request.end();
    });
};

// apiaiHandler('123', 'Koliko espb nosi oet?' )
// apiaiHandler('123', 'Kako se polaze matematika?')
// apiaiHandler('123', 'OVI ZIDOVI DUSE IMAJU  ?')
// apiaiHandler('123', 'Informacije o Draganu Milicevu?')