import { Carousel } from "@material-tailwind/react";
export function CarouselDefault(props) {
    return (
      <Carousel className="rounded-xl">
        {props?.imgs && props?.imgs.map((img, index) => {
            return <img
            src={img}
            alt={"Image " + index}
            className="h-full w-full object-cover"
          />
        })}
      </Carousel>
    );
  }
