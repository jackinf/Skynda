--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5rc1
-- Dumped by pg_dump version 9.5rc1

-- Started on 2016-11-20 17:23:24

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 224 (class 3079 OID 12355)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2384 (class 0 OID 0)
-- Dependencies: 224
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 181 (class 1259 OID 57595)
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE address (
    id integer NOT NULL,
    linn character varying(100) NOT NULL,
    maakond character varying(100),
    vald character varying(100),
    street character varying(100) NOT NULL,
    house_number_name character varying(100) NOT NULL,
    apartment_nr character varying(50) NOT NULL,
    postal_code character varying(50)
);


ALTER TABLE address OWNER TO postgres;

--
-- TOC entry 182 (class 1259 OID 57601)
-- Name: addresses_address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE addresses_address_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE addresses_address_id_seq OWNER TO postgres;

--
-- TOC entry 2385 (class 0 OID 0)
-- Dependencies: 182
-- Name: addresses_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE addresses_address_id_seq OWNED BY address.id;


--
-- TOC entry 183 (class 1259 OID 57603)
-- Name: authority; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE authority (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    archived time without time zone
);


ALTER TABLE authority OWNER TO postgres;

--
-- TOC entry 184 (class 1259 OID 57606)
-- Name: authority_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE authority_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE authority_id_seq OWNER TO postgres;

--
-- TOC entry 2386 (class 0 OID 0)
-- Dependencies: 184
-- Name: authority_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE authority_id_seq OWNED BY authority.id;


--
-- TOC entry 185 (class 1259 OID 57608)
-- Name: vehicle_description; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_description (
    id integer NOT NULL,
    title character varying(100),
    content text,
    archived time without time zone,
    vehicle_id integer NOT NULL
);


ALTER TABLE vehicle_description OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 57614)
-- Name: car_description_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE car_description_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE car_description_id_seq OWNER TO postgres;

--
-- TOC entry 2387 (class 0 OID 0)
-- Dependencies: 186
-- Name: car_description_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_description_id_seq OWNED BY vehicle_description.id;


--
-- TOC entry 187 (class 1259 OID 57616)
-- Name: vehicle_fault; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_fault (
    id integer NOT NULL,
    text character varying(100),
    vehicle_id integer NOT NULL,
    archived time without time zone,
    image_id integer
);


ALTER TABLE vehicle_fault OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 57619)
-- Name: car_fault_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE car_fault_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE car_fault_id_seq OWNER TO postgres;

--
-- TOC entry 2388 (class 0 OID 0)
-- Dependencies: 188
-- Name: car_fault_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_fault_id_seq OWNED BY vehicle_fault.id;


--
-- TOC entry 189 (class 1259 OID 57621)
-- Name: vehicle_feature; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_feature (
    id integer NOT NULL,
    vehicle_id integer NOT NULL,
    archived time without time zone,
    feature_id integer DEFAULT 92 NOT NULL
);


ALTER TABLE vehicle_feature OWNER TO postgres;

--
-- TOC entry 190 (class 1259 OID 57624)
-- Name: car_feature_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE car_feature_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE car_feature_id_seq OWNER TO postgres;

--
-- TOC entry 2389 (class 0 OID 0)
-- Dependencies: 190
-- Name: car_feature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_feature_id_seq OWNED BY vehicle_feature.id;


--
-- TOC entry 191 (class 1259 OID 57626)
-- Name: vehicle_image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_image (
    id integer NOT NULL,
    vehicle_id integer,
    archived time without time zone,
    image_id integer NOT NULL
);


ALTER TABLE vehicle_image OWNER TO postgres;

--
-- TOC entry 192 (class 1259 OID 57629)
-- Name: car_image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE car_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE car_image_id_seq OWNER TO postgres;

--
-- TOC entry 2390 (class 0 OID 0)
-- Dependencies: 192
-- Name: car_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_image_id_seq OWNED BY vehicle_image.id;


--
-- TOC entry 193 (class 1259 OID 57631)
-- Name: vehicle_model; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_model (
    id integer NOT NULL,
    model_code character varying(100) NOT NULL,
    description text,
    vehicle_manufacturer_id integer NOT NULL,
    title character varying(255),
    engine character varying(100) NOT NULL,
    horse_power integer,
    doors integer NOT NULL,
    seats character varying(50) NOT NULL,
    year integer NOT NULL,
    archived time without time zone,
    transmission_id integer NOT NULL,
    drivetrain_id integer NOT NULL,
    vehicle_body_id integer NOT NULL,
    fuel_type_id integer NOT NULL
);


