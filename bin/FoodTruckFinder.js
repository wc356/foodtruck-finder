#!/usr/bin/env node

// Import Modules
const axios = require("axios");
const { nextTick } = require("process");
const readline = require("readline");

const API_URL = "http://data.sfgov.org/resource/bbb8-hzi6.json";
const rl = readline.createInterface(process.stdin, process.stdout);

// Get current time & date
const date = new Date();
const day = date.getDay();
const time24 = date.toTimeString().slice(0, 5);
let offsetCount = 0; // Keeps count of offset for paginating results

// Enumerations for commonly used, fixed values
const enums = Object.freeze({
  Prompt: {
    OPTIONS: "ENTER: 'n' next, 'b' back, 'q' quit. ",
    END: "\n\tEND OF RESULTS\n",
    NORESULT: "\nNo previous page found.\n",
  },
  Nav: {
    NEXT: {
      LOWERCASE: "n",
      UPPERCASE: "N",
    },
    BACK: {
      LOWERCASE: "b",
      UPPERCASE: "B",
    },
    QUIT: {
      LOWERCASE: "q",
      UPPERCASE: "Q",
    },
  },
});

function app(url) {
  /**
   * A parameters object to interact with Socrata Open Data Api (SODA).
   * @property {number} dayorder - Number corresponding to day of week: 0=Sunday, 1=Monday, etc.
   * @property {number} $limit - Number of results to return. Used for paging results.
   * @property {number} $offset - Index of the result array where to start the returned list of results. Used for paging results.
   * @property {string} $where - SODA's SoQL clauses that include parameters to specify requests.
   */
  let params = {
    dayorder: day,
    $limit: 10,
    $offset: offsetCount,
    $where: `start24<="${time24}" AND "${time24}"<end24`,
  };

  /**
   * Prints out list of trucks.
   * @param {object} foodTrucks - JSON data of food trucks.
   */
  function listFoodTrucks(foodTrucks) {
    foodTrucks.forEach((foodTruck) => {
      console.log(`\n\tNAME:    ${foodTruck.applicant}`);
      console.log(`\tADDRESS: ${foodTruck.location}\n`);
    });
  }

  /**
   * Prints prompt and handles user input.
   * @param {object} { isResultEmpty } - Boolean value indicating if there are food trucks in the current list
   */
  function handleUserInput({ isResultEmpty }) {
    isResultEmpty && console.log(enums.Prompt.END); // if current list is empty, print end prompt
    rl.question(enums.Prompt.OPTIONS, (ans) => {
      switch (ans) {
        case enums.Nav.NEXT.LOWERCASE:
        case enums.Nav.NEXT.UPPERCASE:
          if (!isResultEmpty) {
            offsetCount += 10;
            app(url);
          } else {
            handleUserInput({ isResultEmpty: true });
          }
          break;
        case enums.Nav.BACK.LOWERCASE:
        case enums.Nav.BACK.UPPERCASE:
          if (offsetCount === 0) {
            console.log(enums.Prompt.NORESULT);
            offsetCount -= 10;
            handleUserInput({ isResultEmpty: false });
          } else if (offsetCount < 0) {
            console.log(enums.Prompt.NORESULT);
            handleUserInput({ isResultEmpty: false });
          } else {
            offsetCount -= 10;
            app(url);
          }
          break;
        case enums.Nav.QUIT.LOWERCASE:
        case enums.Nav.QUIT.UPPERCASE:
          process.exit(0);
        default:
          handleUserInput({ isResultEmpty: false });
      }
    });
  }

  axios
    .get(url, { params })
    .then((res) => {
      !res.data.length && handleUserInput({ isResultEmpty: true });
      listFoodTrucks(res.data);
      handleUserInput({ isResultEmpty: false });
    })
    .catch((err) => console.log(err));
}

app(API_URL);

// to run locally, first install the latest version of node and npm.
// open command line and change working directory to root project. then:
// `$ npm install && npm i -G .`
// OR alternatively, in command line, run:
// `$ node .`
// To run the program, type:
// `$ foodtrucks`
