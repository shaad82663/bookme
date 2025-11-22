import models from "../models/index.js";
import tools from "../tools/index.js";

const bookingModel = models.openAI.bindTools([
  tools.bookingTools.lockSeat,
  tools.bookingTools.checkTicketAvilabilty,
]);

class BookingAgent {
  constructor() {
    if (!this.model) this.model = bookingModel;
  }

  async callModel(prompt, options = {}) {
    const response = await this.model.invoke(prompt, options);
    const functionCallDetails = response.tool_calls || [];
    const results = [];
    for await (const call of functionCallDetails) {
      const input = call.args || {};
      const functionName = call.name;
      const fn = tools.bookingTools[functionName];

      if (!fn) {
        throw new Error(`Unable to assist user request`);
      }
      const result = await fn.invoke(input);
      results.push({
        functionName,
        input,
        result,
      });
    }
    return results;
  }

  async getFormattedResponse(schema, data) {
    const responseWithStructure = this.model.withStructuredOutput(schema);
    try {
      const formattedResult = await responseWithStructure.invoke(data.result);
      return formattedResult;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new BookingAgent();