ALTER TABLE vehicle_model OWNER TO postgres;

--
-- TOC entry 194 (class 1259 OID 57637)
-- Name: car_model_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE car_model_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE car_model_id_seq OWNER TO postgres;

--
-- TOC entry 2391 (class 0 OID 0)
-- Dependencies: 194
-- Name: car_model_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_model_id_seq OWNED BY vehicle_model.id;


--
-- TOC entry 219 (class 1259 OID 58054)
-- Name: car_report_report_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE car_report_report_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE car_report_report_id_seq OWNER TO postgres;

--
-- TOC entry 195 (class 1259 OID 57647)
-- Name: vehicle_review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_review (
    id integer NOT NULL,
    vehicle_id integer NOT NULL,
    text text,
    rating integer,
    archived time without time zone,
    logo_id integer,
    video_id integer
);


ALTER TABLE vehicle_review OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 57653)
-- Name: car_review_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE car_review_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE car_review_review_id_seq OWNER TO postgres;

--
-- TOC entry 2392 (class 0 OID 0)
-- Dependencies: 196
-- Name: car_review_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_review_review_id_seq OWNED BY vehicle_review.id;


--
-- TOC entry 197 (class 1259 OID 57655)
-- Name: vehicle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle (
    id integer NOT NULL,
    vin_code character varying(100) NOT NULL,
    price numeric(10,2) NOT NULL,
    created timestamp without time zone NOT NULL,
    registration_number character varying(100) NOT NULL,
    mileage numeric(18,2) NOT NULL,
    fuel_city character varying(100),
    fuel_highway character varying(100),
    problems text,
    compression_ratio integer,
    compression_type character varying(50),
    configuration character varying(50),
    cylinders character varying(50),
    displacement character varying(50),
    size integer,
    torque integer,
    total_valves integer,
    safety_stars integer,
    additional character varying(500),
    archived time without time zone,
    vehicle_model_id integer,
    owner_id integer NOT NULL,
    image_id integer NOT NULL,
    color_outside_id integer,
    color_inside_id integer,
    report_title character varying(50)
);


ALTER TABLE vehicle OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 57661)
-- Name: cars_for_sale_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE cars_for_sale_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cars_for_sale_id_seq OWNER TO postgres;

--
-- TOC entry 2393 (class 0 OID 0)
-- Dependencies: 198
-- Name: cars_for_sale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE cars_for_sale_id_seq OWNED BY vehicle.id;


--
-- TOC entry 199 (class 1259 OID 57663)
-- Name: payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE payment (
    id integer NOT NULL,
    vehicle_id integer NOT NULL,
    agreed_price numeric(10,2),
    customer_id integer NOT NULL,
    date_sold timestamp without time zone,
    monthly_payment_amount numeric(10,2),
    monthly_payment_date timestamp without time zone,
    archived time without time zone,
    payment_type_id integer NOT NULL,
    payment_start_date timestamp without time zone,
    payment_end_date timestamp without time zone,
    finance_company_id integer,
    payment_status_id integer
);


ALTER TABLE payment OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 57666)
-- Name: cars_sold_car_sold_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE cars_sold_car_sold_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cars_sold_car_sold_id_seq OWNER TO postgres;

--
-- TOC entry 2394 (class 0 OID 0)
-- Dependencies: 200
-- Name: cars_sold_car_sold_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE cars_sold_car_sold_id_seq OWNED BY payment.id;


--
-- TOC entry 201 (class 1259 OID 57668)
-- Name: classification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE classification (
    id integer NOT NULL,
    description text,
    is_imported boolean NOT NULL,
    weight integer,
    value text,
    modifier_user_id integer NOT NULL,
    modifier_user_ip inet NOT NULL,
    archived timestamp without time zone,
    name character varying(150),
    classification_type_id integer NOT NULL,
    is_active boolean DEFAULT true,
    value2 text
);


ALTER TABLE classification OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 57675)
-- Name: classification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE classification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE classification_id_seq OWNER TO postgres;

--
-- TOC entry 2395 (class 0 OID 0)
-- Dependencies: 202
-- Name: classification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE classification_id_seq OWNED BY classification.id;


--
-- TOC entry 203 (class 1259 OID 57677)
-- Name: classification_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE classification_type (
    id integer NOT NULL,
    name character varying(150),
    description text,
    modifier_user_id integer NOT NULL,
    modifier_user_ip inet NOT NULL,
    archived timestamp without time zone
);


ALTER TABLE classification_type OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 57683)
-- Name: classification_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE classification_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE classification_type_id_seq OWNER TO postgres;

