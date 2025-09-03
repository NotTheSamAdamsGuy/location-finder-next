// import "server-only";

// import { cookies } from "next/headers";
// import { decrypt } from "@/app/lib/session";
// import { cache } from "react";
// import { redirect } from "next/navigation";
// import pg from "pg";

// const { Pool } = pg;
// const pool = new Pool({
//   host: process.env.POSTGRES_HOST,
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   port: parseInt(process.env.POSTGRES_PORT!),
//   database: process.env.POSTGRES_DATABASE,
//   max: 100
// });

// export const verifySession = cache(async () => {
//   const cookie = (await cookies()).get("session")?.value;
//   const session = await decrypt(cookie);

//   if (!session?.userId) {
//     redirect("/login");
//   }

//   return { isAuth: true, userId: session.userId };
// });

// export const getUser = async (email: string, password: string) => {
//   try {
//     const client = await pool.connect();
//     let user = "";
//     try {
//       const output = await client.query(
//         `SELECT user_id FROM users where email = '${email}' and password = '${password}'`
//       );
//       if (output.rows.length > 0) {
//         user = output.rows[0].user_id;
//       }
//     } catch (err) {
//       console.error("getUser", err);
//     } finally {
//       client.release();
//     }

//     return user;
//   } catch (err) {
//     console.log("db pool not available", err);
//   }
// };

// export const getUserGuesses = cache(async () => {
//   const session = await verifySession();
//   if (!session) return null;

//   const userId = session?.userId;
//   let guesses = [];

//   try {
//     const client = await pool.connect();
//     const output = await client.query(
//       `SELECT * from guesses where user_id = '${userId}'`
//     );
//     if (output.rows.length > 0) {
//       guesses = output.rows[0];
//     }
//   } catch (error) {
//     console.error("Error occurred while retrieving guess data", error);
//   }
//   return guesses;
// });

// export async function saveGuess(guess: string) {
//   const session = await verifySession();
//   if (!session) return null;

//   let result;

//   try {
//     const userId = session?.userId;
//     const client = await pool.connect();

//     result = await client.query(
//       "INSERT INTO guesses (user_id, guess) VALUES ($1, $2) RETURNING *",
//       [userId, guess]
//     );
//   } catch (error) {
//     console.error("Error occurred while retrieving guess data", error);
//   }
//   return result;
// }

// export const getDashboardData = async () => {
//   const session = await verifySession();
//   if (!session) return null;

//   let guesses = [];

//   try {
//     const client = await pool.connect();
//     const output = await client.query(
//       `SELECT u.name, g.guess FROM users u JOIN guesses g ON u.user_id = g.user_id`
//     );
//     if (output.rows.length > 0) {
//       guesses = output.rows;
//     }
//   } catch (error) {
//     console.error("Error occurred while retrieving user data", error);
//   }
//   return guesses;
// };
