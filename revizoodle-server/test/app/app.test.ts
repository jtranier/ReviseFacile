import request from "supertest"
import app from "../../src/app/app"

describe("Revizoodle-server Tests Suite", () => {

  it("should respond with a 200 status code", async () => {
    const response = await request(app)
      .get('/api/course/123')

    expect(response.statusCode).toBe(200)
  })

})