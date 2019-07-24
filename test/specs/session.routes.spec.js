const supertest = require("supertest");
const express = require("express");
const applySessionRoute = require("../../src/api/routes/session.routes");
const {abortHandler} = require("../../src/api/middlewares/abort-handler");

describe("All get requests", () => {
    let server;

    beforeEach(() => {
        const app = express();
        app.use(abortHandler);
        applySessionRoute(app);
        server = supertest(app);
    });

    it("should abort client request when client aborted a request", async () => {
        const request = server.post("/session/");
        await delay(20);
        await request.abort();

        const response = await server.get("/session/");

        expect(response.body.sessions).toEqual([]);
    });

    it("should not abort client request if client didn't abort a request", async () => {
        const request = await server.post("/session/");

        expect(request.status).toBe(200);
    });
});

function delay(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}