--
-- TOC entry 2396 (class 0 OID 0)
-- Dependencies: 204
-- Name: classification_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE classification_type_id_seq OWNED BY classification_type.id;


--
-- TOC entry 205 (class 1259 OID 57685)
-- Name: finance_company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE finance_company (
    finance_company_name character varying(100),
    id integer NOT NULL,
    name character varying(100),
    archived time without time zone
);


ALTER TABLE finance_company OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 57688)
-- Name: finance_company_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE finance_company_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE finance_company_id_seq OWNER TO postgres;

--
-- TOC entry 2397 (class 0 OID 0)
-- Dependencies: 206
-- Name: finance_company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE finance_company_id_seq OWNED BY finance_company.id;


--
-- TOC entry 217 (class 1259 OID 57955)
-- Name: image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE image (
    id integer NOT NULL,
    url character varying(255),
    blob_name character varying(100),
    container_name character varying(100),
    archived time without time zone
);


ALTER TABLE image OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 57953)
-- Name: image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE image_id_seq OWNER TO postgres;

--
-- TOC entry 2398 (class 0 OID 0)
-- Dependencies: 216
-- Name: image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE image_id_seq OWNED BY image.id;


--
-- TOC entry 207 (class 1259 OID 57690)
-- Name: insurance_company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE insurance_company (
    id integer NOT NULL,
    insurance_company_name character varying(100),
    archived time without time zone
);


ALTER TABLE insurance_company OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 57693)
-- Name: insurance_companies_insurance_company_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE insurance_companies_insurance_company_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE insurance_companies_insurance_company_id_seq OWNER TO postgres;

--
-- TOC entry 2399 (class 0 OID 0)
-- Dependencies: 208
-- Name: insurance_companies_insurance_company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE insurance_companies_insurance_company_id_seq OWNED BY insurance_company.id;


--
-- TOC entry 209 (class 1259 OID 57695)
-- Name: insurance_policy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE insurance_policy (
    id integer NOT NULL,
    car_sold_id integer,
    policy_start_date timestamp without time zone,
    policy_renewal_date timestamp without time zone,
    monthly_payments numeric(10,2),
    insurance_company_id integer,
    archived time without time zone
);


ALTER TABLE insurance_policy OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 57698)
-- Name: insurance_policies_policy_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE insurance_policies_policy_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE insurance_policies_policy_id_seq OWNER TO postgres;

--
-- TOC entry 2400 (class 0 OID 0)
-- Dependencies: 210
-- Name: insurance_policies_policy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE insurance_policies_policy_id_seq OWNED BY insurance_policy.id;


--
-- TOC entry 180 (class 1259 OID 57585)
-- Name: schema_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE schema_version (
    installed_rank integer NOT NULL,
    version character varying(50),
    description character varying(200) NOT NULL,
    type character varying(20) NOT NULL,
    script character varying(1000) NOT NULL,
    checksum integer,
    installed_by character varying(100) NOT NULL,
    installed_on timestamp without time zone DEFAULT now() NOT NULL,
    execution_time integer NOT NULL,
    success boolean NOT NULL
);


ALTER TABLE schema_version OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 57700)
-- Name: token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE token (
    series character varying(50) NOT NULL,
    value character varying(50),
    date timestamp without time zone,
    ip_address character varying(50),
    user_agent character varying(200),
    user_login character varying(50)
);


ALTER TABLE token OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 57709)
-- Name: user_authority; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE user_authority (
    id integer NOT NULL,
    user_id bigint NOT NULL,
    authority_id bigint NOT NULL,
    archived time without time zone
);


ALTER TABLE user_authority OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 57712)
-- Name: user_authority_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_authority_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_authority_id_seq OWNER TO postgres;

--
-- TOC entry 2401 (class 0 OID 0)
-- Dependencies: 213
-- Name: user_authority_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_authority_id_seq OWNED BY user_authority.id;


--
-- TOC entry 215 (class 1259 OID 57919)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE users (
    id integer NOT NULL,
    login character varying(45) NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    phone character varying(255),
    language character(2),
    email character varying(255) NOT NULL,
    password character varying(100) NOT NULL,
    enabled boolean,
    archived timestamp without time zone
);


ALTER TABLE users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 57917)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_id_seq OWNER TO postgres;

--
-- TOC entry 2402 (class 0 OID 0)
-- Dependencies: 214
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_id_seq OWNED BY users.id;


