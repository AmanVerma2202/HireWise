/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-interview_owner:Lw1mjYxVks7f@ep-green-bush-a1yj9qug.ap-southeast-1.aws.neon.tech/ai-interview?sslmode=require',
    }
  };