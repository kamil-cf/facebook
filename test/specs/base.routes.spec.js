const supertest = require("supertest");
const express = require("express");
const applyBaseRoutes = require("../../src/api/routes/base.routes");

describe("All get requests", () => {
    let server;

    beforeEach(() => {
        const app = express();
        applyBaseRoutes(app);
        server = supertest(app);
    });

    it("should return correct status message", async () => {
        const response = await server.get("/");

        expect(response.body.status).toEqual("ok");
    });

    it("should return correct status code", async () => {
        const response = await server.get("/");

        expect(response.status).toEqual(200);
    });
});