--
-- TOC entry 220 (class 1259 OID 58056)
-- Name: vehicle_report_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_report_category (
    id integer DEFAULT nextval('car_report_report_id_seq'::regclass) NOT NULL,
    vehicle_id integer NOT NULL,
    title character varying(50),
    archived time without time zone
);


ALTER TABLE vehicle_report_category OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 58060)
-- Name: vehicle_report_category_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_report_category_item (
    id integer NOT NULL,
    text character varying(50),
    is_pass boolean,
    vehicle_report_category_id integer,
    archived time without time zone
);


ALTER TABLE vehicle_report_category_item OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 58052)
-- Name: vehicle_report_category_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE vehicle_report_category_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE vehicle_report_category_item_id_seq OWNER TO postgres;

--
-- TOC entry 2403 (class 0 OID 0)
-- Dependencies: 218
-- Name: vehicle_report_category_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE vehicle_report_category_item_id_seq OWNED BY vehicle_report_category_item.id;


--
-- TOC entry 223 (class 1259 OID 64896)
-- Name: vehicle_report_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_report_item (
    id integer NOT NULL,
    vehicle_id integer,
    title character varying(50),
    description text
);


ALTER TABLE vehicle_report_item OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 64894)
-- Name: vehicle_report_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE vehicle_report_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE vehicle_report_item_id_seq OWNER TO postgres;

--
-- TOC entry 2404 (class 0 OID 0)
-- Dependencies: 222
-- Name: vehicle_report_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE vehicle_report_item_id_seq OWNED BY vehicle_report_item.id;


--
-- TOC entry 2120 (class 2604 OID 57716)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY address ALTER COLUMN id SET DEFAULT nextval('addresses_address_id_seq'::regclass);


--
-- TOC entry 2121 (class 2604 OID 57717)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY authority ALTER COLUMN id SET DEFAULT nextval('authority_id_seq'::regclass);


--
-- TOC entry 2132 (class 2604 OID 57718)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification ALTER COLUMN id SET DEFAULT nextval('classification_id_seq'::regclass);


--
-- TOC entry 2133 (class 2604 OID 57719)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification_type ALTER COLUMN id SET DEFAULT nextval('classification_type_id_seq'::regclass);


--
-- TOC entry 2134 (class 2604 OID 57720)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY finance_company ALTER COLUMN id SET DEFAULT nextval('finance_company_id_seq'::regclass);


--
-- TOC entry 2139 (class 2604 OID 57958)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY image ALTER COLUMN id SET DEFAULT nextval('image_id_seq'::regclass);


--
-- TOC entry 2135 (class 2604 OID 57721)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_company ALTER COLUMN id SET DEFAULT nextval('insurance_companies_insurance_company_id_seq'::regclass);


--
-- TOC entry 2136 (class 2604 OID 57722)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_policy ALTER COLUMN id SET DEFAULT nextval('insurance_policies_policy_id_seq'::regclass);


--
-- TOC entry 2130 (class 2604 OID 57723)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment ALTER COLUMN id SET DEFAULT nextval('cars_sold_car_sold_id_seq'::regclass);


--
-- TOC entry 2137 (class 2604 OID 57725)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_authority ALTER COLUMN id SET DEFAULT nextval('user_authority_id_seq'::regclass);


--
-- TOC entry 2138 (class 2604 OID 57922)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 2129 (class 2604 OID 57726)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle ALTER COLUMN id SET DEFAULT nextval('cars_for_sale_id_seq'::regclass);


--
-- TOC entry 2122 (class 2604 OID 57727)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_description ALTER COLUMN id SET DEFAULT nextval('car_description_id_seq'::regclass);


--
-- TOC entry 2123 (class 2604 OID 57728)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_fault ALTER COLUMN id SET DEFAULT nextval('car_fault_id_seq'::regclass);


--
-- TOC entry 2124 (class 2604 OID 57729)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_feature ALTER COLUMN id SET DEFAULT nextval('car_feature_id_seq'::regclass);


--
-- TOC entry 2126 (class 2604 OID 57730)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_image ALTER COLUMN id SET DEFAULT nextval('car_image_id_seq'::regclass);


--
-- TOC entry 2127 (class 2604 OID 57731)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model ALTER COLUMN id SET DEFAULT nextval('car_model_id_seq'::regclass);


--
-- TOC entry 2141 (class 2604 OID 58063)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_report_category_item ALTER COLUMN id SET DEFAULT nextval('vehicle_report_category_item_id_seq'::regclass);


--
-- TOC entry 2142 (class 2604 OID 64899)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_report_item ALTER COLUMN id SET DEFAULT nextval('vehicle_report_item_id_seq'::regclass);


