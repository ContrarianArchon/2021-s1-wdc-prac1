SELECT DISTINCT address.address FROM address
INNER JOIN store on store.address_id = address.address_id
INNER JOIN inventory ON store.store_id = inventory.store_id
INNER JOIN film ON inventory.film_id = film.film_id
WHERE film.title = "TWISTED PIRATES";