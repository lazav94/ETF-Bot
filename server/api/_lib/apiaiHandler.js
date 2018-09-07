const apiai = require('apiai');
const app = apiai(process.env.APIAI_ACCESS_TOKEN);
const stringSimilarity = require('string-similarity');

const messanger = require('../bot/messanger');

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
  };

  const max = findMax([matchesByName.bestMatch, matchesByCode.bestMatch]);
  const bestMatchingCourse = await findCourseByNameOrCode(max.target);
  return bestMatchingCourse;

};

const apply = async () => {
  console.log('[ACTION] course_apply');
  // TODO send all subject that can be applicied
};

const content = async (course) => {
  console.log(`[ACTION] course_content -> param: ${course}`);
  const subject = await getBestMatch(course);
  if (!subject) return 'None';
  return subject.content;
};

const espb = async (course) => {
  console.log(`[ACTION] course_esbp -> param: ${course}`);
  const subject = await getBestMatch(course);
  if (!subject) return 'None';
  return `Pronadjeni predmet ${subject.name} nosi ${subject.esbp} ESPB.\nAko ovo nije predmet koji ste trazili pokusajte sa preciznijim imenom!`;
};

const goal = async (course) => {
  console.log(`[ACTION] course_goal -> param: ${course}`);
  const subject = await getBestMatch(course);
  if (!subject) return 'None';
  return subject.goals;
};

const info = async (course) => {
  console.log(`[ACTION] course_info -> param: ${course}`);
  const subject = await getBestMatch(course);
  if (!subject) return 'None';
  // TODO ovde treba sve i slika i sve i sajt
  return subject.info;
};
const passing = async (course) => {
  console.log(`[ACTION] course_passing -> param: ${course}`);
  const subject = await getBestMatch(course);
  if (!subject) return 'None';
  return `Predmet ${subject.name}: ${await getHoursOfCourse(subject.hours)} i boduje se ${await getHowCourseIsScoring(subject.scoring)}`;
};

const getHowCourseIsScoring = async (scoring) => {
  console.log('Scoring', scoring);
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
};

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
};




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
  };

  const max = findMax([matchesByFirstName.bestMatch, matchesByLastName.bestMatch, matchesByFullName.bestMatch]);
  const bestMatchingProfessor = await findProfessorByName(max.target);
  return bestMatchingProfessor;
};

const professorEmail = async (name) => {
  const professor = await getProfessorBestMatch(name);
  if (!professor) return 'No professor found';
  return professor.email;
};
const professorPhone = async (name) => {
  const professor = await getProfessorBestMatch(name);
  if (!professor) return 'No professor found';
  return professor.phone;
};

const professorInfo = async name => {
  let professor = await getProfessorBestMatch(name);
  return `${professor.image} ${professor.title} ${professor.firstName} ${professor.lastName} ${professor.email} ${professor.phone} ${professor.office}`;
};

const professorOffice = async (name) => {
  const professor = await getProfessorBestMatch(name);
  if (!professor) return 'No professor found';
  return professor.office;
};






