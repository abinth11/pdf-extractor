import { Application,Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../../package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pdf extractor api docs",
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/adapters/swagger/docs/*.yaml"],
//   apis: ["./src/frameworks/webserver/routes/*.ts", "./src/schema/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Application, port: string) {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs are available at http://localhost:${port}/docs`.bgYellow.bold)
}

export default swaggerDocs;