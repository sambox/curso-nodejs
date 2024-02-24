import { ServerApp } from "./presentation/server-app";

describe("ServerApp", () => {
  it("should run the server with the provided options", async () => {
    const mockOptions = {
      base: 5,
      limit: 10,
      show: true,
      fileName: "output",
      destination: "outputs",
    };

    // Mock any necessary dependencies or setup here

    // Call the run method of ServerApp with the mock options
    await ServerApp.run(mockOptions);

    // Assert the expected behavior or outcome here
    // For example, check if the server is running or if the output file is created
  });
});
