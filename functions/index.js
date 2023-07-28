const functions = require("firebase-functions");
const corsModule = require("cors");
const cors = corsModule({origin: true});
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

exports.helloWorld = functions.https.onRequest((request, response) => {
    cors(request ,response , () => {
        response.set('Access-Control-Allow-Origin', '*');
      functions.logger.info("Hello logs!", {structuredData: true});
      response.send("Hello from Firebase!");
    })
});

exports.calculateTest = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        
        response.set('Access-Control-Allow-Origin', '*');
        const mbtiValues = [
            "INTJ", "INFJ", "ISTJ", "ISTP", "INTP", "INFP", "ISFJ", "ISFP",
            "ENTJ", "ENFJ", "ESTJ", "ESTP", "ENTP", "ENFP", "ESFJ", "ESFP"
        ];
          
          const enneagramValues = Array.from({ length: 9 }, (_, i) => i + 1);
          
          const generateRandomObjects = () => {
            const objects = [];
            for (let i = 0; i < 50; i++) {
              const mbti = mbtiValues[Math.floor(Math.random() * mbtiValues.length)];
              const enneagram = enneagramValues[Math.floor(Math.random() * enneagramValues.length)];
              const obj = { MBTI: mbti, Enneagram: enneagram };
              objects.push(obj);
            }
            return objects;
          }
          
          // Ejemplo de uso:
        
          const calculatePercentageByEnneagram = (enneagramValue, objects) => {
            const countByMBTI = {};
            
            // Contar la cantidad de objetos para cada valor de MBTI en base al valor de enneagrama
            objects.forEach(function(obj) {
              if (obj.Enneagram === enneagramValue) {
                countByMBTI[obj.MBTI] = (countByMBTI[obj.MBTI] || 0) + 1;
              }
            });
          
            // Calcular el porcentaje para cada valor de MBTI
            const totalCount = Object.values(countByMBTI).reduce((acc, count) => acc + count, 0);
            const percentages = {};
            Object.keys(countByMBTI).forEach(function(mbti) {
              const count = countByMBTI[mbti];
              const percentage = (count / totalCount) * 100;
              percentages[mbti] = percentage.toFixed(2);
            });
          
            return percentages;
          }
          
          // Ejemplo de uso:
          const enneagramValue = 2;  // Valor de enneagrama para calcular el porcentaje
          const randomObjects = generateRandomObjects();  // Generar los objetos aleatorios
          console.log("user records:" + JSON.stringify(randomObjects))
          const percentages = calculatePercentageByEnneagram(enneagramValue, randomObjects);
          response.json({ data: percentages });
    })
})


