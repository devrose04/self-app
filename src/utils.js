import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "./firebase.config";
import {
  doc,
  setDoc,
  query,
  where,
  getDocs,
  collection,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const getError = (code) => {
  let error = "";
  switch (code) {
    case "auth/user-not-found":
      error = "Incorrect credentials";
      break;
    case "auth/wrong-password":
      error = "Incorrect credentials";
      break;
    case "auth/weak-password":
      error = "Password should be at least 6 characters";
      break;
    case "auth/email-already-in-use":
      error = "Email already in use";
      break;
    case "auth/invalid-email": {
      error = "Invalid email";
      break;
    }
    default:
      break;
  }
  return error;
};

const createUserDoc = async (
  userId,
  firstName,
  lastName,
  source,
  otherInfo,
  friend,
  setError
) => {
  try {
    await setDoc(doc(db, "users", userId), {
      firstName,
      lastName,
      source,
      otherInfo,
      friend,
      score: 0,
    });
  } catch (error) {
    setError(getError(error.code));
    return error;
  }
};

export const updateUserScore = async (score, userId) => {
  //get user who has referred
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.data()) {
    const user = docSnap.data();
    return updateDoc(docRef, { score: user.score + score })
      .then(() => {
        console.log("updated");
        return true;
      })
      .catch((error) => {
        console.log("error1", error);
      });
  } else {
    return false;
  }
};

export const signIn = async (
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  source,
  otherInfo,
  friend,
  setIsloading,
  setError,
  userId
) => {
  setIsloading(true);
  setError("");

  const userIdFromStorage = localStorage.getItem("userId");

  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      if (userId || userIdFromStorage) {
        console.log("entro");
        const points = 10;
        try {
          const result = await updateUserScore(
            points,
            userId || userIdFromStorage
          );
          if (!result) throw new Error("Invalid Referral link");
          else {
            localStorage.removeItem("userId");
          }
        } catch (error) {
          console.log(error);
          // TODO: fix b/c its now an object setError(getError(error));
        }
      }
      const user = userCredential.user;

      return createUserDoc(
        user.uid,
        firstName,
        lastName,
        source,
        otherInfo,
        friend,
        setError
      )
        .then(() => {
          console.log("doc created");
          setIsloading(false);
          return true;
        })
        .catch(() => {
          deleteUser(user).then(() => {
            setIsloading(false);
            // setError("There was an error, try again please.");
          });
        });
    })
    .catch((error) => {
      setIsloading(false);
      // setError(getError(error.code));
    });
};

export const login = (email, password, setIsloading, setError) => {
  setIsloading(true);
  setError("");
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setIsloading(false);
      return userCredential;
    })
    .catch((error) => {
      setError(getError(error.code));
      setIsloading(false);
    });
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("logged out");
    })
    .catch((error) => {
      return error;
    });
};

export const passwordReset = async (email) => {
  try {
    const result = await sendPasswordResetEmail(auth, email);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.data()) return docSnap.data();
  else {
    return null;
  }
};

export const getCollectionById = async (collectionName, userUID) => {
  const q = query(
    collection(db, collectionName),
    where("userId", "==", userUID)
  );

  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data[0];
};

export const getPercentage = (tests, testQuantity) => {
  const part = 100 / testQuantity;
  let totalPercentage = parseFloat(part * tests.length).toFixed(1);
  return totalPercentage;
};

export const isFormCompleted = (formState) => {
  if (typeof formState === "string") {
    return formState !== "";
  }

  const isSignUp = !!formState.confirmPassword;

  if (!isSignUp) {
    const { ...values } = formState;
    return Object.values(values).every((value) => value !== "")
  }

  const passwordsMatch = formState.confirmPassword === formState.password;
  const isFriendOrOther = formState.source && ["Friend", "Other"].includes(formState.source);
  const hasFriendOrOther = isFriendOrOther && (formState.friend || formState.otherInfo);
  const validSource = isFriendOrOther ? hasFriendOrOther : !!formState.source;

  // extract friend and otherInfo so  it doesn't disable for other values
  const { friend, otherInfo, ...values } = formState;
  return Object.values(values).every((value) => value !== "") && passwordsMatch && validSource;
};

// this function is for updating all users, field can be changed in this definition.
export const updateOldUsers = async () => {
  const q = query(collection(db, "users"));

  try {
    const querySnapshot = await getDocs(q);
    const promises = querySnapshot.docs.map((doc) => {
      return updateDoc(doc.ref, { score: 0 });
    });
    await Promise.all(promises);
    return true;
  } catch (error) {
    console.log("error updating old users", error);
    return false;
  }
};

export const getSingleStat = async (name, id) => {
  const docRef = doc(db, name, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.data()) return docSnap.data();
  else {
    return null;
  }
};
export const getStats = async () => {
  const dbs = [
    { name: "statisticsMbti", id: "EhbtziVqxDFkotuKiirF", data: {} },
    { name: "statisticsEnneagram", data: {}, id: "MsgWRTFdgv7YHm7YbLpO" },
  ];

  const promises = dbs.map(({ name, id }) => {
    return getSingleStat(name, id)
      .then((stats) => stats.data)
      .catch((error) => console.log("error getting all data", error));
  });

  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then((data) => {
        const mergedData = Object.assign({}, ...data);
        const results = { data: mergedData };
        resolve(results);
      })
      .catch((error) => {
        console.log("error while getting stats", error);
        reject(error);
      });
  });
};

