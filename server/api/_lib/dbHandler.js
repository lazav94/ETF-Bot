const Course = require('../course/course.model');
const Professor = require('../professor/professor.model');

const fillCourseCollection = async () => {
    const M1 = new Course({
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


    // await Course.updateOne({ code: M1.code }, M1, { upsert: true });
    await Course.updateOne({ code: M2.code }, M2, { upsert: true });
    await Course.updateOne({ code: OET1.code }, OET1, { upsert: true });
    await Course.updateOne({ code: OET2.code }, OET2, { upsert: true });
    await Course.updateOne({ code: PSZ.code }, PSZ, { upsert: true });
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

    // BoskoNikolic.save();
    // DraganMilicev.save();
}
// fillCourseCollection();
// fillProfessorsCollection();
module.exports = {
    fillCourseCollection,
    fillProfessorsCollection
}