exports.getStatistics = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        
        response.set('Access-Control-Allow-Origin', '*');

        const range = (startingNumber, endingNumber) => {
            let ans = []
            for (let i = startingNumber; i <= endingNumber; i++) {
                ans.push(i)
            }
            return ans
        }

        const MBTI_VALUES = [
            "INTJ", "INFJ", "ISTJ", "ISTP", "INTP", "INFP", "ISFJ", "ISFP",
            "ENTJ", "ENFJ", "ESTJ", "ESTP", "ENTP", "ENFP", "ESFJ", "ESFP"
        ];

        const ENNEAGRAM_TYPE = range(1,9);
        const BIG_FIVE_VALUES = range(1,120);
        const ASTROLOGY = [
            "Capricorn",
            "Aquarius",
            "Pisces",
            "Aries",
            "Taurus",
            "Gemini",
            "Cancer",
            "Leo",
            "Virgo",
            "Libra",
            "Scorpio",
            "Sagittarius",
        ];
        const LOVE_LANGUAGES = range(0,100)
        const LOVE_LANGUAGES_KEYS = ["receivingGifts", "actsService", "wordsAffirmation", "physicalTouch", "qualityTime"]
        const FTI = range(0, 100) 
        const ATTACHMENT_STYLE = [
            "Anxious",
            "Avoidant",
            "Disorganized / Fearful-Avoidant",
            "Secure"
        ]

        const FLIRTING_STYLE = [
        "0-10",
        "10-20",
        "20-30",
        "30-40",
        "40-50",
        "50-60",
        "60-70",
        "70-80",
        "80-90",
        "90-100",
        ]

        const databases = [
            { name: "MBTI", data: [] },
            { name: "Enneagram", data: [] },
            { name: "Astrology", data: [] },
            { name: "AttachmentStyle", data: [] },
            { name: "FlirtingStyle", data: [] },
            { name: "FisherTemperamentInventory", data: [] },
            { name: "LoveLanguages", data: [] },
            { name: "GallupStrengthsFinder", data: [] },
            { name: "ViaCareerStrengths", data: [] },
            { name: "DISC", data: [] }
        ];


        const groupDataByUserId = (databases) => {
            const result = {};
          
            databases.forEach(database => {
              const name = database.name;
          
              database.data.forEach(entry => {
                const userId = entry.userId;
          
                if (!result[userId]) {
                  result[userId] = {};
                }
          
                result[userId][name] = entry;
              });
            });
          
            return result;
          }
          

          const calcOcurrencies = (data) => {
            let ocurrencias = {};

            for (let persona in data) {
                const examenes = data[persona];

                for (let examen in examenes) {
                const valor = examenes[examen];

                if (!(examen in ocurrencias)) {
                    ocurrencias[examen] = {};
                }

                const clave = JSON.stringify(valor); // Convertir el objeto a una cadena de texto
                if (!(clave in ocurrencias[examen])) {
                    ocurrencias[examen][clave] = 1;
                } else {
                    ocurrencias[examen][clave] += 1;
                }
                }
            }

            return ocurrencias;
          }


          // MBTI IN ENNEAGRAM
          const calculateMbtiEnneagramPercentage = (usersData, mbtiType, enneagramValue) => {
            let totalUsers = 0;
            let matchedUsers = 0;
          
            for (const userId in usersData) {
              const userData = usersData[userId];
          
              if (userData.MBTI && userData.MBTI.type === mbtiType && userData.Enneagram && userData.Enneagram.type) {
                totalUsers++;
          
                if (userData.Enneagram && userData.Enneagram.type === enneagramValue) {
                  matchedUsers++;
                }
              }
            }
          
            if (totalUsers === 0) {
              return 0;
            }
          
            const percentage = (matchedUsers / totalUsers) * 100;
            return percentage;
          }

          // MBTI IN ASTROLOGY SUN
          const calculateMbtiInSunPercentage = (usersData, mbtiType, sunValue) => {
            let totalUsers = 0;
            let matchedUsers = 0;
          
            for (const userId in usersData) {
              const userData = usersData[userId];
          
              if (userData.MBTI && userData.MBTI.type === mbtiType && userData.Astrology) {
                totalUsers++;
          
                if (userData.Astrology && userData.Astrology.sun === sunValue) {
                  matchedUsers++;
                }
              }
            }

            if (totalUsers === 0) {
              return 0;
            }
          
            const percentage = (matchedUsers / totalUsers) * 100;
            return percentage;
          }

          // MBTI IN LOVE LANGUAGES
          const calculateMbtiLoveLanguages = (usersData, mbtiType, loveValue, loveKey) => {
            
            let totalUsers = 0;
            let matchedUsers = 0;
            
          
            for (const userId in usersData) {
              const userData = usersData[userId];
          
              if (userData.MBTI && userData.MBTI.type === mbtiType && userData.LoveLanguages && userData.LoveLanguages[loveKey]) {
                totalUsers++;
          
                if (userData.LoveLanguages && userData.LoveLanguages[loveKey] === loveValue) {
                  matchedUsers++;
                }
              }
            }
          
            if (totalUsers === 0) {
              return 0;
            }
          
            const percentage = (matchedUsers / totalUsers) * 100;
            return percentage;
          }

          // MBTI IN RECEIVING GIFTS :   type => mbti ,  valuesOne => userData.MBTI ,  valuesOneProp => userData.MBTI.type, category => enneagramValue, valuesTwo => userData.Enneagram
          // valuesTwoProp => userData.Enneagram.type
          const genericCalc = (usersData, type, valuesOne, valuesOneProp, category, valuesTwo, valuesTwoProp) => {
            let totalUsers = 0;
            let matchedUsers = 0;
          
            for (const userId in usersData) {
              const userData = usersData[userId];
          
              if (userData[valuesOne] && userData[valuesOne][valuesOneProp] === type && userData[valuesTwo] && userData[valuesTwo][valuesTwoProp]) {
                totalUsers++;
          
                if (userData[valuesTwo] && userData[valuesTwo][valuesTwoProp] === category) {
                  matchedUsers++;
                }
              }
            }
          
            if (totalUsers === 0) {
              return 0;
            }
          
            const percentage = (matchedUsers / totalUsers) * 100;
            return percentage;
          }
          
          // ENNEAGRAM IN MBTI
          function calculateEnneagramMbtiPercentage(usersData, enneagramType, mbtiValue) {
            let totalUsers = 0;
            let matchedUsers = 0;
          
            for (const userId in usersData) {
              const userData = usersData[userId];
          
              if (userData.Enneagram && userData.Enneagram.type === enneagramType.toString() && userData.MBTI && userData.MBTI.type) {
                totalUsers++;
          
                if (userData.MBTI && userData.MBTI.type === mbtiValue) {
                  matchedUsers++;
                }
              }
            }
          
            if (matchedUsers === 0) {
              return 0;
            }
          
            const percentage = (matchedUsers / totalUsers) * 100;
            return percentage;
          }

          
          // ASTROLOGY IN MBTI
          const calculateSunMbtiPercentage = (usersData, sunType, mbtiValue) => {
            let totalUsers = 0;
            let matchedUsers = 0;
          
            for (const userId in usersData) {
              const userData = usersData[userId];
          
              if (userData.ASTROLOGY && userData.ASTROLOGY.sun === sunType && userData.Astrology && userData.Astrology.sun) {
                totalUsers++;
          
                if (userData.MBTI && userData.MBTI.type === mbtiValue) {
                  matchedUsers++;
                }
              }
            }
          
            if (totalUsers === 0) {
              return 0;
            }
          
            const percentage = (matchedUsers / totalUsers) * 100;
            return percentage;
          }

        const promises = databases.map((database) => {
            const collectionRef = db.collection(database.name);
            return collectionRef.get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        database.data.push(doc.data());
                    });
                })
                .catch((error) => {
                    console.log('Error', error);
                });
        });


        Promise.all(promises)
            .then(() => {

                const dataByUsers = groupDataByUserId(databases);

                const results = {
                    mbtiEnneagram: {},
                    mbtiSun: {},
                    mbtiLoveLanguages: {},
                    mbtiReceivingGifts: {},
                    mbtiActsService: {},
                    mbtiQualityTime: {},
                    mbtiPhysicalTouch: {},
                    mbtiWordsAffirmation: {},
                    mbtiAttachmentStyle: {},
                    mbtiPhysical: {},
                    mbtiPlayful: {},
                    mbtiPolite: {},
                    mbtiSincere: {},
                    mbtiTraditional: {},
                    mbtiBuilder: {},
                    mbtiDirector: {},
                    mbtiExplorer: {},
                    mbtiNegotiator: {},
                    enneagramMbti: {},
                    enneagramSun: {},
                    enneagramReceivingGifts: {},
                    enneagramActsService: {},
                    enneagramQualityTime: {},
                    enneagramPhysicalTouch: {},
                    enneagramWordsAffirmation: {},
                    enneagramAttachmentStyle: {},
                    enneagramPhysical: {},
                    enneagramPlayful: {},
                    enneagramPolite: {},
                    enneagramSincere: {},
                    enneagramTraditional: {},
                    enneagramBuilder: {},
                    enneagramDirector: {},
                    enneagramExplorer: {},
                    enneagramNegotiator: {},
                    sunMbti: {},
                };

                // comparing mbti with all posibles combinations  (not career)
                for (const mbti of MBTI_VALUES) {
                    // mbti in enneagram 1  
                    results.mbtiEnneagram[mbti] = {};
                    for (const enneagram of ENNEAGRAM_TYPE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', enneagram.toString(), 'Enneagram', 'type');
                        results.mbtiEnneagram[mbti][enneagram] = percentage;
                    }
                    
                    // mbti in sun 2
                    results.mbtiSun[mbti] = {};
                    for (const sun of ASTROLOGY) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', sun, 'Astrology', 'sun');
                        results.mbtiSun[mbti][sun] = percentage;
                    }

                    // mbti in receiving gifts 3   ll1
                    results.mbtiReceivingGifts[mbti] = {};
                    for (const receivingGift of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', receivingGift.toString(), 'LoveLanguages' , 'receivingGifts');
                        results.mbtiReceivingGifts[mbti][receivingGift] = percentage;
                    }

                    // mbti in ActsService 4 ll2
                    results.mbtiActsService[mbti] = {};
                    for (const actService of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', actService.toString(), 'LoveLanguages' , 'actsService');
                        results.mbtiActsService[mbti][actService] = percentage;
                    }

                    // mbti in qualityTime 5 ll3
                    results.mbtiQualityTime[mbti] = {};
                    for (const qualityTime of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', qualityTime.toString(), 'LoveLanguages' , 'qualityTime');
                        results.mbtiQualityTime[mbti][qualityTime] = percentage;
                    }

                    // mbti in physicalTouch 6 ll4
                    results.mbtiPhysicalTouch[mbti] = {};
                    for (const physicalTouch of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', physicalTouch.toString(), 'LoveLanguages' , 'physicalTouch');
                        results.mbtiPhysicalTouch[mbti][physicalTouch] = percentage;
                    }

                    // mbti in wordsAffirmation 7 ll5
                    results.mbtiWordsAffirmation[mbti] = {};
                    for (const wordsAffirmation of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', wordsAffirmation.toString(), 'LoveLanguages' , 'wordsAffirmation');
                        results.mbtiWordsAffirmation[mbti][wordsAffirmation] = percentage;
                    }

                    // mbti in attachment Style 8
                    results.mbtiAttachmentStyle[mbti] = {};
                    for (const style of ATTACHMENT_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'AttachmentStyle' , 'style');
                        results.mbtiAttachmentStyle[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 9  fs1
                    results.mbtiPhysical[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'physical');
                        results.mbtiPhysical[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 10  fs2
                    results.mbtiPlayful[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'playful');
                        results.mbtiPlayful[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 11  fs3
                    results.mbtiPolite[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'polite');
                        results.mbtiPolite[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 12  fs4
                    results.mbtiSincere[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'sincere');
                        results.mbtiSincere[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 13  fs5
                    results.mbtiTraditional[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'traditional');
                        results.mbtiTraditional[mbti][style] = percentage;
                    }

                    // mbti in FTI 14  fti 1
                    results.mbtiBuilder[mbti] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', value, 'FisherTemperamentInventory' , 'builder');
                        results.mbtiBuilder[mbti][value] = percentage;
                    }

                    // mbti in FTI 15  fti 2
                    results.mbtiDirector[mbti] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', value, 'FisherTemperamentInventory' , 'director');
                        results.mbtiDirector[mbti][value] = percentage;
                    }

                    // mbti in FTI 16  fti 3
                    results.mbtiExplorer[mbti] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', value, 'FisherTemperamentInventory' , 'explorer');
                        results.mbtiExplorer[mbti][value] = percentage;
                    }

                    // mbti in FTI 16  fti 4
                    results.mbtiNegotiator[mbti] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', value, 'FisherTemperamentInventory' , 'negotiator');
                        results.mbtiNegotiator[mbti][value] = percentage;
                    }
                }


                // comparing mbti with all posibles combinations  (not career)
                for (const mbti of MBTI_VALUES) {
                    // mbti in enneagram 1  
                    results.mbtiEnneagram[mbti] = {};
                    for (const enneagram of ENNEAGRAM_TYPE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', enneagram.toString(), 'Enneagram', 'type');
                        results.mbtiEnneagram[mbti][enneagram] = percentage;
                    }
                    
                    // mbti in sun 2
                    results.mbtiSun[mbti] = {};
                    for (const sun of ASTROLOGY) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', sun, 'Astrology', 'sun');
                        results.mbtiSun[mbti][sun] = percentage;
                    }

                    // mbti in receiving gifts 3   ll1
                    results.mbtiReceivingGifts[mbti] = {};
                    for (const receivingGift of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', receivingGift.toString(), 'LoveLanguages' , 'receivingGifts');
                        results.mbtiReceivingGifts[mbti][receivingGift] = percentage;
                    }

                    // mbti in ActsService 4 ll2
                    results.mbtiActsService[mbti] = {};
                    for (const actService of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', actService.toString(), 'LoveLanguages' , 'actsService');
                        results.mbtiActsService[mbti][actService] = percentage;
                    }

                    // mbti in qualityTime 5 ll3
                    results.mbtiQualityTime[mbti] = {};
                    for (const qualityTime of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', qualityTime.toString(), 'LoveLanguages' , 'qualityTime');
                        results.mbtiQualityTime[mbti][qualityTime] = percentage;
                    }

                    // mbti in physicalTouch 6 ll4
                    results.mbtiPhysicalTouch[mbti] = {};
                    for (const physicalTouch of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', physicalTouch.toString(), 'LoveLanguages' , 'physicalTouch');
                        results.mbtiPhysicalTouch[mbti][physicalTouch] = percentage;
                    }

                    // mbti in wordsAffirmation 7 ll5
                    results.mbtiWordsAffirmation[mbti] = {};
                    for (const wordsAffirmation of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', wordsAffirmation.toString(), 'LoveLanguages' , 'wordsAffirmation');
                        results.mbtiWordsAffirmation[mbti][wordsAffirmation] = percentage;
                    }

                    // mbti in attachment Style 8
                    results.mbtiAttachmentStyle[mbti] = {};
                    for (const style of ATTACHMENT_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'AttachmentStyle' , 'style');
                        results.mbtiAttachmentStyle[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 9  fs1
                    results.mbtiPhysical[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'physical');
                        results.mbtiPhysical[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 10  fs2
                    results.mbtiPlayful[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'playful');
                        results.mbtiPlayful[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 11  fs3
                    results.mbtiPolite[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'polite');
                        results.mbtiPolite[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 12  fs4
                    results.mbtiSincere[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'sincere');
                        results.mbtiSincere[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 13  fs5
                    results.mbtiTraditional[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'traditional');
                        results.mbtiTraditional[mbti][style] = percentage;
                    }

                    // mbti in FTI 14  fti 1
                    results.mbtiBuilder[mbti] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', value, 'FisherTemperamentInventory' , 'builder');
                        results.mbtiBuilder[mbti][value] = percentage;
                    }

                    // mbti in FTI 15  fti 2
                    results.mbtiDirector[mbti] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', value, 'FisherTemperamentInventory' , 'director');
                        results.mbtiDirector[mbti][value] = percentage;
                    }

                    // mbti in FTI 16  fti 3
                    results.mbtiExplorer[mbti] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', value, 'FisherTemperamentInventory' , 'explorer');
                        results.mbtiExplorer[mbti][value] = percentage;
                    }

                    // mbti in FTI 16  fti 4
                    results.mbtiNegotiator[mbti] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', value, 'FisherTemperamentInventory' , 'negotiator');
                        results.mbtiNegotiator[mbti][value] = percentage;
                    }
                }

                // comparing Enneagram with all posibles combinations  (not career)
                for (const enneagram of ENNEAGRAM_TYPE) {
                    //Enneagram in MBTI 17
                    results.enneagramMbti[enneagram] = {};
                    for (const mbti of MBTI_VALUES) {
                      const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', mbti, 'MBTI' , 'type');
                      results.enneagramMbti[enneagram][mbti] = percentage;
                    }
                    
                    //Enneagram in sun 18
                    results.enneagramSun[enneagram] = {};
                    for (const sun of ASTROLOGY) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', sun.toString(), 'Astrology', 'sun');
                        results.enneagramSun[enneagram][sun] = percentage;
                    }

                    //Enneagram in receiving gifts 19   ll1
                    results.enneagramReceivingGifts[enneagram] = {};
                    for (const receivingGift of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', receivingGift.toString(), 'LoveLanguages' , 'receivingGifts');
                        results.enneagramReceivingGifts[enneagram][receivingGift] = percentage;
                    }

                    //Enneagram in ActsService 20 ll2
                    results.enneagramActsService[enneagram] = {};
                    for (const actService of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', actService.toString(), 'LoveLanguages' , 'actsService');
                        results.enneagramActsService[enneagram][actService] = percentage;
                    }

                    //Enneagram in qualityTime 21 ll3
                    results.enneagramQualityTime[enneagram] = {};
                    for (const qualityTime of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', qualityTime.toString(), 'LoveLanguages' , 'qualityTime');
                        results.enneagramQualityTime[enneagram][qualityTime] = percentage;
                    }

                    //Enneagram in physicalTouch 22 ll4
                    results.enneagramPhysicalTouch[enneagram] = {};
                    for (const physicalTouch of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', physicalTouch.toString(), 'LoveLanguages' , 'physicalTouch');
                        results.enneagramPhysicalTouch[enneagram][physicalTouch] = percentage;
                    }

                    //Enneagram in wordsAffirmation 23 ll5
                    results.enneagramWordsAffirmation[enneagram] = {};
                    for (const wordsAffirmation of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', wordsAffirmation.toString(), 'LoveLanguages' , 'wordsAffirmation');
                        results.enneagramWordsAffirmation[enneagram][wordsAffirmation] = percentage;
                    }

                    //Enneagram in attachment Style 24
                    results.enneagramAttachmentStyle[enneagram] = {};
                    for (const style of ATTACHMENT_STYLE) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', style.toString(), 'AttachmentStyle' , 'style');
                        results.enneagramAttachmentStyle[enneagram][style] = percentage;
                    }

                    //Enneagram in flirting Style 25  fs1
                    results.enneagramPhysical[enneagram] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', style.toString(), 'FlirtingStyle' , 'physical');
                        results.enneagramPhysical[enneagram][style] = percentage;
                    }

                    //Enneagram in flirting Style 26  fs2
                    results.enneagramPlayful[enneagram] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', style.toString(), 'FlirtingStyle' , 'playful');
                        results.enneagramPlayful[enneagram][style] = percentage;
                    }

                    //Enneagram in flirting Style 27  fs3
                    results.enneagramPolite[enneagram] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', style.toString(), 'FlirtingStyle' , 'polite');
                        results.enneagramPolite[enneagram][style] = percentage;
                    }

                    //Enneagram in flirting Style 28  fs4
                    results.enneagramSincere[enneagram] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', style.toString(), 'FlirtingStyle' , 'sincere');
                        results.enneagramSincere[enneagram][style] = percentage;
                    }

                    //Enneagram in flirting Style 29  fs5
                    results.enneagramTraditional[enneagram] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', style.toString(), 'FlirtingStyle' , 'traditional');
                        results.enneagramTraditional[enneagram][style] = percentage;
                    }

                    //Enneagram in FTI 30  fti 1
                    results.enneagramBuilder[enneagram] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', value.toString(), 'FisherTemperamentInventory' , 'builder');
                        results.enneagramBuilder[enneagram][value] = percentage;
                    }

                    //Enneagram in FTI 31  fti 2
                    results.enneagramDirector[enneagram] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', value.toString(), 'FisherTemperamentInventory' , 'director');
                        results.enneagramDirector[enneagram][value] = percentage;
                    }

                    //Enneagram in FTI 32  fti 3
                    results.enneagramExplorer[enneagram] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', value.toString(), 'FisherTemperamentInventory' , 'explorer');
                        results.enneagramExplorer[enneagram][value] = percentage;
                    }

                    //Enneagram in FTI 16  fti 4
                    results.enneagramNegotiator[enneagram] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', value.toString(), 'FisherTemperamentInventory' , 'negotiator');
                        results.enneagramNegotiator[enneagram][value] = percentage;
                    }
                }

                response.json({data : results})
            })
            .catch((error) => {
                console.log('Error', error);
                response.status(500).send('Error');
            });
    })
});


