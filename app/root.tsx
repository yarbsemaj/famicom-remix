import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Famiclone  List",
  viewport: "width=device-width,initial-scale=1",
});

import app from "~/app.css";
import stylesheet from "~/tailwind.css";

// or include the full Satellite theme
import satellite from 'instantsearch.css/themes/satellite.css';
import Header from "./components/Header";


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: satellite },
  { rel: "stylesheet", href: app },
  {
    rel: "icon", type: "image/png", href: "/favicon.png"
  }
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
