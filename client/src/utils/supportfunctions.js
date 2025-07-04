import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

export const filters = [
  { id: 2, name: "Quran", value: "Quran" },
  { id: 3, name: "Podcast", value: "Podcast" },
  { id: 4, name: "Conferance", value: "Conferance" },
  { id: 5, name: "Book", value: "Book" },
];

export const filterByLanguage = [
  { id: 1, name: "Arabe", value: "Arabe" },
  { id: 2, name: "English", value: "english" },
  { id: 3, name: "French", value: "French" },

];

export const deleteAnObject = (referenceUrl) => {
  const deleteRef = ref(storage, referenceUrl);
  deleteObject(deleteRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};
