const supertest = require("supertest");
const express = require("express");
const applyAuthRoutes = require("../../src/api/routes/auth.routes");
const applyUsersRoutes = require("../../src/api/routes/users.routes");
const applySecretRoutes = require("../../src/api/routes/secret.routes");
const applyLogsCollectorRoutes = require("../../src/api/routes/logs-collector.routes");
const applyDefaultMiddlewares = require("../../src/api/middlewares/default");
const applyDefaultErrorMiddlewares = require("../../src/api/middlewares/default-error-handler");

describe("Secret routes", () => {
    let server;

    beforeEach(() => {
        const app = express();
        applyDefaultMiddlewares(app);
        applyUsersRoutes(app);
        applySecretRoutes(app);
        applyAuthRoutes(app);
        applyLogsCollectorRoutes(app);
        applyDefaultErrorMiddlewares(app);
        server = supertest(app);
    });

    describe("POST /", () => {
        it("should have access with a valid session token", async () => {
            const email = "test@test.com";
            const password ="a password";

            await server.post("/users/").send({
                email,
                password,
                name: "test name"
            });
            const authResponse = await server.post("/auth/").send({
                email,
                password
            });
            const authOnlyResponse = await server.post("/secret/").set({
                Authorization: `Bearer ${authResponse.body.sessionId}`
            });

            expect(authOnlyResponse.status).toBe(200);
        });

        it("should not have access with an invalid session token", async () => {
            const authOnlyResponse = await server.post("/secret/").set({
                Authorization: "Bearer not existing token"
            });

            expect(authOnlyResponse.status).toBe(401);
        });
    });
});