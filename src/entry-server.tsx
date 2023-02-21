import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

// context ?FIXME
export function render(url: string, context: any) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}

// import ReactDOMServer from "react-dom/server";
// import { StaticRouter } from "react-router-dom/server";
// import App from "./App";
// import Koa from "koa";

// // context ?FIXME
// export function render(url: string, context: Koa.ParameterizedContext) {
//   let didError = false;
//   const stream = ReactDOMServer.renderToPipeableStream(
//     <StaticRouter location={url}>
//       <App />
//     </StaticRouter>,
//     {
//       onShellReady() {
//         context.status = didError ? 500 : 200;
//         context.type = "text/html";
//         stream.pipe(context);
//       },
//       onShellError(error) {},
//       onAllReady() {},
//       onError(err) {},
//     }
//   );
// }
