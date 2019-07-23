const supertest = require("supertest");
const express = require("express");
const applyAuthRoutes = require("../../src/api/routes/auth.routes");
const applyUsersRoutes = require("../../src/api/routes/users.routes");
const applyLogsCollectorRoutes = require("../../src/api/routes/logs-collector.routes");
const applyDefaultMiddlewares = require("../../src/api/middlewares/default");
const applyDefaultErrorMiddlewares = require("../../src/api/middlewares/default-error-handler");

describe("Auth routes", () => {
    let server;

    beforeEach(() => {
        const app = express();
        applyDefaultMiddlewares(app);
        applyUsersRoutes(app);
        applyAuthRoutes(app);
        applyLogsCollectorRoutes(app);
        applyDefaultErrorMiddlewares(app);
        server = supertest(app);
    });

    describe("POST /", () => {
        it("should not login incomplete user", async () => {
            const response = await server.post("/auth/").send({
                email: "test@test.com"
            });

            expect(response.status).toBe(401);
        });

        it("should not login invalid user", async () => {
            const response = await server.post("/auth/").send({
                email: "test@test.com",
                password: "a password"
            });

            expect(response.status).toBe(401);
        });

        it("should login user", async () => {
            const email = "test@test.com";
            const password ="a password";

            await server.post("/users/").send({
                email,
                password,
                name: "test name"
            });
            const response = await server.post("/auth/").send({
                email,
                password
            });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({
                sessionId: expect.any(String)
            }))
        });
    });
});