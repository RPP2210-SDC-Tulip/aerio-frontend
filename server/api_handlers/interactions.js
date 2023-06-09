const axios = require('axios');
require('dotenv').config();

const APIHostURL = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp";
const APIKey = process.env.FEC_API_KEY;

// Advice from Leslie -- Do not touch this until instructed with a "surprise" later in this project

// Resource:
// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*

// INTERACTIONS
// /interactions <-- POST to add an interaction to the db
  // body params:
    // element (STRING) -- required selector for element which was clicked
    // widget (STRING) -- required param for name of module for widget in which the click occurred
    // time (STRING) -- required param for time the interaction occurred

    const interaction = (data) => {
      console.log('data=====>>', data)

      return axios.post(`${APIHostURL}/interactions`,
        {
          element: data.element,
          widget: data.module,
          time: data.time
        },
        {
          headers: {
          Authorization: APIKey
        }
      });
    };

module.exports.interaction = interaction;
