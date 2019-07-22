const supertest = require("supertest");
const express = require("express");
const applyUserRoutes = require("../../src/api/routes/users.routes");
const applyLogsCollectorRoutes = require("../../src/api/routes/logs-collector.routes");
const applyDefaultMiddlewares = require("../../src/api/middlewares/default");
const applyDefaultErrorMiddlewares = require("../../src/api/middlewares/default-error-handler");
const {emptyUser, fakeUser} = require("../fakes/fake-user");
const logger = require("../../src/services/logger");

describe("Users routes", () => {
    let server;

    beforeEach(() => {
        const app = express();
        applyDefaultMiddlewares(app);
        applyUserRoutes(app);
        applyLogsCollectorRoutes(app);
        applyDefaultErrorMiddlewares(app);
        server = supertest(app);
    });

    describe("GET /", () => {
        it("should return correct status code", async () => {
            const response = await server.get("/users/");

            expect(response.status).toEqual(200);
        });
    });

    describe("POST /", () => {
        it("should insert new user", async () => {
            const response = await server.post("/users/").send(fakeUser());

            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({
                userId: expect.any(String),
                status: "registered"
            }))
        });

        it("should return error when there is no password", async () => {
            const response = await server.post("/users/").send(emptyUser());

            expect(response.status).toEqual(500);
            expect(response.body).toEqual({
                error: "Invalid user"
            });
        });
    });
});