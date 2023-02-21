import React from "react";
import ReactDomServer from "react-dom/server";

const App = () => {
  return <div>123</div>;
};

const html = ReactDomServer.renderToString(<App />);

console.log(html);
