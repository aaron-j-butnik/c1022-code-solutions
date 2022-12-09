select "countries"."name" as "countryName",
  count(*) as "numberOfCities"
  from "cities"
  join "countries" using ("countryId")
  group by "countryName";
