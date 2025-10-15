
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import mdx from "@next/mdx";

const withMDX = mdx({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        // If you use `MDXProvider`, uncomment the following line.
        // providerImportSource: "@mdx-js/react",
    },
});

/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    output: "export",

    // Append the default value with md extensions
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

    images: {
        domains: ["https://img.youtube.com"],
        unoptimized: true,
    },

    rewrites: async () => [
        // { source: "/projects/:proj/app/index.html", destination: "/api/project/:proj" },
    ],

    experimental: {
        images: {
            layoutRaw: true,
        },
    },
}

export default withMDX(nextConfig);
