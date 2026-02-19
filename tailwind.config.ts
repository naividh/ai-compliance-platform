import type { Config } from "tailwindcss";

export default {
    content: [
          "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
          "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
          "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        ],
    theme: {
          extend: {
                  colors: {
                            slate: {
                                        750: '#293548',
                                        850: '#172032',
                            },
                  },
          },
    },
    plugins: [],
} satisfies Config;
