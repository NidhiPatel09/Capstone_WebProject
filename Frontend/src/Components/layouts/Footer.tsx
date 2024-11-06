"use client";
import {
  FacebookIcon,
  FacebookShareButton,
  InstagramIcon,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 w-full">
  <div className="container mx-auto px-4 flex flex-col items-center space-y-4">
    <div className="flex space-x-6 justify-center">
      <FacebookShareButton
        url={"https://github.com/next-share"}
        quote={"next-share is a social share buttons for your next React apps."}
        hashtag={"#nextshare"}
      >
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      <FacebookShareButton
        url={"https://github.com/next-share"}
        quote={"next-share is a social share buttons for your next React apps."}
        hashtag={"#nextshare"}
      >
        <InstagramIcon size={40} round />
      </FacebookShareButton>
      <TwitterShareButton url="">
        <TwitterIcon size={40} round />
      </TwitterShareButton>
    </div>
    <div className="text-center">
      <p>Follow us on Internet</p>
      <p className="text-sm">
        Developed by Nidhi, Sparsh & Karan <br />© 2024 RecipeFinder
      </p>
    </div>
  </div>
</footer>
  );
}
