import { getDocs, collection, where, query } from "firebase/firestore";
import { db } from "../../firebase.config";

export const getStoryTests = async (user) => {

    const testsRef = collection(db, "WellnessUserStory");
    const q = query(testsRef, where("user", "==", user.uid));
    const storedStories = await getDocs(q)

    const completedStories = {};
    storedStories.forEach((doc) => {
        const storyData = doc.data()
        completedStories[storyData.formType] = true;
    });

    return [
        {name: "Easy", isDone: false, testLink: "/wellness/story-test/easy", storageKey: "story_easy"},
        {name: "Medium", isDone: false, testLink: "/wellness/story-test/medium", storageKey: "story_medium"},
        {name: "Hard", isDone: false, testLink: "/wellness/story-test/hard", storageKey: "story_hard"}
    ].map(
      story => {
          return {
              ...story,
              isDone: completedStories[story.storageKey] === true
          }
      }
    )
}