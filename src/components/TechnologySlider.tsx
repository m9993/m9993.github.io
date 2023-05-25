import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import data from "@/data";
import Image from "next/image";

export default function TechnologySlider() {
  return (
    <Splide
      options={{
        rewind: true,
        type: "loop",
        perPage: 5,
        perMove: 1,
        autoplay: true,
        interval: 1000,
        gap: 20,
        height: "8vw",
        cover: true,
        arrows: false,
      }}
      aria-label="React Splide Example"
    >
      {data.technologies.map((item) => (
        <SplideSlide>
          <Image src={item.img} alt={item.title} width={200} height={200} />
        </SplideSlide>
      ))}
    </Splide>
  );
}
