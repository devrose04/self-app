export const saveStoryForm = async (type, data) => {
  console.log("saveStoryForm", type, data)
  sessionStorage.setItem(type, JSON.stringify(data));
}
