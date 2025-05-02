import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const res = await fetch("/api/imagekit-auth");
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Request failed with status ${res.status}: ${errorText} `
      );
    }

    const data = await res.json();
    const { signature, token, expire } = data;
    return { signature, token, expire };
  } catch (err) {
    throw new Error(`Autrhntication request failed : ${err.message}`);
  }
};

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ImageKitProvider
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticationEndpoint={authenticator}
      >
        {children}
      </ImageKitProvider>
    </SessionProvider>
  );
}