--
-- TOC entry 2128 (class 2604 OID 57733)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_review ALTER COLUMN id SET DEFAULT nextval('car_review_review_id_seq'::regclass);


--
-- TOC entry 2162 (class 2606 OID 57737)
-- Name: PK_car_feature; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_feature
    ADD CONSTRAINT "PK_car_feature" PRIMARY KEY (id);


--
-- TOC entry 2196 (class 2606 OID 57743)
-- Name: PK_classification; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification
    ADD CONSTRAINT "PK_classification" PRIMARY KEY (id);


--
-- TOC entry 2202 (class 2606 OID 57745)
-- Name: PK_classification_type; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification_type
    ADD CONSTRAINT "PK_classification_type" PRIMARY KEY (id);


--
-- TOC entry 2206 (class 2606 OID 57747)
-- Name: PK_finance_company; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY finance_company
    ADD CONSTRAINT "PK_finance_company" PRIMARY KEY (id);


--
-- TOC entry 2226 (class 2606 OID 57968)
-- Name: PK_image; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY image
    ADD CONSTRAINT "PK_image" PRIMARY KEY (id);


--
-- TOC entry 2208 (class 2606 OID 57749)
-- Name: PK_insurance_companies; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_company
    ADD CONSTRAINT "PK_insurance_companies" PRIMARY KEY (id);


--
-- TOC entry 2212 (class 2606 OID 57751)
-- Name: PK_insurance_policies; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_policy
    ADD CONSTRAINT "PK_insurance_policies" PRIMARY KEY (id);


--
-- TOC entry 2235 (class 2606 OID 64904)
-- Name: PK_report_item_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_report_item
    ADD CONSTRAINT "PK_report_item_id" PRIMARY KEY (id);


--
-- TOC entry 2185 (class 2606 OID 57966)
-- Name: PK_vehicle; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle
    ADD CONSTRAINT "PK_vehicle" PRIMARY KEY (id);


--
-- TOC entry 2158 (class 2606 OID 57962)
-- Name: PK_vehicle_fault; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_fault
    ADD CONSTRAINT "PK_vehicle_fault" PRIMARY KEY (id);


--
-- TOC entry 2166 (class 2606 OID 57964)
-- Name: PK_vehicle_image; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_image
    ADD CONSTRAINT "PK_vehicle_image" PRIMARY KEY (id);


--
-- TOC entry 2173 (class 2606 OID 57753)
-- Name: PK_vehicle_model; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "PK_vehicle_model" PRIMARY KEY (id);


--
-- TOC entry 2229 (class 2606 OID 58065)
-- Name: PK_vehicle_report; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_report_category
    ADD CONSTRAINT "PK_vehicle_report" PRIMARY KEY (id);


--
-- TOC entry 2232 (class 2606 OID 58067)
-- Name: PK_vehicle_report_category_item_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_report_category_item
    ADD CONSTRAINT "PK_vehicle_report_category_item_id" PRIMARY KEY (id);


--
-- TOC entry 2178 (class 2606 OID 57757)
-- Name: PK_vehicle_review; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_review
    ADD CONSTRAINT "PK_vehicle_review" PRIMARY KEY (id);


--
-- TOC entry 2192 (class 2606 OID 57759)
-- Name: PK_vehicle_sold; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "PK_vehicle_sold" PRIMARY KEY (id);


--
-- TOC entry 2149 (class 2606 OID 57761)
-- Name: UNIQUE_auth_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY authority
    ADD CONSTRAINT "UNIQUE_auth_name" UNIQUE (name);


--
-- TOC entry 2204 (class 2606 OID 57763)
-- Name: UNIQUE_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification_type
    ADD CONSTRAINT "UNIQUE_name" UNIQUE (name);


--
-- TOC entry 2198 (class 2606 OID 57765)
-- Name: UNIQUE_row; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification
    ADD CONSTRAINT "UNIQUE_row" UNIQUE (value, value2, classification_type_id);


--
-- TOC entry 2147 (class 2606 OID 57767)
-- Name: address_pkey_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY address
    ADD CONSTRAINT address_pkey_id PRIMARY KEY (id);


--
-- TOC entry 2151 (class 2606 OID 57769)
-- Name: authority_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY authority
    ADD CONSTRAINT authority_pkey PRIMARY KEY (id);


--
-- TOC entry 2144 (class 2606 OID 57593)
-- Name: schema_version_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY schema_version
    ADD CONSTRAINT schema_version_pk PRIMARY KEY (installed_rank);


