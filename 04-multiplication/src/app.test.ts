import { ServerApp } from "./presentation/server-app";

describe("ServerApp", () => {
  it("should run the server with the provided options", async () => {
    
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = ['node', 'app', '-b', '5', '-l', '10', '-s', '-n', 'output', '-d', 'outputs'];

    const mockOptions = {
      base: 5,
      limit: 10,
      show: true,
      fileName: "output",
      destination: "outputs",
    };

    await import("./app");

    expect(serverRunMock).toHaveBeenCalledTimes(1);
    expect(serverRunMock).toHaveBeenCalledWith(mockOptions);

  });
});
