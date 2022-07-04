/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { prisma } from "../utils/prisma.ts";

interface User {
  id: string;
  name?: string;
  email: string;
  links: Link[];
}

interface Link {
  id: string;
  url: string;
  shortUrl: string;
}

export const handler: Handlers<User | null> = {
  async GET(_, ctx) {
    const users = await prisma.user.findMany({
      include: { links: true },
    });
    return ctx.render(users);
  },
};

export default function Home({ data }: PageProps<Array<User>>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class={tw`my-6`}>
        Welcome to `fresh`. Try update this message in the ./routes/index.tsx
        file, and refresh.
      </p>
      <p class={tw`mb-6`}>Data fetched from Prisma</p>
      {data.map((user) => {
        return (
          <div class={tw`mb-4`}>
            <h3>
              User: {user.name} (<i>{user.id}</i>)
            </h3>
            <h4>Email: {user.email}</h4>
            Links:
            <ul class={tw`list-disc`}>
              {user.links.map((link) => {
                return (
                  <li>
                    <a href={link.url}>{link.url}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      <Counter start={3} />
    </div>
  );
}
