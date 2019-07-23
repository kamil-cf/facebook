const supertest = require("supertest");
const express = require("express");
const applyPostsRoutes = require("../../src/api/routes/posts.routes");
const applyLogsCollectorRoutes = require("../../src/api/routes/logs-collector.routes");
const applyDefaultMiddlewares = require("../../src/api/middlewares/default");
const applyDefaultErrorMiddlewares = require("../../src/api/middlewares/default-error-handler");
const {emptyPost, fakePost} = require("../fakes/fake-post");
const logger = require("../../src/services/logger");

describe("Users routes", () => {
    let server;

    beforeEach(() => {
        const app = express();
        applyDefaultMiddlewares(app);
        applyPostsRoutes(app);
        applyLogsCollectorRoutes(app);
        applyDefaultErrorMiddlewares(app);
        server = supertest(app);
    });

    describe("GET /", () => {
        it("should return correct status code", async () => {
            const response = await server.get("/posts/");

            expect(response.status).toEqual(200);
        });
    });

    describe("POST /", () => {
        it("should insert new post", async () => {
            const response = await server.post("/posts/").send(fakePost());

            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({
                postId: expect.any(String),
                status: "created"
            }))
        });

        it("should return error when there is no password", async () => {
            const response = await server.post("/posts/").send(emptyPost());

            expect(response.status).toEqual(500);
            expect(response.body).toEqual({
                error: "Invalid post"
            });
        });
    });
});