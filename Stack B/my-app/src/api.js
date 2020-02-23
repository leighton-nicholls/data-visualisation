import axios from "axios";
import { checkArraysEqual } from "./equal.js";

export function retrieveExecutionDocuments() {
  axios
    .get("/getAllExecutionDocuments")
    .then(response => {
      // handle success

      const executions = JSON.parse(localStorage.getItem("executions") || "[]"); // the [] pipes it into an array since it is an array of javascript objects

      //executions.splice(13, 1)

      //localStorage.setItem('executions', JSON.stringify(executions));

      //console.log("Before: ", JSON.parse(localStorage.getItem("executions") || "[]"))

      // checks if the incoming response data input equals the same as the corresponding localStorage object. If so, replace the existing one with the new data. Otherwise do nothing.
      checkArraysEqual(executions, response.data) === false &&
        localStorage.setItem("executions", JSON.stringify(response.data));

      // console.log(executions);
      //console.log("After: ", JSON.parse(localStorage.getItem("executions") || "[]"))
    })
    .catch(error => {
      // handle error
      console.log(error);
    })
    .finally(() => {
      // always executed
    });
}

export function retrieveInnocenceDocuments() {
  axios
    .get("/getAllInnocenceDocuments")
    .then(response => {
      // handle success

      const innocence = JSON.parse(localStorage.getItem("innocence") || "[]"); // the [] pipes it into an array since it is an array of javascript objects

      //executions.splice(13, 1)

      //localStorage.setItem('executions', JSON.stringify(executions));

      //console.log("Before: ", JSON.parse(localStorage.getItem("executions") || "[]"))

      // checks if the incoming response data input equals the same as the corresponding localStorage object. If so, replace the existing one with the new data. Otherwise do nothing.
      checkArraysEqual(innocence, response.data) === false &&
        localStorage.setItem("innocence", JSON.stringify(response.data));

      //console.log(innocence);
      //console.log("After: ", JSON.parse(localStorage.getItem("executions") || "[]"))
    })
    .catch(error => {
      // handle error
      console.log(error);
    })
    .finally(() => {
      // always executed
    });
}

export function retrieveCrimeDocuments() {
  axios
    .get("/getAllCrimeDocuments")
    .then(response => {
      // handle success

      const crimes = JSON.parse(localStorage.getItem("crimes") || "[]"); // the [] pipes it into an array since it is an array of javascript objects

      // checks if the incoming response data input equals the same as the corresponding localStorage object. If so, replace the existing one with the new data. Otherwise do nothing.
      checkArraysEqual(crimes, response.data) === false &&
        localStorage.setItem("crimes", JSON.stringify(response.data));
      //console.log(response);
    })
    .catch(error => {
      // handle error
      console.log(error);
    })
    .finally(() => {
      // always executed
    });
}

export function retrieveOpinionDocuments() {
  axios
    .get("/getAllOpinionDocuments")
    .then(response => {
      // handle success

      const opinions = JSON.parse(localStorage.getItem("opinions") || "[]"); // the [] pipes it into an array since it is an array of javascript objects

      // checks if the incoming response data input equals the same as the corresponding localStorage object. If so, replace the existing one with the new data. Otherwise do nothing.
      checkArraysEqual(opinions, response.data) === false &&
        localStorage.setItem("opinions", JSON.stringify(response.data));

      //console.log(response);
    })
    .catch(error => {
      // handle error
      console.log(error);
    })
    .finally(() => {
      // always executed
    });
}

export function retrieveSentencingDocuments() {
  axios
    .get("/getAllSentencingDocuments")
    .then(response => {
      // handle success

      const sentences = JSON.parse(localStorage.getItem("sentences") || "[]"); // the [] pipes it into an array since it is an array of javascript objects

      // checks if the incoming response data input equals the same as the corresponding localStorage object. If so, replace the existing one with the new data. Otherwise do nothing.
      checkArraysEqual(sentences, response.data) === false &&
        localStorage.setItem("sentences", JSON.stringify(response.data));

      //console.log(response);
    })
    .catch(error => {
      // handle error
      console.log(error);
    })
    .finally(() => {
      // always executed
    });
}

export function retrieveLegalDocuments() {
  axios
    .get("/getAllLegalDocuments")
    .then(response => {
      // handle success

      const legal = JSON.parse(localStorage.getItem("legal") || "[]"); // the [] pipes it into an array since it is an array of javascript objects

      // checks if the incoming response data input equals the same as the corresponding localStorage object. If so, replace the existing one with the new data. Otherwise do nothing.
      checkArraysEqual(legal, response.data) === false &&
        localStorage.setItem("legal", JSON.stringify(response.data));

      //console.log(response);
    })
    .catch(error => {
      // handle error
      console.log(error);
    })
    .finally(() => {
      // always executed
    });
}

export function retrieveDeathRowDocuments() {
  axios
    .get("/getAllDeathRowDocuments")
    .then(response => {
      // handle success

      const death_row = JSON.parse(localStorage.getItem("death_row") || "[]"); // the [] pipes it into an array since it is an array of javascript objects

      // checks if the incoming response data input equals the same as the corresponding localStorage object. If so, replace the existing one with the new data. Otherwise do nothing.
      checkArraysEqual(death_row, response.data) === false &&
        localStorage.setItem("death_row", JSON.stringify(response.data));

      //console.log(response);
    })
    .catch(error => {
      // handle error
      console.log(error);
    })
    .finally(() => {
      // always executed
    });
}
