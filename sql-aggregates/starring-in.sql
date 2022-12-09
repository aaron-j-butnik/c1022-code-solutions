select "genres"."name" as "genre",
  count(*) as "numberOfFilms"
  from "actors"
  join "castMembers" using ("actorId")
  join "filmGenre" using ("filmId")
  join "genres" using ("genreId")
  where "firstName" = 'Lisa'
    and "lastName" = 'Monroe'
  group by "genre";