--
-- TOC entry 2214 (class 2606 OID 57773)
-- Name: token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY token
    ADD CONSTRAINT token_pkey PRIMARY KEY (series);


--
-- TOC entry 2218 (class 2606 OID 57775)
-- Name: user_authority_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_authority
    ADD CONSTRAINT user_authority_pkey PRIMARY KEY (id);


--
-- TOC entry 2220 (class 2606 OID 57944)
-- Name: user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- TOC entry 2222 (class 2606 OID 57946)
-- Name: user_login_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT user_login_key UNIQUE (login);


--
-- TOC entry 2224 (class 2606 OID 57927)
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2154 (class 2606 OID 57960)
-- Name: vehicle_description_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_description
    ADD CONSTRAINT vehicle_description_pkey PRIMARY KEY (id);


--
-- TOC entry 2215 (class 1259 OID 57782)
-- Name: FKI_authority_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_authority_id" ON user_authority USING btree (authority_id);


--
-- TOC entry 2209 (class 1259 OID 57783)
-- Name: FKI_car_sold_id_insurance_policy; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_car_sold_id_insurance_policy" ON insurance_policy USING btree (car_sold_id);


--
-- TOC entry 2193 (class 1259 OID 57784)
-- Name: FKI_classification_type_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_classification_type_id" ON classification USING btree (classification_type_id);


--
-- TOC entry 2179 (class 1259 OID 57997)
-- Name: FKI_color_inside_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_color_inside_id" ON vehicle USING btree (color_inside_id);


--
-- TOC entry 2180 (class 1259 OID 57998)
-- Name: FKI_color_outside_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_color_outside_id" ON vehicle USING btree (color_outside_id);


--
-- TOC entry 2186 (class 1259 OID 57785)
-- Name: FKI_customer_id_car_sold; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_customer_id_car_sold" ON payment USING btree (customer_id);


--
-- TOC entry 2167 (class 1259 OID 57786)
-- Name: FKI_drivetrain_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_drivetrain_id" ON vehicle_model USING btree (drivetrain_id);


--
-- TOC entry 2159 (class 1259 OID 58114)
-- Name: FKI_feature_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_feature_id" ON vehicle_feature USING btree (feature_id);


--
-- TOC entry 2187 (class 1259 OID 57787)
-- Name: FKI_finance_company_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_finance_company_id" ON payment USING btree (finance_company_id);


--
-- TOC entry 2168 (class 1259 OID 57788)
-- Name: FKI_fuel_type_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_fuel_type_id" ON vehicle_model USING btree (fuel_type_id);


--
-- TOC entry 2155 (class 1259 OID 57984)
-- Name: FKI_image_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_image_id" ON vehicle_fault USING btree (image_id);


--
-- TOC entry 2181 (class 1259 OID 57986)
-- Name: FKI_image_id_vehicle; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_image_id_vehicle" ON vehicle USING btree (image_id);


--
-- TOC entry 2163 (class 1259 OID 57985)
-- Name: FKI_image_id_vehicle_image; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_image_id_vehicle_image" ON vehicle_image USING btree (image_id);


--
-- TOC entry 2210 (class 1259 OID 57789)
-- Name: FKI_insurance_company_id_insurance_policy; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_insurance_company_id_insurance_policy" ON insurance_policy USING btree (insurance_company_id);


--
-- TOC entry 2174 (class 1259 OID 58084)
-- Name: FKI_logo_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_logo_id" ON vehicle_review USING btree (logo_id);


--
-- TOC entry 2182 (class 1259 OID 57790)
-- Name: FKI_owner_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_owner_id" ON vehicle USING btree (owner_id);


--
-- TOC entry 2188 (class 1259 OID 57791)
-- Name: FKI_payment_status_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_payment_status_id" ON payment USING btree (payment_status_id);


--
-- TOC entry 2189 (class 1259 OID 57792)
-- Name: FKI_payment_type_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_payment_type_id" ON payment USING btree (payment_type_id);


--
-- TOC entry 2169 (class 1259 OID 57793)
-- Name: FKI_transmission_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_transmission_id" ON vehicle_model USING btree (transmission_id);


--
-- TOC entry 2216 (class 1259 OID 57794)
-- Name: FKI_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_user_id" ON user_authority USING btree (user_id);


--
-- TOC entry 2170 (class 1259 OID 57795)
-- Name: FKI_vehicle_body_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_body_id" ON vehicle_model USING btree (vehicle_body_id);


