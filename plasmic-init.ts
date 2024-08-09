import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "8uDg9RTpF7ECVGA2BV47zS",
      token:
        "zmo8HNSEF2XemY87OxDC203OvEB2cUJIWSL5YxMJn3fu0KVtHiTARKRNlUWuCGueW9WVzrxn6P53hGjPksyg",
      version:
        process.env.NEXT_PUBLIC_NODE_ENV === "production"
          ? "prod"
          : process.env.NEXT_PUBLIC_NODE_ENV === "development"
          ? "staging"
          : // If not production or staging, then just use the latest
            // published version, regardless of tags
            undefined,
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: false,
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// PLASMIC.registerComponent(...);
