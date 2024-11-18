-- ----------------------------------------------------------------------------------------------------
-- drop table and functions: images
-- ----------------------------------------------------------------------------------------------------
drop table if exists images cascade;

-- ----------------------------------------------------------------------------------------------------
-- drop table and functions: consoles
-- ----------------------------------------------------------------------------------------------------
drop table if exists consoles cascade;

-- ----------------------------------------------------------------------------------------------------
-- drop table and functions: games
-- ----------------------------------------------------------------------------------------------------
drop table if exists games cascade;

-- ----------------------------------------------------------------------------------------------------
-- drop table and functions: purchases
-- ----------------------------------------------------------------------------------------------------
drop table if exists purchases cascade;

-- ----------------------------------------------------------------------------------------------------
-- create table: images
-- ----------------------------------------------------------------------------------------------------
create table images(
    id uuid default gen_random_uuid(),
    name text not null,
    description text,
    path text,
    constraint pk_images primary key (id)
);

-- ----------------------------------------------------------------------------------------------------
-- create table: consoles
-- ----------------------------------------------------------------------------------------------------
create table consoles(
    id uuid default gen_random_uuid(),
    name text not null,
    manufacturer text,
    release_date text,
    description text,
    image_id uuid,
    constraint pk_consoles primary key (id),
    constraint fk_consoles_images foreign key (image_id)
        references images (id)
        on update cascade
        on delete set null
);

-- ----------------------------------------------------------------------------------------------------
-- create table: games
-- ----------------------------------------------------------------------------------------------------
create table games(
    id uuid default gen_random_uuid(),
    name text not null,
    developer text,
    publisher text,
    release_date text,
    description text,
    image_id uuid,
    console_id uuid,
    constraint pk_games primary key (id),
    constraint fk_games_images foreign key (image_id)
        references images (id)
        on update cascade
        on delete set null,
    constraint fk_games_consoles foreign key (console_id)
        references consoles (id)
        on update cascade
        on delete set null
);

-- ----------------------------------------------------------------------------------------------------
-- create table: purchases
-- ----------------------------------------------------------------------------------------------------
create table purchases(
    id uuid default gen_random_uuid(),
    name text not null,
    purchase_date text,
    cost_base numeric,
    cost_tax numeric,
    cost_shipping numeric,
    cost_other numeric,
    cost_total numeric generated always as (cost_base + cost_tax + cost_shipping + cost_other) stored,
    notes text,
    image_id uuid,
    console_id uuid,
    game_id uuid,
    constraint pk_purchases primary key (id),
    constraint fk_purchases_images foreign key (image_id)
        references images (id)
        on update cascade
        on delete set null,
    constraint fk_purchases_consoles foreign key (console_id)
        references consoles (id)
        on update cascade
        on delete set null,
    constraint fk_purchases_games foreign key (game_id)
        references games (id)
        on update cascade
        on delete set null
);

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

select * from insert_image('test', null, null);

-- ----------------------------------------------------------------------------------------------------
-- create function: insert_console
-- ----------------------------------------------------------------------------------------------------
create or replace function insert_console(
    name_in text,
    manufacturer_in text,
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
            release_date,
            description,
            image_id
        ) values (
            name_in,
            manufacturer_in,
            release_date_in,
            description_in,
            image_id_in
        ) returning *
    ) select * from inserted;
end;
$$ language plpgsql;

select * from insert_console('test', null, null, null, null);

-- ----------------------------------------------------------------------------------------------------
-- create function: insert_game
-- ----------------------------------------------------------------------------------------------------
create or replace function insert_game(
    name_in text,
    developer_in text,
    publisher_in text,
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
            release_date,
            description,
            image_id,
            console_id
        ) values (
            name_in,
            developer_in,
            publisher_in,
            release_date_in,
            description_in,
            image_id_in,
            console_id_in
        ) returning *
    ) select * from inserted;
end;
$$ language plpgsql;

select * from insert_game('test', null, null, null, null, null, null);

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
            notes_in,
            image_id_in,
            console_id_in,
            game_id_in
        ) returning *
    ) select * from inserted;
end;
$$ language plpgsql;

select * from insert_purchase('test', null, 0.0, 1.0, 2.0, 3.0, null, null, null, null);