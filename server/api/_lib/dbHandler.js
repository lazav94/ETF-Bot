// import mongoose = require('mongoose');

const moment = require('./services').moment;

const Course = require('../course/course.model');
const Professor = require('../professor/professor.model');
const Student = require('../student/student.model');
const Exam = require('../exam/exam.model');
const ExamPeriod = require('../exam/examPerion.model');


/**
 * @description Function that fills the Course DB collection
 */
const fillCourseCollection = async () => {

  const M1 = new Course({
    url: 'http://matematika1.etf.bg.ac.rs/',
    code: '13E081MM1',
    name: 'Matematika 1',
    status: 'Obavezan',
    year: 1,
    esbp: 7,
    type: 'Osnovne akademske studije',
    goals: 'Upoznavanje studenata sa osnovnim pojmovima i činjenicama diskretne matematike i matematičke analize neophodnim za studije elektrotehnike.',
    hours: {
      theory: 3,
      exercise: 3
    },
    scoring: {
      colloquium: 30,
      writtenExam: 70
    },
    content: 'Skupovi, relacije, preslikavanja. Osnovi matematičke logike. Opšta algebra. Linearna algebra. Polinomi i racionalne funkcije. Uvod u matematičku analizu. Realni nizovi. Granične vrednosti funkcija. Diferencijalni račun.',
    literature: `Cvetković D., Lacković I., Merkle M., Radosavljević Z., Simić S., Vasić P., Matematika 1 – Algebra, IX izdanje, Akademska misao, Beograd, 2006.
Vasić P., Iričanin B., Jovanović M., Malešević B., Madžarević T., Mihailović B., Radosavljević Z., Simić S., Cvetković D., Zbirka zadataka iz algebre (prvi deo), VI izdanje, Akademska misao, Beograd, 2006.
Vasić P., Iričanin B., Jovanović M., Madžarević T., Mihailović B., Radosavljević Z., Simić S., Cvetković D., Zbirka zadataka iz algebre (drugi deo), V izdanje, Akademska misao, Beograd, 2006.
Milan Merkle: Matematička analiza – teorija i 1000 zadataka, II izdanje, Akademska misao, Beograd, 2008.`
  });


  const OET1 = new Course({
    url: 'http://oet.etf.rs/',
    code: '13E071OE1',
    name: 'Osnovi elektrotehnike 1',
    status: 'Obavezan',
    year: 1,
    esbp: 7,
    type: 'Osnovne akademske studije',
    goals: 'Upoznavanje sa osnovnim konceptima, jednačinama i metodima analize elektrostatičkih polja i strujnih polja. Uvođenje u koncepte, metode analize i teoreme električnih kola stalnih struja.',
    hours: {
      theory: 3,
      exercise: 3
    },
    scoring: {
      colloquium: 30,
      writtenExam: 70
    },
    content: 'Elektrostatika. Kulonov zakon. Potencijal. Gausov zakon. Provodnici. Kondenzatori. Dielektrici. Energija. Polja i kola stalnih struja. Strujno polje. Džulov zakon. Električni generatori. Prvi i drugi Kirhofov zakon. Grafovi kola. Rešavanje kola Kirhofovim zakonima. Metod konturnih struja. Metod potencijala čvorova. Teoreme. Električne mreže sa kondenzatorima.',
    literature: `A. Đorđević, Osnovi elektrotehnike 1. deo (Elektrostatika), Akademska misao, Beograd, 2012.
A. Đorđević, Osnovi elektrotehnike 2. deo (Stalne struje), Akademska misao, Beograd, 2012.
G. Božilović, D. Olćan, A. Đorđević, Zbirka zadataka iz Osnova elektrotehnike 1. deo (Elektrostatika), Akademska misao, Beograd, 2012.
G. Božilović, D. Olćan, A. Đorđević, Zbirka zadataka iz Osnova elektrotehnike 2. deo (Stalne struje), Akademska misao, Beograd, 2011.`
  });


  const M2 = new Course({
    url: 'http://matematika1.etf.bg.ac.rs/',
    code: 'Matematika 2',
    name: 'Matematika 2',
    status: 'Obavezan',
    year: 2,
    esbp: 7,
    type: 'Osnovne akademske studije',
    goals: 'Upoznavanje studenata sa osnovnim pojmovima i činjenicama diskretne matematike i matematičke analize neophodnim za studije elektrotehnike.',
    hours: {
      theory: 3,
      exercise: 3
    },
    scoring: {
      colloquium: 30,
      writtenExam: 70
    },
    content: 'Skupovi, relacije, preslikavanja. Osnovi matematičke logike. Opšta algebra. Linearna algebra. Polinomi i racionalne funkcije. Uvod u matematičku analizu. Realni nizovi. Granične vrednosti funkcija. Diferencijalni račun.',
    literature: `Cvetković D., Lacković I., Merkle M., Radosavljević Z., Simić S., Vasić P., Matematika 1 – Algebra, IX izdanje, Akademska misao, Beograd, 2006.
Vasić P., Iričanin B., Jovanović M., Malešević B., Madžarević T., Mihailović B., Radosavljević Z., Simić S., Cvetković D., Zbirka zadataka iz algebre (prvi deo), VI izdanje, Akademska misao, Beograd, 2006.
Vasić P., Iričanin B., Jovanović M., Madžarević T., Mihailović B., Radosavljević Z., Simić S., Cvetković D., Zbirka zadataka iz algebre (drugi deo), V izdanje, Akademska misao, Beograd, 2006.
Milan Merkle: Matematička analiza – teorija i 1000 zadataka, II izdanje, Akademska misao, Beograd, 2008.`
  });


  const OET2 = new Course({
    url: 'http://oet.etf.rs/',
    code: '13E071OE2',
    name: 'Osnovi elektrotehnike 2',
    status: 'Obavezan',
    year: 1,
    esbp: 7,
    type: 'Osnovne akademske studije',
    goals: 'Upoznavanje sa osnovnim konceptima, jednačinama i metodima analize stacionarnih magnetskih polja i elektromagnetske indukcije. Uvođenje u koncepte, metode analize i teoreme električnih kola promenljivih struja.',
    hours: {
      theory: 3,
      exercise: 3
    },
    scoring: {
      colloquium: 30,
      writtenExam: 70
    },
    content: 'Stalno magnetsko polje. Bio-Savarov zakon. Magnetski fluks. Amperov zakon. Feromagnetski materijali. Uopšteni Amperov zakon. Promenljivo elektromagnetsko polje. Faradejev zakon. Induktivnosti. Energija. Kola promenljivih struja. Opšte jednačine. Fazori i kompleksni račun. Metodi rešavanja kola. Teoreme. Trofazna kola. Frekvencijske karakteristike. Prelazni režimi.',
    literature: `A. Đorđević, Osnovi elektrotehnike, 3. deo (Elektromagnetizam), Akademska misao, Beograd, 2010.
A. Đorđević, Osnovi elektrotehnike, 4. deo (Kola promenljivih struja), Akademska misao, Beograd, 2010.
G. Božilović, D. Olćan, A. Đorđević, Zbirka zadataka iz Osnova elektrotehnike, 3. deo (Elektromagnetizam), Akademska misao, Beograd, 2010.
G. Božilović, D. Olćan, A. Đorđević, Zbirka zadataka iz Osnova elektrotehnike, 4. deo (Kola promenljivih struja), Akademska misao, Beograd, 2010.`
  });


  const PSZ = new Course({
    url: 'http://rti.etf.bg.ac.rs/rti/ms1psz/',
    code: '13M111PSZ',
    name: 'Pronalaženje skrivenog znanja',
    status: 'Izborni',
    modul: 'Računarska tehnika i informatika',
    year: 5,
    esbp: 6,
    type: 'Master akademske studije',
    goals: 'Upoznati studente sa osnovnim pojmovima i principima mašinskog učenja, data mining-a, tehnologijama Semantičkog Veba, kao i modelovanja koncepata. Upoznati studente sa principima projektovanja i implementacije data mining modela i ontologija Semantičkog Veba.',
    hours: {
      theory: 2,
      exercise: 2
    },
    scoring: {
      seminar: 60,
      oralExam: 20,
      writtenExam: 20
    },
    content: 'Metodi prikupljanja, predstavljanja i obrađivanja podataka. Stabla odlučivanja, induktivno učenje, Bayesian učenje, neuralne mreže, genetski algoritam, Instance-based učenje. Asociajtivna pravila i klasifikacija. Semantičke Veb tehnologije i konceptualne mreže, modelovanje koncepata.',
    literature: `Jiawei Han, Micheline Kamber, Data Mining: Concepts and Techniques, Morgan Kaufmann Publishers, USA
H. Peter Alesso, Craig F. Smith, Developing Semantic Web Service, A K Peters, USA
Larose D. , Discovering Knowledge in Data: An Introduction to Data Mining, Wiley, 2005
Antoniou G., van Harmelen F. , A Semantic Web Primer, Second Edition, Cooperative Information Systems, The MIT Press, 2009
Najnoviji radovi po izboru predavača`
  });

  const OPJ = new Course({
    url: 'http://rti.etf.bg.ac.rs/rti/ms1opj/',
    code: '13M111OPJ',
    name: 'Obrada prirodnih jezika',
    status: 'Izborni',
    modul: 'Softversko inženjerstvo',
    year: 5,
    esbp: 6,
    type: 'Master akademske studije',
    goals: 'Upoznavanje studenata sa osnovnim konceptima i tehnikama statističke obrade prirodnih jezika. Razmatranje često korišćenih modela mašinskog učenja i njihovo poređenje. Prikaz nekih od glavnih morfoloških, sintaksnih i semantičkih problema iz računarske obrade prirodnih jezika i upoznavanje sa metodama njihovog rešavanja.',
    hours: {
      theory: 2,
      exercise: 2,
      other: 1
    },
    scoring: {
      project: 70,
      writtenExam: 30
    },
    content: 'Mašinsko učenje u obradi prirodnih jezika. Generativni i diskriminativni modeli. Modeli sekvenci. Pregled morfoloških, sintaksnih i semantičkih problema u obradi prirodnih jezika. Jezički modeli. Stemovanje i lematizacija. Parsiranje. Klasifikacija tekstova na osnovu tematike i sentimenta. Leksička i distribucionalna semantika. Semantička sličnost. Prepoznavanje imenovanih entiteta.',
    literature: `Dan Jurafsky, James H. Martin, "Speech and Language Processing", Prentice Hall, 2008.
Christopher D. Manning, Prabhakar Raghavan, Hinrich Schütze, "An Introduction to Information Retrieval", Cambridge University Press, 2008.`
  });


  const GI = new Course({
    url: 'https://www.sevenbridges.com/',
    code: '13M111GI',
    name: 'Genomska informatika',
    status: 'Izborni',
    modul: 'Softversko inženjerstvo',
    year: 5,
    esbp: 6,
    type: 'Master akademske studije',
    goals: 'U okviru ovog predmeta predstavljeni su osnovni metodi računarske analize podataka dobijenih iz genoma, sa ciljem izvođenja biološki značajnih zaključaka. Biće ukazano na prednosti i mane ovih metoda i na značajne parametre koji utiču na rezultate ovih analiza.',
    hours: {
      theory: 2,
      exercise: 2,
      other: 1
    },
    scoring: {
      project: 50,
      writtenExam: 50
    },
    content: 'Poređenje sekvenci. Skriven Markovljev model. Algoritmi za višestruko poravnanje. Analiza ekspresija gena. Populaciona genomika. Molekularna evolucija. Komparativna genomika.',
    literature: `R. Durbin, S. Eddy, A. Krogh, G. Mitchison, "Biological Sequence Analysis", Cambridge University
N. Jones, P. Pevzner, "An Introduction to Bioinformatics Algorithms", MIT Press
D. Gusfield, "Algorithms on Strings, Trees and Sequences", Cambridge University Press
Najnoviji radovi po izboru predavača.`
  });

  const ASP = new Course({
    url: 'https://rti.etf.bg.ac.rs/rti/ri3sp/index.html',
    code: '13M111OPJ',
    name: 'Algoritmi i strukture podataka',
    status: 'Izborni',
    modul: 'Softversko inženjerstvo,Računarska tehnika i informatika',
    year: 2,
    esbp: 6,
    type: 'Osnovne akademske studije',
    goals: 'Upoznavanje sa logičkom organizacijom i memorijskom reprezentacijom linearnih i nelinearih struktura podataka, osnovnim operacijama i tipičnim primenama ovih struktura. Upoznavanje sa algoritmima i odgovarajućim strukturama podataka koje se koriste za pretraživanje i sortiranje, kao i njihovom praktičnom implementacijom u programskim jezicima.',
    hours: {
      theory: 3,
      exercise: 2,
    },
    scoring: {
      colloquium: 30,
      writtenExam: 70
    },
    content: 'Linearne strukture. Nizovi. Liste. Stekovi. Redovi. Nelinearne strukture. Binarna stabla. Grafovi, predstavljanje i algoritmi. Pretraživanje. Osnovni metodi i poboljšanja. Stabla i m-arnog binarnog pretraživanja , AVL stabla, stabla B, B*, i B+ stabla, Heširanje. Heš funkcije i rešavanje kolizija, spoljašnje heširanje. Sortiranje - metodi umetanja, selekcije, zamene i spajanja.',
    literature: 'Algoritmi i strukture podataka, Milo Tomašević, Akademska misao, 2010.'
  });

  const OS1 = new Course({
    url: 'http://os.etf.rs/',
    code: '13E112OS1',
    name: 'Operativni sistemi 1',
    status: 'Obavezan',
    modul: 'Računarska tehnika i informatika',
    year: 2,
    esbp: 6,
    type: 'Osnovne akademske studije',
    goals: 'Upoznati studente sa namenom i funkcijama operativnih sistema, kao i osnovnim principima funkcionisanja, projektovanja i implementacije operativnih sistema.',
    hours: {
      theory: 2,
      exercise: 2,
      other: 1
    },
    scoring: {
      colloquium: 40,
      seminar: 30,
      writtenExam: 30
    },
    content: 'Upravljanje procesima. Procesi i niti. Sinhronizacija i komunikacija između procesa. Upravljanje memorijom. Vezivanje adresa. Deljenje memorije. Organizacija i alokacija memorije. Virtuelna memorija. Ulazno/izlazni podsistem. Sistemske I/O usluge. I/O podsistem. Fajl sistemi. Interfejs fajl sistema. Implementacija fajl sistema.',
    literature: `Silberschatz, A., Galvin, P. B., Gagne, G., "Operating System Concepts," 7th ed., John Wiley and Sons, 2005
Đorđević B., Pleskonjić D., Maček N., "Operativni sistemi", Mikro knjiga, 2005.`
  });

  const BP1 = new Course({
    url: 'https://rti.etf.bg.ac.rs/rti/bp1/index.html',
    code: '13E112OS1',
    name: 'Baze podataka 1',
    status: 'Obavezan',
    modul: 'Računarska tehnika i informatika',
    year: 3,
    esbp: 6,
    type: 'Osnovne akademske studije',
    goals: '1. Upoznavanje studenata sa osnovnim pojmovima i principima Sistema za Upravljanje Bazama Podataka. 2. Upoznavanje sa osnovnim konceptima projektovanja baza podataka. 3. Osposobljavanje studenata za dizajn i implementaciju konkretne baze podataka i korišćenje komercijalnih sistema za upravljanje bazama podataka.',
    hours: {
      theory: 2,
      exercise: 2,
      other: 1
    },
    scoring: {
      practicalWork: 10,
      colloquium: 20,
      seminar: 10,
      writtenExam: 60
    },
    content: 'Osnovni pojmovi i principi Baza Podataka. Abstrakcije podataka. Instanca i Šema. Nezavisnost podataka. Modeli podataka. Jezici baza podataka. Model Entiteti-Veze. Relacioni Model. Relaciona Algebra i Relacioni Račun, SQL. Optimizacija Upita. Objektno-Orijentisani Sistemi. Objektno-Relacioni Sistemi. Obrada Transakcija. Tehnike validacije. Oporavak od kvara. Komercijalni Sistemi.',
    literature: `Database System Concepts, A. Silberschatz, H. Korth, S Sudarshan, McGraw Hill International Edition, 2005.
Database Systems:The Complete Book, H. Garcia-Molina, J.D.Ulman, J. Widom, Prentice Hall, 2002.
Upravljanje Transakcijama, M.Bojovic, Akademska misao, 2003.`
  });

  const MIPS = new Course({
    url: 'http://home.etf.rs/~vm/os/mips/index.html',
    code: '13E114MIPS',
    name: 'Mikroprocesorski sistemi',
    status: 'Obavezan',
    modul: 'Računarska tehnika i informatika',
    year: 4,
    esbp: 6,
    type: 'Osnovne akademske studije',
    goals: 'Upoznavanje sa naprednim mogućnostima savremenih mikroprocesora (eksploatacija paralelizma na nivou instrukcija, predviđanje skokova, predviđanje podataka, hardverska podrška za izvršavanje više niti, i podrška za SMP i DSM sisteme) i ovladavanje tehnikama projektovanja i programiranja mikroprocesorskih sistema.',
    hours: {
      theory: 2,
      exercise: 2,
      other: 1
    },
    scoring: {
      practicalWork: 60,
      writtenExam: 40
    },
    content: 'Upoznavanje sa naprednim konceptima modernih mikroprocesora. Upoznavanje sa internom strukturom i primjenom mikroprocesora 8086 i najčešćih periferija. Upoznavanje sa internom strukturom i primjenom mikrokontrolera 8051. Uvod u problematiku dizajna savremenih mikroprocesorskih sistema.',
    literature: `V.Milutinovic, SURVIVING THE DESIGN OF MICROPROCESSOR AND MULTIMICROPROCESSOR SYSTEMS, Wiley, USA (best seller);
Yu-cheng Liu, Glen A. Gibson, MICROCOMPUTER SYSTEMS: THE 8086/8088 FAMILY, Prentice Hall
MacKenzie I. Scott, THE 8051 MICROCONTROLLER, Prentice Hall`
  });


  // await Course.collection.drop();

  // await M1.save();
  // await M2.save();
  // await OET1.save();
  // await OET2.save();
  // await PSZ.save();
  // await OPJ.save();
  // await GI.save();
  // await ASP.save();
  // await OS1.save();
  // await BP1.save();
  // await MIPS.save();


  // console.log(M1);
};

