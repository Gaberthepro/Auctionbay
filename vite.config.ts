import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
    "process.env.VITE_AWS_ACCESS_KEY": JSON.stringify(
      process.env.VITE_AWS_ACCESS_KEY
    ),
    "process.env.VITE_AWS_SECRET_ACCESS_KEY": JSON.stringify(
      process.env.VITE_AWS_SECRET_ACCESS_KEY
    ),
    "process.env.VITE_AWS_BUCKET_NAME": JSON.stringify(
      process.env.VITE_AWS_BUCKET_NAME
    ),
    "process.env.VITE_AWS_REGION": JSON.stringify(process.env.VITE_AWS_REGION),
    "process.env.VITE_AWS_S3_URL": JSON.stringify(process.env.VITE_AWS_S3_URL)
  },
  resolve: {
    alias: {
      "aws-sdk": "aws-sdk/dist/aws-sdk.min.js"
    }
  }
});
