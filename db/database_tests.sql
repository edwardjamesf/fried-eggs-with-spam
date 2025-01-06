-- ----------------------------------------------------------------------------------------------------
-- create function: run_integration_test
-- ----------------------------------------------------------------------------------------------------
drop function if exists run_integration_test;

create or replace function run_integration_test() returns integer as $$
declare
    image_key uuid;
    console_key uuid;
    game_key uuid;
    purchase_key uuid;
begin
    select id into image_key from insert_image('test', null, null);
    select id into console_key from insert_console('test', null, null, null, null, null);
    select id into game_key from insert_game('test', null, null, null, null, null, null, null);
    select id into purchase_key from insert_purchase('test', null, 0.0, 1.0, 2.0, 3.0, null, null, null, null, null);

    perform fetch_image(image_key);
    perform fetch_console(console_key);
    perform fetch_game(game_key);
    perform fetch_purchase(purchase_key);

    perform update_image(image_key, 'test', 'description', 'path');
    perform update_console(console_key, 'test', 'manufacturer', 'region', 'release_date', 'description', null);
    perform update_game(game_key, 'test', 'developer', 'publisher', 'region', 'release_date', 'description', image_key, console_key);
    perform update_purchase(purchase_key, 'test', 'purchase_date', 10.11, 20.22, 30.33, 40.44, 'purchase_from', 'notes', image_key, console_key, game_key);

    perform delete_image(image_key);
    perform delete_console(console_key);
    perform delete_game(game_key);
    perform delete_purchase(purchase_key);

    return 1;
end;
$$ language plpgsql;

select run_integration_test();

drop function if exists run_integration_test;

-- ----------------------------------------------------------------------------------------------------
-- build initial set of data
-- ----------------------------------------------------------------------------------------------------
drop function if exists build_initial_dataset;

create or replace function build_initial_dataset() returns setof purchases as $$
declare
    console_key uuid;
    game_key uuid;
begin
    select id into console_key from insert_console('Saturn', 'Sega', 'Japan', '11/22/1994', 'The Sega Saturn[a][b] is a home video game console developed by Sega and released on November 22, 1994, in Japan, May 11, 1995, in North America, and July 8, 1995, in Europe. Part of the fifth generation of video game consoles, it is the successor to the successful Genesis. The Saturn has a dual-CPU architecture and eight processors. Its games are in CD-ROM format, including several ports of arcade games and original games.', null);
    select id into game_key from insert_game('Vampire Hunter: Darkstalkers Revenge', 'Capcom', 'Capcom', 'Japan', '03/03/1995', 'Night Warriors: Darkstalkers Revenge, known in Japan as Vampire Hunter: Darkstalkers Revenge[a], is a 1995 arcade fighting game produced by Capcom and the second in the Darkstalkers series, following Darkstalkers: The Night Warriors (1994). Darkstalkers Revenge was ported to the Sega Saturn home console in 1996 and was later followed by a sequel, Vampire Savior / Darkstalkers 3 (1997).', null, console_key);
	
	return query
    select * from insert_purchase('Sega Saturn bundle', '01/19/2021', 133.99, 10.38, 0.0, 0.0, 'Ebay', 'Grey Japanese model 1 Saturn with blue buttons. Includes power and composite video cables, 1 controller, and Vampire Hunter. Slightly yellowed.', null, console_key, game_key);
    return;
end;
$$ language plpgsql;

/* Run me
select build_initial_dataset();
*/