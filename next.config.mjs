
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

    // Append the default value with md extensions
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
}

export default withMDX(nextConfig);
