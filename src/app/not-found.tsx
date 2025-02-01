import Image from "next/image";
import Link from "next/link";
import NotFoundSvg from "../../public/images/errors/404.svg";

export default function DefaultPage() {
  return (
    <div className="mx-auto mt-40 flex w-1/2 max-w-3xl items-center justify-center">
      <div className="text-center">
        <Image src={NotFoundSvg} alt="Page not Found" />
        <Link className="" href="/">
          Back to home page
        </Link>
      </div>
    </div>
  );
}
