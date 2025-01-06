-- ----------------------------------------------------------------------------------------------------
-- create function: insert_image
-- ----------------------------------------------------------------------------------------------------
create or replace function insert_image(
    name_in text,
    description_in text,
    path_in text
) returns setof images as $$
begin
    return query
    with inserted as (
        insert into images(
            name,
            description,
            path
        ) values (
            name_in,
            description_in,
            path_in
        ) returning *
    ) select * from inserted;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: insert_console
-- ----------------------------------------------------------------------------------------------------
create or replace function insert_console(
    name_in text,
    manufacturer_in text,
    region_in text,
    release_date_in text,
    description_in text,
    image_id_in uuid
) returns setof consoles as $$
begin
    return query
    with inserted as (
        insert into consoles(
            name,
            manufacturer,
            region,
            release_date,
            description,
            image_id
        ) values (
            name_in,
            manufacturer_in,
            region_in,
            release_date_in,
            description_in,
            image_id_in
        ) returning *
    ) select * from inserted;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: insert_game
-- ----------------------------------------------------------------------------------------------------
create or replace function insert_game(
    name_in text,
    developer_in text,
    publisher_in text,
    region_in text,
    release_date_in text,
    description_in text,
    image_id_in uuid,
    console_id_in uuid
) returns setof games as $$
begin
    return query
    with inserted as (
        insert into games(
            name,
            developer,
            publisher,
            region,
            release_date,
            description,
            image_id,
            console_id
        ) values (
            name_in,
            developer_in,
            publisher_in,
            region_in,
            release_date_in,
            description_in,
            image_id_in,
            console_id_in
        ) returning *
    ) select * from inserted;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: insert_purchase
-- ----------------------------------------------------------------------------------------------------
create or replace function insert_purchase(
    name_in text,
    purchase_date_in text,
    cost_base_in numeric,
    cost_tax_in numeric,
    cost_shipping_in numeric,
    cost_other_in numeric,
    purchase_from_in text,
    notes_in text,
    image_id_in uuid,
    console_id_in uuid,
    game_id_in uuid
) returns setof purchases as $$
begin
    return query
    with inserted as (
        insert into purchases(
            name,
            purchase_date,
            cost_base,
            cost_tax,
            cost_shipping,
            cost_other,
            purchase_from,
            notes,
            image_id,
            console_id,
            game_id
        ) values (
            name_in,
            purchase_date_in,
            cost_base_in,
            cost_tax_in,
            cost_shipping_in,
            cost_other_in,
            purchase_from_in,
            notes_in,
            image_id_in,
            console_id_in,
            game_id_in
        ) returning *
    ) select * from inserted;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: fetch_image
-- ----------------------------------------------------------------------------------------------------
create or replace function fetch_image(
    id_in uuid
) returns setof images as $$
begin
    return query
    select * from images where id = id_in;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: fetch_image_all
-- ----------------------------------------------------------------------------------------------------
create or replace function fetch_image_all() returns setof images as $$
begin
    return query
    select * from images order by modified_timestamp desc;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: fetch_image_limit
-- ----------------------------------------------------------------------------------------------------
create or replace function fetch_image_limit(
    limit_in integer
) returns setof images as $$
begin
    return query
    select * from images order by modified_timestamp desc limit limit_in;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: fetch_console
-- ----------------------------------------------------------------------------------------------------
create or replace function fetch_console(
    id_in uuid
) returns setof consoles as $$
begin
    return query
    select * from consoles where id = id_in;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: fetch_console_all
-- ----------------------------------------------------------------------------------------------------
create or replace function fetch_console_all() returns setof consoles as $$
begin
    return query
    select * from consoles order by modified_timestamp desc;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: fetch_console_limit
-- ----------------------------------------------------------------------------------------------------
create or replace function fetch_console_limit(
    limit_in integer
) returns setof consoles as $$
begin
    return query
    select * from consoles order by modified_timestamp desc limit limit_in;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: fetch_game
-- ----------------------------------------------------------------------------------------------------
create or replace function fetch_game(
    id_in uuid
) returns setof games as $$
begin
    return query
    select * from games where id = id_in;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: fetch_game_all
-- ----------------------------------------------------------------------------------------------------
create or replace function fetch_game_all() returns setof games as $$
begin
    return query
    select * from games order by modified_timestamp desc;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: fetch_game_limit
-- ----------------------------------------------------------------------------------------------------
create or replace function fetch_game_limit(
    limit_in integer
) returns setof games as $$
begin
    return query
    select * from games order by modified_timestamp desc limit limit_in;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: fetch_purchase
