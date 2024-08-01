import { redirect } from "next/navigation";

export default async function Home() {
  //const session = await getSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <form
          action={async (formData) => {
            "use server";
            //await login(formData);
            redirect("/");
          }}
        >
          <input type="email" placeholder="Email" />
          <br />
          <button type="submit"> Login</button>
        </form>
        <form
          action={async (formData) => {
            "use server";
            //await logout();
            redirect("/");
          }}
        >
          <button type="submit">Logout</button>
        </form>
      </section>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
    </main>
  );
}
