"use client";
import Image from "next/image";
import Link from "next/link";
import UnknownSVG from "../../public/images/errors/unknown-error.svg";

export default function GlobalError({}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="mx-auto mt-40 flex w-1/2 max-w-3xl items-center justify-center">
          <div className="text-center">
            <Image src={UnknownSVG} alt="Unknown error occurred" />
            <Link className="" href="/">
              Back to home page
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
