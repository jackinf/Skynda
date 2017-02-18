/**
 * Created by jevgenir on 11/7/2016.
 */
export default {
  LOCAL_STORAGE_KEYS: {
    SKYNDA_USER: "SKYNDA_USER"
  }
}

// Natuke laisk lahendus värvide otsingu osas
// id-d ja hex-id peavad olema vastavuses backendiga, mis on klassis: me/skynda/vehicle/dao/VehicleDao.java meetodis mapColorIdToHex
export const colors = [
  {id: -1, name: "Kõik"},
  {id: 1, style: {"backgroundColor":  "#f44336"}, hideName: true, isColored: true},
  {id: 2, style: {"backgroundColor":  "#e91e63"}, hideName: true, isColored: true},
  // {id: 3, style: {"backgroundColor":  "#9c27b0"}, hideName: true, isColored: true},
  // {id: 4, style: {"backgroundColor":  "#673ab7"}, hideName: true, isColored: true},
  {id: 5, style: {"backgroundColor":  "#3f51b5"}, hideName: true, isColored: true},
  // {id: 6, style: {"backgroundColor":  "#2196f3"}, hideName: true, isColored: true},
  {id: 7, style: {"backgroundColor":  "#03a9f4"}, hideName: true, isColored: true},
  // {id: 8, style: {"backgroundColor":  "#00bcd4"}, hideName: true, isColored: true},
  {id: 9, style: {"backgroundColor":  "#009688"}, hideName: true, isColored: true},
  {id: 10, style: {"backgroundColor": "#4caf50"}, hideName: true, isColored: true},
  // {id: 11, style: {"backgroundColor": "#8bc34a"}, hideName: true, isColored: true},
  // {id: 12, style: {"backgroundColor": "#cddc39"}, hideName: true, isColored: true},
  {id: 13, style: {"backgroundColor": "#ffeb3b"}, hideName: true, isColored: true},
  // {id: 14, style: {"backgroundColor": "#ffc107"}, hideName: true, isColored: true},
  {id: 15, style: {"backgroundColor": "#ff9800"}, hideName: true, isColored: true},
  // {id: 16, style: {"backgroundColor": "#ff5722"}, hideName: true, isColored: true},
  {id: 17, style: {"backgroundColor": "#795548"}, hideName: true, isColored: true},
  {id: 18, style: {"backgroundColor": "#607d8b"}, hideName: true, isColored: true}
];

export const colorHashes = colors
  .filter(color => color && color.style && color.style.backgroundColor)
  .map(color => color.style.backgroundColor);
