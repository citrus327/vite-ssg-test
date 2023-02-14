import fs from "fs";
import path from "path";
import Koa from "koa";
import koaConnect from "koa-connect";
import { createServer as createViteServer } from "vite";
import colors from "colors";
import { fileURLToPath } from "url";
import serve from "koa-static";

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resolve = (p) => path.resolve(__dirname, p);

const isProduction = process.env.NODE_ENV === "production";

async function createAppServer() {
  const app = new Koa();
  let viteServer;

  if (!isProduction) {
    viteServer = await createViteServer({
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
      },
      appType: "custom",
    });
    app.use(koaConnect(viteServer.middlewares));
  } else {
    app.use(
      serve(resolve("dist/client"), {
        index: false,
      })
    );
  }

  app.use(async (ctx, next) => {
    const { req } = ctx;
    const { url } = req;

    console.log("request coming", url);
    let template, render;
    try {
      if (isProduction) {
        template = fs.readFileSync(resolve("dist/client/index.html"), "utf-8");
        render = (await import("./dist/server/entry-server.js")).render;
      } else {
        template = fs.readFileSync(resolve("index.html"), "utf-8");
        template = await viteServer.transformIndexHtml(url, template);
        render = (await viteServer.ssrLoadModule("/src/entry-server.tsx"))
          .render;
      }

      const context = {};
      const appHtml = await render(url, context);
      const html = template.replace(`<!--app-html-->`, appHtml);

      ctx.status = 200;
      ctx.type = "text/html";
      ctx.body = html;
    } catch (e) {
      !isProduction && viteServer.ssrFixStacktrace(e);
      console.error(e);
      next(e);
    }
  });

  app.listen(PORT, () => {
    console.log(
      colors.green("[React SSR]启动成功, 地址为:"),
      colors.green.underline(`http://localhost:${PORT}`)
    );
  });
}

createAppServer();