-- ----------------------------------------------------------------------------------------------------
create or replace function fetch_purchase(
    id_in uuid
) returns setof purchases as $$
begin
    return query
    select * from purchases where id = id_in;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: fetch_purchase_all
-- ----------------------------------------------------------------------------------------------------
create or replace function fetch_purchase_all() returns setof purchases as $$
begin
    return query
    select * from purchases order by modified_timestamp desc;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: fetch_purchase_limit
-- ----------------------------------------------------------------------------------------------------
create or replace function fetch_purchase_limit(
    limit_in integer
) returns setof purchases as $$
begin
    return query
    select * from purchases order by modified_timestamp desc limit limit_in;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: update_image
-- ----------------------------------------------------------------------------------------------------
create or replace function update_image(
    id_in uuid,
    name_in text,
    description_in text,
    path_in text
) returns setof images as $$
begin
    return query
    with updated as (
        update images set
            name = name_in,
            description = description_in,
            path = path_in,
            modified_timestamp = transaction_timestamp()
            where id = id_in
            returning *
    ) select * from updated;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: update_console
-- ----------------------------------------------------------------------------------------------------
create or replace function update_console(
    id_in uuid,
    name_in text,
    manufacturer_in text,
    region_in text,
    release_date_in text,
    description_in text,
    image_id_in uuid
) returns setof consoles as $$
begin
    return query
    with updated as (
        update consoles set
            name = name_in,
            manufacturer = manufacturer_in,
            region = region_in,
            release_date = release_date_in,
            description = description_in,
            image_id = image_id_in,
            modified_timestamp = transaction_timestamp()
            where id = id_in
            returning *
    ) select * from updated;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: update_game
-- ----------------------------------------------------------------------------------------------------
create or replace function update_game(
    id_in uuid,
    name_in text,
    developer_in text,
    publisher_in text,
    region_in text,
    release_date_in text,
    description_in text,
    image_id_in uuid,
    console_id_in uuid
) returns setof games as $$
begin
    return query
    with updated as (
        update games set
            name = name_in,
            developer = developer_in,
            publisher = publisher_in,
            region = region_in,
            release_date = release_date_in,
            description = description_in,
            image_id = image_id_in,
            console_id = console_id_in,
            modified_timestamp = transaction_timestamp()
            where id = id_in
            returning *
    ) select * from updated;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: update_purchase
-- ----------------------------------------------------------------------------------------------------
create or replace function update_purchase(
    id_in uuid,
    name_in text,
    purchase_date_in text,
    cost_base_in numeric,
    cost_tax_in numeric,
    cost_shipping_in numeric,
    cost_other_in numeric,
    purchase_from_in text,
    notes_in text,
    image_id_in uuid,
    console_id_in uuid,
    game_id_in uuid
) returns setof purchases as $$
begin
    return query
    with updated as (
        update purchases set
            name = name_in,
            purchase_date = purchase_date_in,
            cost_base = cost_base_in,
            cost_tax = cost_tax_in,
            cost_shipping = cost_shipping_in,
            cost_other = cost_other_in,
            purchase_from = purchase_from_in,
            notes = notes_in,
            image_id = image_id_in,
            console_id = console_id_in,
            game_id = game_id_in,
            modified_timestamp = transaction_timestamp()
            where id = id_in
            returning *
    ) select * from updated;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: delete_image
-- ----------------------------------------------------------------------------------------------------
create or replace function delete_image(
    id_in uuid
) returns setof images as $$
begin
    return query
    with deleted as (
        delete from images where id = id_in returning *
    ) select * from deleted;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: delete_console
-- ----------------------------------------------------------------------------------------------------
create or replace function delete_console(
    id_in uuid
) returns setof consoles as $$
begin
    return query
    with deleted as (
        delete from consoles where id = id_in returning *
    ) select * from deleted;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: delete_game
-- ----------------------------------------------------------------------------------------------------
create or replace function delete_game(
    id_in uuid
) returns setof games as $$
begin
    return query
    with deleted as (
        delete from games where id = id_in returning *
    ) select * from deleted;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------------------------------
-- create function: delete_image
-- ----------------------------------------------------------------------------------------------------
create or replace function delete_purchase(
    id_in uuid
) returns setof purchases as $$
begin
    return query
    with deleted as (
        delete from purchases where id = id_in returning *
    ) select * from deleted;
end;
$$ language plpgsql;