--
-- TOC entry 2152 (class 1259 OID 57952)
-- Name: FKI_vehicle_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id" ON vehicle_description USING btree (vehicle_id);


--
-- TOC entry 2156 (class 1259 OID 57796)
-- Name: FKI_vehicle_id_car_fault; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id_car_fault" ON vehicle_fault USING btree (vehicle_id);


--
-- TOC entry 2160 (class 1259 OID 57797)
-- Name: FKI_vehicle_id_car_feature; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id_car_feature" ON vehicle_feature USING btree (vehicle_id);


--
-- TOC entry 2164 (class 1259 OID 57798)
-- Name: FKI_vehicle_id_car_image; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id_car_image" ON vehicle_image USING btree (vehicle_id);


--
-- TOC entry 2227 (class 1259 OID 58083)
-- Name: FKI_vehicle_id_car_report; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id_car_report" ON vehicle_report_category USING btree (vehicle_id);


--
-- TOC entry 2175 (class 1259 OID 57800)
-- Name: FKI_vehicle_id_car_review; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id_car_review" ON vehicle_review USING btree (vehicle_id);


--
-- TOC entry 2190 (class 1259 OID 57801)
-- Name: FKI_vehicle_id_car_sold; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id_car_sold" ON payment USING btree (vehicle_id);


--
-- TOC entry 2171 (class 1259 OID 57802)
-- Name: FKI_vehicle_manufacturer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_manufacturer_id" ON vehicle_model USING btree (vehicle_manufacturer_id);


--
-- TOC entry 2183 (class 1259 OID 57803)
-- Name: FKI_vehicle_model_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_model_id" ON vehicle USING btree (vehicle_model_id);


--
-- TOC entry 2230 (class 1259 OID 58086)
-- Name: FKI_vehicle_report_category_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_report_category_id" ON vehicle_report_category_item USING btree (vehicle_report_category_id);


--
-- TOC entry 2233 (class 1259 OID 64910)
-- Name: FKI_vehicle_report_item_vehicle_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_report_item_vehicle_id" ON vehicle_report_item USING btree (vehicle_id);


--
-- TOC entry 2176 (class 1259 OID 58085)
-- Name: FKI_video_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_video_id" ON vehicle_review USING btree (video_id);


--
-- TOC entry 2194 (class 1259 OID 57804)
-- Name: FK_modifier_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FK_modifier_user_id" ON classification USING btree (modifier_user_id);


--
-- TOC entry 2200 (class 1259 OID 57805)
-- Name: I_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "I_name" ON classification_type USING btree (name);


--
-- TOC entry 2199 (class 1259 OID 57806)
-- Name: classification_value_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX classification_value_idx ON classification USING hash (value);


--
-- TOC entry 2145 (class 1259 OID 57594)
-- Name: schema_version_s_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX schema_version_s_idx ON schema_version USING btree (success);


--
-- TOC entry 2259 (class 2606 OID 57807)
-- Name: FK_authority_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_authority
    ADD CONSTRAINT "FK_authority_id" FOREIGN KEY (authority_id) REFERENCES authority(id);


--
-- TOC entry 2257 (class 2606 OID 57812)
-- Name: FK_car_sold_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_policy
    ADD CONSTRAINT "FK_car_sold_id" FOREIGN KEY (car_sold_id) REFERENCES payment(id);


--
-- TOC entry 2256 (class 2606 OID 57817)
-- Name: FK_classification_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification
    ADD CONSTRAINT "FK_classification_type_id" FOREIGN KEY (classification_type_id) REFERENCES classification_type(id);


--
-- TOC entry 2250 (class 2606 OID 57987)
-- Name: FK_color_inside_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle
    ADD CONSTRAINT "FK_color_inside_id" FOREIGN KEY (color_inside_id) REFERENCES classification(id);


--
-- TOC entry 2251 (class 2606 OID 57992)
-- Name: FK_color_outside_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle
    ADD CONSTRAINT "FK_color_outside_id" FOREIGN KEY (color_outside_id) REFERENCES classification(id);


--
-- TOC entry 2255 (class 2606 OID 57933)
-- Name: FK_customer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "FK_customer_id" FOREIGN KEY (customer_id) REFERENCES users(id);


--
-- TOC entry 2240 (class 2606 OID 57827)
-- Name: FK_drivetrain_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "FK_drivetrain_id" FOREIGN KEY (drivetrain_id) REFERENCES classification(id);


--
-- TOC entry 2237 (class 2606 OID 58104)
-- Name: FK_feature_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_feature
    ADD CONSTRAINT "FK_feature_id" FOREIGN KEY (feature_id) REFERENCES classification(id);