export const saveHiddenTests = async (data, userId) => {
  //get user who has referred
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.data()) {
    return updateDoc(docRef, { hiddenTests: { ...data } })
      .then(() => {
        console.log("updated");
        return true;
      })
      .catch((error) => {
        console.log("error1", error);
      });
  } else {
    return false;
  }
};

export const getIdFromUrl = (url) => {
  const divided = url.split("/");
  return divided[divided.length - 1];
};

export const getIdAndTypeFromUrl = (url) => {
  const divided = url.split("/");
  return {
    id: divided[divided.length - 1],
    type: divided[divided.length - 2],
  };
};

export const verifyUrl = (url) => {
  if (!url) {
    return "";
  }
  if (!/^https:\/\//i.test(url)) {
    url = "https://" + url;
  }
  return url;
};

export const sortGallupData = (data) => {
  return {
    one: data.one,
    two: data.two,
    three: data.three,
    four: data.four,
    five: data.five,
    detail: data.detail,
  };
};

export const sortViaData = (data) => {
  return {
    [data.one_strength]: data.one_score,
    [data.two_strength]: data.two_score,
    [data.three_strength]: data.three_score,
    [data.four_strength]: data.four_score,
    [data.five_strength]: data.five_score,
    [data.six_strength]: data.six_score,
    detail: data.detail,
  };
};

export const personalityCardData = () => {
  const mbti = JSON.parse(localStorage.getItem("MBTI"));
  const enneagram = JSON.parse(localStorage.getItem("Enneagram"));
  const astrology = JSON.parse(localStorage.getItem("Astrology"));

  const message = "Test not completed yet";

  const enneagramType = enneagram?.type || "";
  const enneagramWing =
    enneagram?.wing !== undefined ? `w${enneagram.wing}` : "";
  const enneagramTritype =
    enneagram?.tritype !== undefined ? `  (${enneagram.tritype})` : "";

  const enneagramData = [enneagramType, enneagramWing, enneagramTritype]
    .filter((value) => value !== "")
    .join("");

  return {
    "MBTI Type": mbti?.type || message,
    Enneagram: enneagramData || message,
    Astrology: astrology?.sun || message,
  };
};

export const relationshipCardData = () => {
  const loveLanguages = JSON.parse(localStorage.getItem("LoveLanguages"));
  const attachmentStyle = JSON.parse(localStorage.getItem("AttachmentStyle"));
  const flirtingStyle = JSON.parse(localStorage.getItem("FlirtingStyle"));
  const message = "Test not completed yet";

  return {
    "Love Languages":
      (`Physical Touch ${loveLanguages?.physicalTouch}%  Words of Affirmation ` +
        loveLanguages?.wordsAffirmation || message) + "%",
    "Attachment Style": attachmentStyle?.style || message,
    "Flirting style":
      flirtingStyle?.playful + flirtingStyle?.physical || message,
  };
};

export const getMHQResult = (value) => {
  const number = parseInt(value);
  if (number >= -100 && number <= -50) {
    return "Distressed";
  } else if (number > -50 && number <= 0) {
    return "Struggling";
  } else if (number > 0 && number <= 50) {
    return "Enduring";
  } else if (number > 50 && number <= 100) {
    return "Managing";
  } else if (number > 100 && number <= 150) {
    return "Succeeding";
  } else if (number > 150 && number <= 200) {
    return "Thriving";
  } else {
    return null;
  }
};

export const getPHQ9Result = (value) => {
  const number = parseInt(value);
  if (number >= 0 && number <= 4) {
    return "None-minimal";
  } else if (number > 5 && number <= 9) {
    return "Mild";
  } else if (number > 9 && number <= 14) {
    return "Moderate";
  } else if (number > 15 && number <= 19) {
    return "Moderately Severe";
  } else if (number > 20 && number <= 27) {
    return "Severe";
  } else {
    return null;
  }
};

export const getQIDSSR16Result = (value) => {
  const number = parseInt(value);
  if (number >= 0 && number <= 5) {
    return "No depression";
  } else if (number > 6 && number <= 10) {
    return "Mild depression";
  } else if (number > 11 && number <= 15) {
    return "Moderate depression";
  } else if (number > 16 && number <= 20) {
    return "Severe depression";
  } else if (number > 21 && number <= 27) {
    return "Very severe depression";
  } else {
    return null;
  }
};

export const getGAD7Result = (value) => {
  const number = parseInt(value);
  if (number >= 0 && number <= 4) {
    return "Minimal Anxiety";
  } else if (number > 5 && number <= 9) {
    return "Mild Anxiety";
  } else if (number > 10 && number <= 14) {
    return "Moderate Anxiety";
  } else if (number > 15) {
    return "Severe Anxiety";
  } else {
    return null;
  }
};

export const getHamiltonResults = (value) => {
  const number = parseInt(value);
  if (number < 17) {
    return "Mild severity";
  } else if (number > 18 && number <= 24) {
    return "Mild to moderate severity";
  } else if (number > 25 && number <= 30) {
    return "Moderate to severe";
  } else if (number > 31) {
    return "Severe";
  } else {
    return null;
  }
};
