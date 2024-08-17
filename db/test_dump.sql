--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3 (Debian 16.3-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: consoles; Type: TABLE; Schema: public; Owner: ej
--

CREATE TABLE public.consoles (
    id bigint NOT NULL,
    name text NOT NULL,
    manufacturer text,
    release_date date,
    description text,
    image_path text
);


ALTER TABLE public.consoles OWNER TO ej;

--
-- Name: consoles_id_seq; Type: SEQUENCE; Schema: public; Owner: ej
--

ALTER TABLE public.consoles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.consoles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: games; Type: TABLE; Schema: public; Owner: ej
--

CREATE TABLE public.games (
    id bigint NOT NULL,
    name text NOT NULL,
    developer text,
    publisher text,
    release_date date,
    description text,
    image_path text,
    fk_games_consoles bigint
);


ALTER TABLE public.games OWNER TO ej;

--
-- Name: games_id_seq; Type: SEQUENCE; Schema: public; Owner: ej
--

ALTER TABLE public.games ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.games_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: consoles; Type: TABLE DATA; Schema: public; Owner: ej
--

COPY public.consoles (id, name, manufacturer, release_date, description, image_path) FROM stdin;
\.


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: ej
--

COPY public.games (id, name, developer, publisher, release_date, description, image_path, fk_games_consoles) FROM stdin;
\.


--
-- Name: consoles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ej
--

SELECT pg_catalog.setval('public.consoles_id_seq', 1, false);


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ej
--

SELECT pg_catalog.setval('public.games_id_seq', 1, false);


--
-- Name: consoles consoles_pkey; Type: CONSTRAINT; Schema: public; Owner: ej
--

ALTER TABLE ONLY public.consoles
    ADD CONSTRAINT consoles_pkey PRIMARY KEY (id);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: ej
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: games fk_games_consoles; Type: FK CONSTRAINT; Schema: public; Owner: ej
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT fk_games_consoles FOREIGN KEY (fk_games_consoles) REFERENCES public.consoles(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