const fillProfessorsCollection = async () => {
  const BoskoNikolic = new Professor({
    image: 'https://www.kolubarske.rs/images/cms-image-000008192.jpg',
    firstName: 'Boško',
    lastName: 'Nikolić',
    title: 'prof. dr',
    email: 'nbosko@etf.bg.ac.rs',
    phone: '011/3218-378',
    office: 'Paviljon Računskog Centra, kancelarija RC-8'
  });

  const DraganMilicev = new Professor({
    firstName: 'Dragan',
    lastName: 'Milićev',
    title: 'prof. dr',
    email: 'dmilicev@etf.bg.ac.rs',
    phone: '011/3218-449',
    office: 'Paviljon Rašović, kancelarija P-24'
  });

  const MilosCvetanovic = new Professor({
    firstName: 'Miloš',
    lastName: 'Cvetanović',
    title: 'prof. dr',
    email: 'cmilos@etf.bg.ac.rs',
    phone: '011/3218-385',
    office: 'Zgrada tehničkih fakulteta, kancelarija 36'
  });

  await Professor.collection.drop();

  await BoskoNikolic.save();
  await DraganMilicev.save();
  await MilosCvetanovic.save();

};

const fillStudentCollection = async () => {
  const lazarVasic = new Student({
    id: '1898032266921906',
    firstName: 'Lazar',
    lastName: 'Vasic',
    index: '3011/2017',
  });
  lazarVasic.save();
};

const fillExamCollection = async () => {
  const psz = new Exam({
    date: moment().add(10, 'days'),
    // course:
  });
};

const fillExamPeriodCollection = async () => {
  const septembarExamPeriod = new ExamPeriod({
  });
  septembarExamPeriod.save();
};


// fillCourseCollection();
// fillProfessorsCollection();
// fillStudentCollection();


module.exports = {
  fillCourseCollection,
  fillProfessorsCollection
};