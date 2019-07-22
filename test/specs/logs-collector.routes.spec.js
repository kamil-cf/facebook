const supertest = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const applyBaseRoutes = require("../../src/api/routes/logs-collector.routes");
const applyDefaultMiddlewares = require("../../src/api/middlewares/default");
const fakeLogs = require("../fakes/fake-log");

describe("Log collector routes", () => {
    let server;

    beforeEach(() => {
        const app = express();
        applyDefaultMiddlewares(app);
        applyBaseRoutes(app);
        server = supertest(app);
    });

    describe("GET /", () => {
        it("should return correct status code", async () => {
            const response = await server.get("/logs/");

            expect(response.status).toEqual(200);
        });
    });

    describe("POST /", () => {
        it("should insert new log", async () => {
            await server.post("/logs/").send(fakeLogs());
            const response = await server.get("/logs/");

            expect(response.body.length).toEqual(1);
        });
    });

    describe("DELETE /", () => {
        it("should delete all logs", async () => {
            await server.post("/logs/").send(fakeLogs());
            await server.delete("/logs/");
            const response = await server.get("/logs/");

            expect(response.body.length).toEqual(0);
        });
    })
});