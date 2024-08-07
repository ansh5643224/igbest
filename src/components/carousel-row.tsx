// @ts-nocheck

import AnimeCard from "@/components/cards/anime-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RecentEpisodes, Relation, TrendingAnime } from "@/types/anilist";
import Link from "next/link";
import { CalendarRange, Clock, Library, Star } from "lucide-react";
import clsx from "clsx";

const SingleCarouselRow = ({
  list,
}: {
  list: TrendingAnime[] | RecentEpisodes[] | Relation[];
}) => {
  if (!list)
    return <div className="pt-5 text-2xl text-rose-500">No anime found...</div>;

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="mb-10">
        {list.map((anime) => (
          <CarouselItem
            className="basis-1/3 sm:basis-1/4 xl:basis-1/6"
            key={anime.id}
          >
            <Link href={`/anime/info/${anime.id}`}>
              <div className="max-h-fit max-w-fit" key={anime.id}>
                <AnimeCard anime={anime} />
                <div className="">
                  <h1 className="max-w-28 truncate pt-2 text-xs hover:text-rose-500 sm:max-w-36 sm:text-sm md:max-w-48 lg:max-w-52">
                    {anime.title.english
                      ? anime.title.english
                      : anime.title.romaji}
                  </h1>
                  {anime.rating ? (
                    <div className="flex items-center gap-x-1 pt-1 sm:gap-x-2">
                      {anime.totalEpisodes && (
                        <div className="flex items-center sm:gap-x-1">
                          <Library size={16} />
                          <p className="text-[9px] sm:text-xs">
                            {anime.totalEpisodes}
                          </p>
                        </div>
                      )}

                      {anime.rating && (
                        <div className="flex items-center sm:gap-x-1">
                          <Star size={16} />
                          <p
                            className={clsx(
                              "text-[9px] sm:text-xs",
                              anime.rating >= 80 && "text-green-500",
                              anime.rating >= 40 &&
                                anime.rating < 80 &&
                                "text-yellow-500",
                              anime.rating <= 40 && "text-red-500",
                            )}
                          >
                            {anime.rating}
                          </p>
                        </div>
                      )}

                      {anime.releaseDate && (
                        <div className="flex items-center sm:gap-x-1">
                          <CalendarRange size={16} />
                          <p className="text-[9px] sm:text-xs">
                            {anime.releaseDate}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center pt-1">
                      <Library size={16} />
                      <p className="pl-1 pt-1 text-xs">{anime.episodeNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default SingleCarouselRow;