// Run once a day at midnight, to clean up the users
// Manually run the task here https://console.cloud.google.com/cloudscheduler
exports.getStatistics2 = functions.pubsub.schedule('every 5 minutes').onRun(async (context) => {

    const statisticsMbti = db.collection('statisticsMbti');
    const statisticsEnneagram = db.collection('statisticsEnneagram');

    const statisticsAstrology = db.collection('statisticsAstrology');

    const statisticsMbtiDocRef = statisticsMbti.doc();
    const statisticsEnneagramDocRef = statisticsEnneagram.doc();
    const statisticsAstrologyDocRef = statisticsAstrology.doc();


        const range = (startingNumber, endingNumber) => {
            let ans = []
            for (let i = startingNumber; i <= endingNumber; i++) {
                ans.push(i)
            }
            return ans
        }

        const MBTI_VALUES = [
            "INTJ", "INFJ", "ISTJ", "ISTP", "INTP", "INFP", "ISFJ", "ISFP",
            "ENTJ", "ENFJ", "ESTJ", "ESTP", "ENTP", "ENFP", "ESFJ", "ESFP"
        ];

        const ENNEAGRAM_TYPE = range(1,9);
        const BIG_FIVE_VALUES = range(1,120);
        const ASTROLOGY = [
            "Capricorn",
            "Aquarius",
            "Pisces",
            "Aries",
            "Taurus",
            "Gemini",
            "Cancer",
            "Leo",
            "Virgo",
            "Libra",
            "Scorpio",
            "Sagittarius",
        ];
        const LOVE_LANGUAGES = range(0,100)
        const LOVE_LANGUAGES_KEYS = ["receivingGifts", "actsService", "wordsAffirmation", "physicalTouch", "qualityTime"]
        const FTI = range(0, 100) 
        const ATTACHMENT_STYLE = [
            "Anxious",
            "Avoidant",
            "Disorganized / Fearful-Avoidant",
            "Secure"
        ]

        const FLIRTING_STYLE = [
        "0-10",
        "10-20",
        "20-30",
        "30-40",
        "40-50",
        "50-60",
        "60-70",
        "70-80",
        "80-90",
        "90-100",
        ]

        const databases = [
            { name: "MBTI", data: [] },
            { name: "Enneagram", data: [] },
            { name: "Astrology", data: [] },
            { name: "AttachmentStyle", data: [] },
            { name: "FlirtingStyle", data: [] },
            { name: "FisherTemperamentInventory", data: [] },
            { name: "LoveLanguages", data: [] },
            { name: "GallupStrengthsFinder", data: [] },
            { name: "ViaCareerStrengths", data: [] },
            { name: "DISC", data: [] }
        ];


        const groupDataByUserId = (databases) => {
            const result = {};
          
            databases.forEach(database => {
              const name = database.name;
          
              database.data.forEach(entry => {
                const userId = entry.userId;
          
                if (!result[userId]) {
                  result[userId] = {};
                }
          
                result[userId][name] = entry;
              });
            });
          
            return result;
          }
          
          // valuesTwoProp => userData.Enneagram.type
          const genericCalc = (usersData, type, valuesOne, valuesOneProp, category, valuesTwo, valuesTwoProp) => {
            let totalUsers = 0;
            let matchedUsers = 0;
          
            for (const userId in usersData) {
              const userData = usersData[userId];
          
              if (userData[valuesOne] && userData[valuesOne][valuesOneProp] === type && userData[valuesTwo] && userData[valuesTwo][valuesTwoProp]) {
                totalUsers++;
          
                if (userData[valuesTwo] && userData[valuesTwo][valuesTwoProp] === category) {
                  matchedUsers++;
                }
              }
            }
          
            if (totalUsers === 0) {
              return 0;
            }
          
            const percentage = (matchedUsers / totalUsers) * 100;
            return percentage;
          }
          
        const promises = databases.map((database) => {
            const collectionRef = db.collection(database.name);
            return collectionRef.get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        database.data.push(doc.data());
                    });
                })
                .catch((error) => {
                    console.log('Error', error);
                });
        });


        Promise.all(promises)
            .then(() => {

                const dataByUsers = groupDataByUserId(databases);

                const results = {
                    mbtiEnneagram: {},
                    mbtiSun: {},
                    mbtiLoveLanguages: {},
                    mbtiReceivingGifts: {},
                    mbtiActsService: {},
                    mbtiQualityTime: {},
                    mbtiPhysicalTouch: {},
                    mbtiWordsAffirmation: {},
                    mbtiAttachmentStyle: {},
                    mbtiPhysical: {},
                    mbtiPlayful: {},
                    mbtiPolite: {},
                    mbtiSincere: {},
                    mbtiTraditional: {},
                    mbtiBuilder: {},
                    mbtiDirector: {},
                    mbtiExplorer: {},
                    mbtiNegotiator: {},
                    enneagramMbti: {},
                    enneagramSun: {},
                    enneagramReceivingGifts: {},
                    enneagramActsService: {},
                    enneagramQualityTime: {},
                    enneagramPhysicalTouch: {},
                    enneagramWordsAffirmation: {},
                    enneagramAttachmentStyle: {},
                    enneagramPhysical: {},
                    enneagramPlayful: {},
                    enneagramPolite: {},
                    enneagramSincere: {},
                    enneagramTraditional: {},
                    enneagramBuilder: {},
                    enneagramDirector: {},
                    enneagramExplorer: {},
                    enneagramNegotiator: {},
                    sunMbti: {},
                };

                // comparing mbti with all posibles combinations  (not career)
                for (const mbti of MBTI_VALUES) {
                    // mbti in enneagram 1  
                    results.mbtiEnneagram[mbti] = {};
                    for (const enneagram of ENNEAGRAM_TYPE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', enneagram.toString(), 'Enneagram', 'type');
                        results.mbtiEnneagram[mbti][enneagram] = percentage;
                    }
                    
                    // mbti in sun 2
                    results.mbtiSun[mbti] = {};
                    for (const sun of ASTROLOGY) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', sun, 'Astrology', 'sun');
                        results.mbtiSun[mbti][sun] = percentage;
                    }

                    // mbti in receiving gifts 3   ll1
                    results.mbtiReceivingGifts[mbti] = {};
                    for (const receivingGift of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', receivingGift.toString(), 'LoveLanguages' , 'receivingGifts');
                        results.mbtiReceivingGifts[mbti][receivingGift] = percentage;
                    }

                    // mbti in ActsService 4 ll2
                    results.mbtiActsService[mbti] = {};
                    for (const actService of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', actService.toString(), 'LoveLanguages' , 'actsService');
                        results.mbtiActsService[mbti][actService] = percentage;
                    }

                    // mbti in qualityTime 5 ll3
                    results.mbtiQualityTime[mbti] = {};
                    for (const qualityTime of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', qualityTime.toString(), 'LoveLanguages' , 'qualityTime');
                        results.mbtiQualityTime[mbti][qualityTime] = percentage;
                    }

                    // mbti in physicalTouch 6 ll4
                    results.mbtiPhysicalTouch[mbti] = {};
                    for (const physicalTouch of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', physicalTouch.toString(), 'LoveLanguages' , 'physicalTouch');
                        results.mbtiPhysicalTouch[mbti][physicalTouch] = percentage;
                    }

                    // mbti in wordsAffirmation 7 ll5
                    results.mbtiWordsAffirmation[mbti] = {};
                    for (const wordsAffirmation of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', wordsAffirmation.toString(), 'LoveLanguages' , 'wordsAffirmation');
                        results.mbtiWordsAffirmation[mbti][wordsAffirmation] = percentage;
                    }

                    // mbti in attachment Style 8
                    results.mbtiAttachmentStyle[mbti] = {};
                    for (const style of ATTACHMENT_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'AttachmentStyle' , 'style');
                        results.mbtiAttachmentStyle[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 9  fs1
                    results.mbtiPhysical[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'physical');
                        results.mbtiPhysical[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 10  fs2
                    results.mbtiPlayful[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'playful');
                        results.mbtiPlayful[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 11  fs3
                    results.mbtiPolite[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'polite');
                        results.mbtiPolite[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 12  fs4
                    results.mbtiSincere[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'sincere');
                        results.mbtiSincere[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 13  fs5
                    results.mbtiTraditional[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'traditional');
                        results.mbtiTraditional[mbti][style] = percentage;
                    }

                    // mbti in FTI 14  fti 1
                    results.mbtiBuilder[mbti] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, mbti.toString(), 'MBTI', 'type', value.toString(), 'FisherTemperamentInventory' , 'builder');
                        results.mbtiBuilder[mbti][value] = percentage;
                    }

                    // mbti in FTI 15  fti 2
                    results.mbtiDirector[mbti] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, mbti.toString(), 'MBTI', 'type', value.toString(), 'FisherTemperamentInventory' , 'director');
                        results.mbtiDirector[mbti][value] = percentage;
                    }

                    // mbti in FTI 16  fti 3
                    results.mbtiExplorer[mbti] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, mbti.toString(), 'MBTI', 'type', value.toString(), 'FisherTemperamentInventory' , 'explorer');
                        results.mbtiExplorer[mbti][value] = percentage;
                    }

                    // mbti in FTI 16  fti 4
                    results.mbtiNegotiator[mbti] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, mbti.toString(), 'MBTI', 'type', value.toString(), 'FisherTemperamentInventory' , 'negotiator');
                        results.mbtiNegotiator[mbti][value] = percentage;
                    }
                }


                // comparing mbti with all posibles combinations  (not career)
                for (const mbti of MBTI_VALUES) {
                    // mbti in enneagram 1  
                    results.mbtiEnneagram[mbti] = {};
                    for (const enneagram of ENNEAGRAM_TYPE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', enneagram.toString(), 'Enneagram', 'type');
                        results.mbtiEnneagram[mbti][enneagram] = percentage;
                    }
                    
                    // mbti in sun 2
                    results.mbtiSun[mbti] = {};
                    for (const sun of ASTROLOGY) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', sun, 'Astrology', 'sun');
                        results.mbtiSun[mbti][sun] = percentage;
                    }

                    // mbti in receiving gifts 3   ll1
                    results.mbtiReceivingGifts[mbti] = {};
                    for (const receivingGift of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', receivingGift.toString(), 'LoveLanguages' , 'receivingGifts');
                        results.mbtiReceivingGifts[mbti][receivingGift] = percentage;
                    }

                    // mbti in ActsService 4 ll2
                    results.mbtiActsService[mbti] = {};
                    for (const actService of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', actService.toString(), 'LoveLanguages' , 'actsService');
                        results.mbtiActsService[mbti][actService] = percentage;
                    }

                    // mbti in qualityTime 5 ll3
                    results.mbtiQualityTime[mbti] = {};
                    for (const qualityTime of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', qualityTime.toString(), 'LoveLanguages' , 'qualityTime');
                        results.mbtiQualityTime[mbti][qualityTime] = percentage;
                    }

                    // mbti in physicalTouch 6 ll4
                    results.mbtiPhysicalTouch[mbti] = {};
                    for (const physicalTouch of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', physicalTouch.toString(), 'LoveLanguages' , 'physicalTouch');
                        results.mbtiPhysicalTouch[mbti][physicalTouch] = percentage;
                    }

                    // mbti in wordsAffirmation 7 ll5
                    results.mbtiWordsAffirmation[mbti] = {};
                    for (const wordsAffirmation of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', wordsAffirmation.toString(), 'LoveLanguages' , 'wordsAffirmation');
                        results.mbtiWordsAffirmation[mbti][wordsAffirmation] = percentage;
                    }

                    // mbti in attachment Style 8
                    results.mbtiAttachmentStyle[mbti] = {};
                    for (const style of ATTACHMENT_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'AttachmentStyle' , 'style');
                        results.mbtiAttachmentStyle[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 9  fs1
                    results.mbtiPhysical[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'physical');
                        results.mbtiPhysical[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 10  fs2
                    results.mbtiPlayful[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'playful');
                        results.mbtiPlayful[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 11  fs3
                    results.mbtiPolite[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'polite');
                        results.mbtiPolite[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 12  fs4
                    results.mbtiSincere[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'sincere');
                        results.mbtiSincere[mbti][style] = percentage;
                    }

                    // mbti in flirting Style 13  fs5
                    results.mbtiTraditional[mbti] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, mbti, 'MBTI', 'type', style, 'FlirtingStyle' , 'traditional');
                        results.mbtiTraditional[mbti][style] = percentage;
                    }

                    // mbti in FTI 14  fti 1
                    results.mbtiBuilder[mbti] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, mbti.toString(), 'MBTI', 'type', value.toString(), 'FisherTemperamentInventory' , 'builder');
                        results.mbtiBuilder[mbti][value] = percentage;
                    }


                    // mbti in FTI 15  fti 2
                    results.mbtiDirector[mbti] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, mbti.toString(), 'MBTI', 'type', value.toString(), 'FisherTemperamentInventory' , 'director');
                        results.mbtiDirector[mbti][value] = percentage;
                    }

                    // mbti in FTI 16  fti 3
                    results.mbtiExplorer[mbti] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, mbti.toString(), 'MBTI', 'type', value.toString(), 'FisherTemperamentInventory' , 'explorer');
                        results.mbtiExplorer[mbti][value] = percentage;
                    }

                    // mbti in FTI 16  fti 4
                    results.mbtiNegotiator[mbti] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, mbti.toString(), 'MBTI', 'type', value.toString(), 'FisherTemperamentInventory' , 'negotiator');
                        results.mbtiNegotiator[mbti][value] = percentage;
                    }
                }

                // comparing Enneagram with all posibles combinations  (not career)
                for (const enneagram of ENNEAGRAM_TYPE) {
                    //Enneagram in MBTI 17
                    results.enneagramMbti[enneagram] = {};
                    for (const mbti of MBTI_VALUES) {
                      const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', mbti, 'MBTI' , 'type');
                      results.enneagramMbti[enneagram][mbti] = percentage;
                    }
                    
                    //Enneagram in sun 18
                    results.enneagramSun[enneagram] = {};
                    for (const sun of ASTROLOGY) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', sun.toString(), 'Astrology', 'sun');
                        results.enneagramSun[enneagram][sun] = percentage;
                    }

                    //Enneagram in receiving gifts 19   ll1
                    results.enneagramReceivingGifts[enneagram] = {};
                    for (const receivingGift of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', receivingGift.toString(), 'LoveLanguages' , 'receivingGifts');
                        results.enneagramReceivingGifts[enneagram][receivingGift] = percentage;
                    }

                    //Enneagram in ActsService 20 ll2
                    results.enneagramActsService[enneagram] = {};
                    for (const actService of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', actService.toString(), 'LoveLanguages' , 'actsService');
                        results.enneagramActsService[enneagram][actService] = percentage;
                    }

                    //Enneagram in qualityTime 21 ll3
                    results.enneagramQualityTime[enneagram] = {};
                    for (const qualityTime of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', qualityTime.toString(), 'LoveLanguages' , 'qualityTime');
                        results.enneagramQualityTime[enneagram][qualityTime] = percentage;
                    }

                    //Enneagram in physicalTouch 22 ll4
                    results.enneagramPhysicalTouch[enneagram] = {};
                    for (const physicalTouch of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', physicalTouch.toString(), 'LoveLanguages' , 'physicalTouch');
                        results.enneagramPhysicalTouch[enneagram][physicalTouch] = percentage;
                    }

                    //Enneagram in wordsAffirmation 23 ll5
                    results.enneagramWordsAffirmation[enneagram] = {};
                    for (const wordsAffirmation of LOVE_LANGUAGES) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', wordsAffirmation.toString(), 'LoveLanguages' , 'wordsAffirmation');
                        results.enneagramWordsAffirmation[enneagram][wordsAffirmation] = percentage;
                    }

                    //Enneagram in attachment Style 24
                    results.enneagramAttachmentStyle[enneagram] = {};
                    for (const style of ATTACHMENT_STYLE) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', style.toString(), 'AttachmentStyle' , 'style');
                        results.enneagramAttachmentStyle[enneagram][style] = percentage;
                    }

                    //Enneagram in flirting Style 25  fs1
                    results.enneagramPhysical[enneagram] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', style.toString(), 'FlirtingStyle' , 'physical');
                        results.enneagramPhysical[enneagram][style] = percentage;
                    }

                    //Enneagram in flirting Style 26  fs2
                    results.enneagramPlayful[enneagram] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', style.toString(), 'FlirtingStyle' , 'playful');
                        results.enneagramPlayful[enneagram][style] = percentage;
                    }

                    //Enneagram in flirting Style 27  fs3
                    results.enneagramPolite[enneagram] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', style.toString(), 'FlirtingStyle' , 'polite');
                        results.enneagramPolite[enneagram][style] = percentage;
                    }

                    //Enneagram in flirting Style 28  fs4
                    results.enneagramSincere[enneagram] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', style.toString(), 'FlirtingStyle' , 'sincere');
                        results.enneagramSincere[enneagram][style] = percentage;
                    }

                    //Enneagram in flirting Style 29  fs5
                    results.enneagramTraditional[enneagram] = {};
                    for (const style of FLIRTING_STYLE) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', style.toString(), 'FlirtingStyle' , 'traditional');
                        results.enneagramTraditional[enneagram][style] = percentage;
                    }

                    //Enneagram in FTI 30  fti 1
                    results.enneagramBuilder[enneagram] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', value.toString(), 'FisherTemperamentInventory' , 'builder');
                        results.enneagramBuilder[enneagram][value] = percentage;
                    }

                    //Enneagram in FTI 31  fti 2
                    results.enneagramDirector[enneagram] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', value.toString(), 'FisherTemperamentInventory' , 'director');
                        results.enneagramDirector[enneagram][value] = percentage;
                    }

                    //Enneagram in FTI 32  fti 3
                    results.enneagramExplorer[enneagram] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', value.toString(), 'FisherTemperamentInventory' , 'explorer');
                        results.enneagramExplorer[enneagram][value] = percentage;
                    }

                    //Enneagram in FTI 16  fti 4
                    results.enneagramNegotiator[enneagram] = {};
                    for (const value of FTI) {
                        const percentage = genericCalc(dataByUsers, enneagram.toString(), 'Enneagram', 'type', value.toString(), 'FisherTemperamentInventory' , 'negotiator');
                        results.enneagramNegotiator[enneagram][value] = percentage;
                    }
                }

    
                // update mbti doc for statistics EhbtziVqxDFkotuKiirF
                statisticsMbti.doc("EhbtziVqxDFkotuKiirF").update({ data: {
                    mbtiEnneagram: results.mbtiEnneagram,
                    mbtiSun: results.mbtiSun,
                    mbtiLoveLanguages: results.mbtiLoveLanguages,
                    mbtiReceivingGifts: results.mbtiReceivingGifts,
                    mbtiActsService: results.mbtiActsService,
                    mbtiQualityTime: results.mbtiQualityTime,
                    mbtiPhysicalTouch: results.mbtiPhysicalTouch,
                    mbtiWordsAffirmation: results.mbtiWordsAffirmation,
                    mbtiAttachmentStyle: results.mbtiAttachmentStyle,
                    mbtiPhysical: results.mbtiPhysical,
                    mbtiPlayful: results.mbtiPlayful,
                    mbtiPolite: results.mbtiPolite,
                    mbtiSincere: results.mbtiSincere,
                    mbtiTraditional: results.mbtiTraditional,
                    mbtiBuilder: results.mbtiBuilder,
                    mbtiDirector: results.mbtiDirector,
                    mbtiExplorer: results.mbtiExplorer,
                    mbtiNegotiator: results.mbtiNegotiator,
                }})
                .then(function() {
                console.log("update mbti");
                })
                .catch(function(error) {
                console.log("Error mbti", error);
                });

                // update enneagram doc for statistics MsgWRTFdgv7YHm7YbLpO
                statisticsEnneagram.doc("MsgWRTFdgv7YHm7YbLpO").update({ data: {
                    enneagramMbti: results.enneagramMbti,
                    enneagramSun: results.enneagramSun,
                    enneagramReceivingGifts: results.enneagramReceivingGifts,
                    enneagramActsService: results.enneagramActsService,
                    enneagramQualityTime: results.enneagramQualityTime,
                    enneagramPhysicalTouch: results.enneagramPhysicalTouch,
                    enneagramWordsAffirmation: results.enneagramWordsAffirmation,
                    enneagramAttachmentStyle: results.enneagramAttachmentStyle,
                    enneagramPhysical: results.enneagramPhysical,
                    enneagramPlayful: results.enneagramPlayful,
                    enneagramPolite: results.enneagramPolite,
                    enneagramSincere: results.enneagramSincere,
                    enneagramTraditional: results.enneagramTraditional,
                    enneagramBuilder: results.enneagramBuilder,
                    enneagramDirector: results.enneagramDirector,
                    enneagramExplorer: results.enneagramExplorer,
                    enneagramNegotiator: results.enneagramNegotiator,
                }})
                .then(function() {
                console.log("update enneagram");
                })
                .catch(function(error) {
                console.log("Error enneagram", error);
                });

            })
            .catch((error) => {
                console.log('Error', error);
            });
        });