--
-- TOC entry 2252 (class 2606 OID 57832)
-- Name: FK_finance_company_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "FK_finance_company_id" FOREIGN KEY (finance_company_id) REFERENCES finance_company(id);


--
-- TOC entry 2241 (class 2606 OID 57837)
-- Name: FK_fuel_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "FK_fuel_type_id" FOREIGN KEY (fuel_type_id) REFERENCES classification(id);


--
-- TOC entry 2236 (class 2606 OID 57969)
-- Name: FK_image_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_fault
    ADD CONSTRAINT "FK_image_id" FOREIGN KEY (image_id) REFERENCES image(id);


--
-- TOC entry 2239 (class 2606 OID 57974)
-- Name: FK_image_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_image
    ADD CONSTRAINT "FK_image_id" FOREIGN KEY (image_id) REFERENCES image(id);


--
-- TOC entry 2249 (class 2606 OID 57979)
-- Name: FK_image_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle
    ADD CONSTRAINT "FK_image_id" FOREIGN KEY (image_id) REFERENCES image(id);


--
-- TOC entry 2258 (class 2606 OID 57842)
-- Name: FK_insurance_company_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_policy
    ADD CONSTRAINT "FK_insurance_company_id" FOREIGN KEY (insurance_company_id) REFERENCES insurance_company(id);


--
-- TOC entry 2245 (class 2606 OID 58068)
-- Name: FK_logo_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_review
    ADD CONSTRAINT "FK_logo_id" FOREIGN KEY (logo_id) REFERENCES image(id);


--
-- TOC entry 2248 (class 2606 OID 57928)
-- Name: FK_owner_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle
    ADD CONSTRAINT "FK_owner_id" FOREIGN KEY (owner_id) REFERENCES users(id);


--
-- TOC entry 2253 (class 2606 OID 57852)
-- Name: FK_payment_status_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "FK_payment_status_id" FOREIGN KEY (payment_status_id) REFERENCES classification(id);


--
-- TOC entry 2254 (class 2606 OID 57857)
-- Name: FK_payment_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "FK_payment_type_id" FOREIGN KEY (payment_type_id) REFERENCES classification(id);


--
-- TOC entry 2242 (class 2606 OID 57862)
-- Name: FK_transmission_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "FK_transmission_id" FOREIGN KEY (transmission_id) REFERENCES classification(id);


--
-- TOC entry 2260 (class 2606 OID 57938)
-- Name: FK_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_authority
    ADD CONSTRAINT "FK_user_id" FOREIGN KEY (user_id) REFERENCES users(id);


--
-- TOC entry 2243 (class 2606 OID 57872)
-- Name: FK_vehicle_body_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "FK_vehicle_body_id" FOREIGN KEY (vehicle_body_id) REFERENCES classification(id);


--
-- TOC entry 2238 (class 2606 OID 58109)
-- Name: FK_vehicle_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_feature
    ADD CONSTRAINT "FK_vehicle_id" FOREIGN KEY (vehicle_id) REFERENCES vehicle(id);


--
-- TOC entry 2244 (class 2606 OID 57907)
-- Name: FK_vehicle_manufacturer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "FK_vehicle_manufacturer_id" FOREIGN KEY (vehicle_manufacturer_id) REFERENCES classification(id);


--
-- TOC entry 2247 (class 2606 OID 57912)
-- Name: FK_vehicle_model_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle
    ADD CONSTRAINT "FK_vehicle_model_id" FOREIGN KEY (vehicle_model_id) REFERENCES vehicle_model(id);


--
-- TOC entry 2261 (class 2606 OID 58078)
-- Name: FK_vehicle_report_category_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_report_category_item
    ADD CONSTRAINT "FK_vehicle_report_category_id" FOREIGN KEY (vehicle_report_category_id) REFERENCES vehicle_report_category(id);


--
-- TOC entry 2262 (class 2606 OID 64905)
-- Name: FK_vehicle_report_item_vehicle_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_report_item
    ADD CONSTRAINT "FK_vehicle_report_item_vehicle_id" FOREIGN KEY (vehicle_id) REFERENCES vehicle(id);


--
-- TOC entry 2246 (class 2606 OID 58073)
-- Name: FK_video_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_review
    ADD CONSTRAINT "FK_video_id" FOREIGN KEY (video_id) REFERENCES image(id);


--
-- TOC entry 2383 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2016-11-20 17:23:25

--
-- PostgreSQL database dump complete
--