const apiaiHandler = (sender, text) => {
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
      let professorName = '';
      switch (action) {
      case 'course_year':
        const year = response.result.parameters.year;
        console.log('year', year);
        resolve('TODO poslati sve predmete za neku godinu');
        break;
      case 'course_apply':
        // const applyResult = await ();
        resolve('TODO mozete polagati sledce predmete!');
        break;
      case 'course_content':
        course = response.result.parameters.course;
        if (!course) resolve('Nije pronadjen predmet za akciju', action);
        console.log('Course', course);
        const contentResult = await content(course);
        console.log('contentResult', contentResult);
        resolve(contentResult);
        break;
      case 'course_espb':
        course = response.result.parameters.course;
        console.log('Course', course);
        if (!course) resolve('Nije pronadjen predmet za akciju', action);
        const espbResult = await espb(course);
        console.log('espbResult', espbResult);
        resolve(espbResult);
        break;
      case 'course_goal':
        course = response.result.parameters.course;
        console.log('Course', course);
        if (!course) resolve('Nije pronadjen predmet za akciju', action);
        const goalResult = await goal(course);
        console.log('goalResult', goalResult);
        resolve(goalResult);
        break;
      case 'course_info':
        course = response.result.parameters.course;
        console.log('Course', course);
        if (!course) resolve('Nije pronadjen predmet za akciju', action);
        const infoResult = await info(course);
        console.log('infoResult', infoResult);
        resolve(infoResult);
        break;
      case 'course_passing':
        course = response.result.parameters.course;
        console.log('Course', course);
        if (!course) resolve('Nije pronadjen predmet za akciju', action);
        const passingResult = await passing(course);
        console.log('passingResult', passingResult);
        resolve(passingResult);
        break;
      case 'professor_email':
        professorName = response.result.parameters.professor_name;
        console.log('Professor name:', professorName);
        const professorEmailResult = await professorEmail(response.result.parameters.professor_name);
        console.log('profesorEmailResult', professorEmailResult);
        resolve(professorEmailResult);
        break;
      case 'professor_info':
        professorName = response.result.parameters.professor_name;
        console.log('Professor name:', professorName);
        const professorInfoResult = await professorInfo(response.result.parameters.professor_name);
        console.log('profesorInfoResult', professorInfoResult);
        resolve(professorInfoResult);
        break;
      case 'professor_phone':
        professorName = response.result.parameters.professor_name;
        console.log('Professor name:', professorName);
        const professorPhoneResult = await professorPhone(response.result.parameters.professor_name);
        console.log('profesorPhoneResult', professorPhoneResult);
        resolve(professorPhoneResult);
        break;
      case 'professor_office':
        professorName = response.result.parameters.professor_name;
        console.log('Professor name:', professorName);
        const professorOfficeResult = await professorOffice(response.result.parameters.professor_name);
        console.log('profesorOfficeResult', professorOfficeResult);
        resolve(professorOfficeResult);
        break;
      case 'etf_location':
        await messanger.sendLocationButton(sender);
        resolve('done');
        break;
      case 'help':
        await messanger.sendHelpButton(sender);
        resolve('done');
        break;
      case 'thank_you':
      case 'bye':
      case 'input.welcome':
        const responseText = response.result.fulfillment.speech;
        console.log('responseText', responseText);
        await messanger.sendTextMessage(sender, responseText);
        resolve('done');
        break;
      case 'suncica':
        console.log('speech', response.result.fulfillment.speech);
        await messanger.sendTextMessage(sender, response.result.fulfillment.speech);
        await messanger.sendImage(sender, 'https://image.ibb.co/bLDMxz/suncica.jpg');
        resolve('done');
        break;
      case 'input.unknown':
      default:
        console.log('DEFAULT INTENT', action);
        resolve('Preformulisite pitanje');
        break;
      }
      // return resolve();
    });

    request.on('error', error => reject(error));

    request.end();
  });
};

apiaiHandler('1898032266921906', 'suncica');


// apiaiHandler('123', 'Predmeti II godine?');

// apiaiHandler('123', 'Gde mogu naci profesora Boska Nikolica?');
// apiaiHandler('123', 'telefon profesora Boska Nikolica?');
// apiaiHandler('123', 'informacija o profesoru Bosku Nikolicu?');
// apiaiHandler('123', 'email profesora Boska nikolica?');


// apiaiHandler('123', 'cilj predmeta mata 1 ?');
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
  console.log('content | ', content === 'course_content', ' | ', content);
  console.log('espb        | ', espb === 'course_espb', ' | ', espb);
  console.log('goal        | ', goal === 'course_goal', ' | ', goal);
  console.log('info        | ', info === 'course_info', ' | ', info);
  console.log('passing     | ', passing === 'course_passing', ' | ', passing);
  console.log('=====================================================');
};
// testAPIAI();

module.exports = apiai;
