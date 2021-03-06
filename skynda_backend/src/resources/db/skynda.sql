--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

-- Started on 2017-02-18 15:18:46

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12355)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2405 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 182 (class 1259 OID 137423)
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
    postal_code character varying(50),
    archived timestamp without time zone
);


ALTER TABLE address OWNER TO postgres;

--
-- TOC entry 183 (class 1259 OID 137429)
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
-- TOC entry 2406 (class 0 OID 0)
-- Dependencies: 183
-- Name: addresses_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE addresses_address_id_seq OWNED BY address.id;


--
-- TOC entry 184 (class 1259 OID 137431)
-- Name: authority; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE authority (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    archived timestamp without time zone
);


ALTER TABLE authority OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 137434)
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
-- TOC entry 2407 (class 0 OID 0)
-- Dependencies: 185
-- Name: authority_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE authority_id_seq OWNED BY authority.id;


--
-- TOC entry 186 (class 1259 OID 137436)
-- Name: vehicle_description; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_description (
    id integer NOT NULL,
    title character varying(100),
    content text,
    vehicle_id integer NOT NULL,
    archived timestamp without time zone
);


ALTER TABLE vehicle_description OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 137442)
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
-- TOC entry 2408 (class 0 OID 0)
-- Dependencies: 187
-- Name: car_description_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_description_id_seq OWNED BY vehicle_description.id;


--
-- TOC entry 188 (class 1259 OID 137444)
-- Name: vehicle_fault; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_fault (
    id integer NOT NULL,
    text character varying(100),
    image_id integer,
    archived timestamp without time zone,
    vehicle_report_category_id integer DEFAULT 1 NOT NULL
);


ALTER TABLE vehicle_fault OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 137447)
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
-- TOC entry 2409 (class 0 OID 0)
-- Dependencies: 189
-- Name: car_fault_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_fault_id_seq OWNED BY vehicle_fault.id;


--
-- TOC entry 190 (class 1259 OID 137449)
-- Name: vehicle_feature; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_feature (
    id integer NOT NULL,
    vehicle_id integer NOT NULL,
    feature_id integer DEFAULT 92 NOT NULL,
    archived timestamp without time zone
);


ALTER TABLE vehicle_feature OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 137452)
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
-- TOC entry 2410 (class 0 OID 0)
-- Dependencies: 191
-- Name: car_feature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_feature_id_seq OWNED BY vehicle_feature.id;


--
-- TOC entry 192 (class 1259 OID 137454)
-- Name: vehicle_image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_image (
    id integer NOT NULL,
    vehicle_id integer,
    image_id integer NOT NULL,
    archived timestamp without time zone
);


ALTER TABLE vehicle_image OWNER TO postgres;

--
-- TOC entry 193 (class 1259 OID 137457)
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
-- TOC entry 2411 (class 0 OID 0)
-- Dependencies: 193
-- Name: car_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_image_id_seq OWNED BY vehicle_image.id;


--
-- TOC entry 194 (class 1259 OID 137459)
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
    year integer NOT NULL,
    transmission_id integer NOT NULL,
    drivetrain_id integer NOT NULL,
    vehicle_body_id integer NOT NULL,
    fuel_type_id integer NOT NULL,
    seats integer DEFAULT 2,
    archived timestamp without time zone
);


ALTER TABLE vehicle_model OWNER TO postgres;

--
-- TOC entry 195 (class 1259 OID 137465)
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
-- TOC entry 2412 (class 0 OID 0)
-- Dependencies: 195
-- Name: car_model_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_model_id_seq OWNED BY vehicle_model.id;


--
-- TOC entry 220 (class 1259 OID 137829)
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
-- TOC entry 196 (class 1259 OID 137475)
-- Name: vehicle_review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_review (
    id integer NOT NULL,
    vehicle_id integer NOT NULL,
    text text,
    rating integer,
    logo_id integer,
    video_id integer,
    archived timestamp without time zone
);


ALTER TABLE vehicle_review OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 137481)
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
-- TOC entry 2413 (class 0 OID 0)
-- Dependencies: 197
-- Name: car_review_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_review_review_id_seq OWNED BY vehicle_review.id;


--
-- TOC entry 198 (class 1259 OID 137483)
-- Name: vehicle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle (
    id integer NOT NULL,
    vin_code character varying(100) NOT NULL,
    price numeric(10,2) NOT NULL,
    created timestamp without time zone NOT NULL,
    registration_number character varying(100) NOT NULL,
    mileage numeric(18,2) NOT NULL,
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
    vehicle_model_id integer,
    owner_id integer NOT NULL,
    image_id integer NOT NULL,
    report_title character varying(50),
    fuel_city numeric(5,2),
    fuel_highway numeric(5,2),
    safety_url character varying(200),
    archived timestamp without time zone,
    color_outside_hex character varying(20),
    color_inside_hex character varying(20)
);


ALTER TABLE vehicle OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 137489)
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
-- TOC entry 2414 (class 0 OID 0)
-- Dependencies: 199
-- Name: cars_for_sale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE cars_for_sale_id_seq OWNED BY vehicle.id;


--
-- TOC entry 200 (class 1259 OID 137491)
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
    payment_type_id integer NOT NULL,
    payment_start_date timestamp without time zone,
    payment_end_date timestamp without time zone,
    finance_company_id integer,
    payment_status_id integer,
    archived timestamp without time zone
);


ALTER TABLE payment OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 137494)
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
-- TOC entry 2415 (class 0 OID 0)
-- Dependencies: 201
-- Name: cars_sold_car_sold_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE cars_sold_car_sold_id_seq OWNED BY payment.id;


--
-- TOC entry 202 (class 1259 OID 137496)
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
    name character varying(150),
    classification_type_id integer NOT NULL,
    is_active boolean DEFAULT true,
    value2 text,
    archived timestamp without time zone
);


ALTER TABLE classification OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 137503)
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
-- TOC entry 2416 (class 0 OID 0)
-- Dependencies: 203
-- Name: classification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE classification_id_seq OWNED BY classification.id;


--
-- TOC entry 204 (class 1259 OID 137505)
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
-- TOC entry 205 (class 1259 OID 137511)
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
-- TOC entry 2417 (class 0 OID 0)
-- Dependencies: 205
-- Name: classification_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE classification_type_id_seq OWNED BY classification_type.id;


--
-- TOC entry 226 (class 1259 OID 137949)
-- Name: feature; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE feature (
    id integer NOT NULL,
    name character varying(255),
    weight integer,
    value text,
    description text,
    is_active boolean DEFAULT true,
    modifier_user_id integer NOT NULL,
    modifier_user_ip character varying NOT NULL,
    archived timestamp without time zone,
    is_imported boolean DEFAULT true NOT NULL
);


ALTER TABLE feature OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 137947)
-- Name: feature_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE feature_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE feature_id_seq OWNER TO postgres;

--
-- TOC entry 2418 (class 0 OID 0)
-- Dependencies: 225
-- Name: feature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE feature_id_seq OWNED BY feature.id;


--
-- TOC entry 206 (class 1259 OID 137513)
-- Name: finance_company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE finance_company (
    finance_company_name character varying(100),
    id integer NOT NULL,
    name character varying(100),
    archived timestamp without time zone
);


ALTER TABLE finance_company OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 137516)
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
-- TOC entry 2419 (class 0 OID 0)
-- Dependencies: 207
-- Name: finance_company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE finance_company_id_seq OWNED BY finance_company.id;


--
-- TOC entry 218 (class 1259 OID 137783)
-- Name: image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE image (
    id integer NOT NULL,
    url character varying(255),
    blob_name character varying(100),
    container_name character varying(100),
    archived timestamp without time zone
);


ALTER TABLE image OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 137781)
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
-- TOC entry 2420 (class 0 OID 0)
-- Dependencies: 217
-- Name: image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE image_id_seq OWNED BY image.id;


--
-- TOC entry 208 (class 1259 OID 137518)
-- Name: insurance_company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE insurance_company (
    id integer NOT NULL,
    insurance_company_name character varying(100),
    archived timestamp without time zone
);


ALTER TABLE insurance_company OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 137521)
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
-- TOC entry 2421 (class 0 OID 0)
-- Dependencies: 209
-- Name: insurance_companies_insurance_company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE insurance_companies_insurance_company_id_seq OWNED BY insurance_company.id;


--
-- TOC entry 210 (class 1259 OID 137523)
-- Name: insurance_policy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE insurance_policy (
    id integer NOT NULL,
    car_sold_id integer,
    policy_start_date timestamp without time zone,
    policy_renewal_date timestamp without time zone,
    monthly_payments numeric(10,2),
    insurance_company_id integer,
    archived timestamp without time zone
);


ALTER TABLE insurance_policy OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 137526)
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
-- TOC entry 2422 (class 0 OID 0)
-- Dependencies: 211
-- Name: insurance_policies_policy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE insurance_policies_policy_id_seq OWNED BY insurance_policy.id;


--
-- TOC entry 181 (class 1259 OID 137413)
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
-- TOC entry 224 (class 1259 OID 137911)
-- Name: subscription; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE subscription (
    id integer NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    email character varying(255) NOT NULL,
    user_id integer,
    archived timestamp without time zone
);


ALTER TABLE subscription OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 137909)
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE subscription_id_seq OWNER TO postgres;

--
-- TOC entry 2423 (class 0 OID 0)
-- Dependencies: 223
-- Name: subscription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE subscription_id_seq OWNED BY subscription.id;


--
-- TOC entry 212 (class 1259 OID 137528)
-- Name: token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE token (
    series character varying(50) NOT NULL,
    value character varying(50),
    date timestamp without time zone,
    ip_address character varying(50),
    user_agent character varying(200),
    user_login character varying(50),
    archived timestamp without time zone
);


ALTER TABLE token OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 137537)
-- Name: user_authority; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE user_authority (
    id integer NOT NULL,
    user_id bigint NOT NULL,
    authority_id bigint NOT NULL,
    archived timestamp without time zone
);


ALTER TABLE user_authority OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 137540)
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
-- TOC entry 2424 (class 0 OID 0)
-- Dependencies: 214
-- Name: user_authority_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_authority_id_seq OWNED BY user_authority.id;


--
-- TOC entry 216 (class 1259 OID 137747)
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
-- TOC entry 215 (class 1259 OID 137745)
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
-- TOC entry 2425 (class 0 OID 0)
-- Dependencies: 215
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_id_seq OWNED BY users.id;


--
-- TOC entry 221 (class 1259 OID 137831)
-- Name: vehicle_report_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_report_category (
    id integer DEFAULT nextval('car_report_report_id_seq'::regclass) NOT NULL,
    vehicle_id integer NOT NULL,
    title character varying(50),
    description character varying,
    inspector_name character varying(100),
    archived timestamp without time zone
);


ALTER TABLE vehicle_report_category OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 137835)
-- Name: vehicle_report_category_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_report_category_item (
    id integer NOT NULL,
    text character varying,
    is_pass boolean,
    vehicle_report_category_id integer,
    title character varying(255),
    archived timestamp without time zone
);


ALTER TABLE vehicle_report_category_item OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 137827)
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
-- TOC entry 2426 (class 0 OID 0)
-- Dependencies: 219
-- Name: vehicle_report_category_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE vehicle_report_category_item_id_seq OWNED BY vehicle_report_category_item.id;


--
-- TOC entry 2128 (class 2604 OID 137544)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY address ALTER COLUMN id SET DEFAULT nextval('addresses_address_id_seq'::regclass);


--
-- TOC entry 2129 (class 2604 OID 137545)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY authority ALTER COLUMN id SET DEFAULT nextval('authority_id_seq'::regclass);


--
-- TOC entry 2142 (class 2604 OID 137546)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification ALTER COLUMN id SET DEFAULT nextval('classification_id_seq'::regclass);


--
-- TOC entry 2143 (class 2604 OID 137547)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification_type ALTER COLUMN id SET DEFAULT nextval('classification_type_id_seq'::regclass);


--
-- TOC entry 2154 (class 2604 OID 137952)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY feature ALTER COLUMN id SET DEFAULT nextval('feature_id_seq'::regclass);


--
-- TOC entry 2144 (class 2604 OID 137548)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY finance_company ALTER COLUMN id SET DEFAULT nextval('finance_company_id_seq'::regclass);


--
-- TOC entry 2149 (class 2604 OID 137786)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY image ALTER COLUMN id SET DEFAULT nextval('image_id_seq'::regclass);


--
-- TOC entry 2145 (class 2604 OID 137549)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_company ALTER COLUMN id SET DEFAULT nextval('insurance_companies_insurance_company_id_seq'::regclass);


--
-- TOC entry 2146 (class 2604 OID 137550)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_policy ALTER COLUMN id SET DEFAULT nextval('insurance_policies_policy_id_seq'::regclass);


--
-- TOC entry 2140 (class 2604 OID 137551)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment ALTER COLUMN id SET DEFAULT nextval('cars_sold_car_sold_id_seq'::regclass);


--
-- TOC entry 2152 (class 2604 OID 137914)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subscription ALTER COLUMN id SET DEFAULT nextval('subscription_id_seq'::regclass);


--
-- TOC entry 2147 (class 2604 OID 137553)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_authority ALTER COLUMN id SET DEFAULT nextval('user_authority_id_seq'::regclass);


--
-- TOC entry 2148 (class 2604 OID 137750)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 2139 (class 2604 OID 137554)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle ALTER COLUMN id SET DEFAULT nextval('cars_for_sale_id_seq'::regclass);


--
-- TOC entry 2130 (class 2604 OID 137555)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_description ALTER COLUMN id SET DEFAULT nextval('car_description_id_seq'::regclass);


--
-- TOC entry 2131 (class 2604 OID 137556)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_fault ALTER COLUMN id SET DEFAULT nextval('car_fault_id_seq'::regclass);


--
-- TOC entry 2133 (class 2604 OID 137557)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_feature ALTER COLUMN id SET DEFAULT nextval('car_feature_id_seq'::regclass);


--
-- TOC entry 2135 (class 2604 OID 137558)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_image ALTER COLUMN id SET DEFAULT nextval('car_image_id_seq'::regclass);


--
-- TOC entry 2136 (class 2604 OID 137559)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model ALTER COLUMN id SET DEFAULT nextval('car_model_id_seq'::regclass);


--
-- TOC entry 2151 (class 2604 OID 137838)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_report_category_item ALTER COLUMN id SET DEFAULT nextval('vehicle_report_category_item_id_seq'::regclass);


--
-- TOC entry 2138 (class 2604 OID 137561)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_review ALTER COLUMN id SET DEFAULT nextval('car_review_review_id_seq'::regclass);


--
-- TOC entry 2176 (class 2606 OID 137565)
-- Name: PK_car_feature; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_feature
    ADD CONSTRAINT "PK_car_feature" PRIMARY KEY (id);


--
-- TOC entry 2214 (class 2606 OID 137571)
-- Name: PK_classification; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification
    ADD CONSTRAINT "PK_classification" PRIMARY KEY (id);


--
-- TOC entry 2220 (class 2606 OID 137573)
-- Name: PK_classification_type; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification_type
    ADD CONSTRAINT "PK_classification_type" PRIMARY KEY (id);


--
-- TOC entry 2255 (class 2606 OID 137959)
-- Name: PK_feature; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY feature
    ADD CONSTRAINT "PK_feature" PRIMARY KEY (id);


--
-- TOC entry 2224 (class 2606 OID 137575)
-- Name: PK_finance_company; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY finance_company
    ADD CONSTRAINT "PK_finance_company" PRIMARY KEY (id);


--
-- TOC entry 2244 (class 2606 OID 137796)
-- Name: PK_image; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY image
    ADD CONSTRAINT "PK_image" PRIMARY KEY (id);


--
-- TOC entry 2226 (class 2606 OID 137577)
-- Name: PK_insurance_companies; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_company
    ADD CONSTRAINT "PK_insurance_companies" PRIMARY KEY (id);


--
-- TOC entry 2230 (class 2606 OID 137579)
-- Name: PK_insurance_policies; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_policy
    ADD CONSTRAINT "PK_insurance_policies" PRIMARY KEY (id);


--
-- TOC entry 2253 (class 2606 OID 137917)
-- Name: PK_subscription; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subscription
    ADD CONSTRAINT "PK_subscription" PRIMARY KEY (id);


--
-- TOC entry 2201 (class 2606 OID 137794)
-- Name: PK_vehicle; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle
    ADD CONSTRAINT "PK_vehicle" PRIMARY KEY (id);


--
-- TOC entry 2172 (class 2606 OID 137790)
-- Name: PK_vehicle_fault; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_fault
    ADD CONSTRAINT "PK_vehicle_fault" PRIMARY KEY (id);


--
-- TOC entry 2182 (class 2606 OID 137792)
-- Name: PK_vehicle_image; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_image
    ADD CONSTRAINT "PK_vehicle_image" PRIMARY KEY (id);


--
-- TOC entry 2189 (class 2606 OID 137581)
-- Name: PK_vehicle_model; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "PK_vehicle_model" PRIMARY KEY (id);


--
-- TOC entry 2247 (class 2606 OID 137840)
-- Name: PK_vehicle_report; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_report_category
    ADD CONSTRAINT "PK_vehicle_report" PRIMARY KEY (id);


--
-- TOC entry 2250 (class 2606 OID 137842)
-- Name: PK_vehicle_report_category_item_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_report_category_item
    ADD CONSTRAINT "PK_vehicle_report_category_item_id" PRIMARY KEY (id);


--
-- TOC entry 2196 (class 2606 OID 137585)
-- Name: PK_vehicle_review; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_review
    ADD CONSTRAINT "PK_vehicle_review" PRIMARY KEY (id);


--
-- TOC entry 2210 (class 2606 OID 137587)
-- Name: PK_vehicle_sold; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "PK_vehicle_sold" PRIMARY KEY (id);


--
-- TOC entry 2163 (class 2606 OID 137589)
-- Name: UNIQUE_auth_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY authority
    ADD CONSTRAINT "UNIQUE_auth_name" UNIQUE (name);


--
-- TOC entry 2257 (class 2606 OID 137961)
-- Name: UNIQUE_feature_row; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY feature
    ADD CONSTRAINT "UNIQUE_feature_row" UNIQUE (value, name);


--
-- TOC entry 2191 (class 2606 OID 137968)
-- Name: UNIQUE_model; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "UNIQUE_model" UNIQUE (model_code, vehicle_manufacturer_id, title);


--
-- TOC entry 2222 (class 2606 OID 137591)
-- Name: UNIQUE_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification_type
    ADD CONSTRAINT "UNIQUE_name" UNIQUE (name);


--
-- TOC entry 2216 (class 2606 OID 137593)
-- Name: UNIQUE_row; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification
    ADD CONSTRAINT "UNIQUE_row" UNIQUE (value, value2, classification_type_id);


--
-- TOC entry 2178 (class 2606 OID 137979)
-- Name: UNIQUE_vehicle_feature; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_feature
    ADD CONSTRAINT "UNIQUE_vehicle_feature" UNIQUE (vehicle_id, feature_id, archived);


--
-- TOC entry 2203 (class 2606 OID 137981)
-- Name: UNIQUE_vin; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle
    ADD CONSTRAINT "UNIQUE_vin" UNIQUE (vin_code);


--
-- TOC entry 2161 (class 2606 OID 137595)
-- Name: address_pkey_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY address
    ADD CONSTRAINT address_pkey_id PRIMARY KEY (id);


--
-- TOC entry 2165 (class 2606 OID 137597)
-- Name: authority_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY authority
    ADD CONSTRAINT authority_pkey PRIMARY KEY (id);


--
-- TOC entry 2158 (class 2606 OID 137421)
-- Name: schema_version_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY schema_version
    ADD CONSTRAINT schema_version_pk PRIMARY KEY (installed_rank);


--
-- TOC entry 2232 (class 2606 OID 137601)
-- Name: token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY token
    ADD CONSTRAINT token_pkey PRIMARY KEY (series);


--
-- TOC entry 2236 (class 2606 OID 137603)
-- Name: user_authority_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_authority
    ADD CONSTRAINT user_authority_pkey PRIMARY KEY (id);


--
-- TOC entry 2238 (class 2606 OID 137772)
-- Name: user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- TOC entry 2240 (class 2606 OID 137774)
-- Name: user_login_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT user_login_key UNIQUE (login);


--
-- TOC entry 2242 (class 2606 OID 137755)
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2168 (class 2606 OID 137788)
-- Name: vehicle_description_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_description
    ADD CONSTRAINT vehicle_description_pkey PRIMARY KEY (id);


--
-- TOC entry 2233 (class 1259 OID 137610)
-- Name: FKI_authority_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_authority_id" ON user_authority USING btree (authority_id);


--
-- TOC entry 2227 (class 1259 OID 137611)
-- Name: FKI_car_sold_id_insurance_policy; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_car_sold_id_insurance_policy" ON insurance_policy USING btree (car_sold_id);


--
-- TOC entry 2211 (class 1259 OID 137612)
-- Name: FKI_classification_type_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_classification_type_id" ON classification USING btree (classification_type_id);


--
-- TOC entry 2204 (class 1259 OID 137613)
-- Name: FKI_customer_id_car_sold; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_customer_id_car_sold" ON payment USING btree (customer_id);


--
-- TOC entry 2183 (class 1259 OID 137614)
-- Name: FKI_drivetrain_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_drivetrain_id" ON vehicle_model USING btree (drivetrain_id);


--
-- TOC entry 2169 (class 1259 OID 137938)
-- Name: FKI_fault_vehicle_report_category_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_fault_vehicle_report_category_id" ON vehicle_fault USING btree (vehicle_report_category_id);


--
-- TOC entry 2173 (class 1259 OID 137878)
-- Name: FKI_feature_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_feature_id" ON vehicle_feature USING btree (feature_id);


--
-- TOC entry 2205 (class 1259 OID 137615)
-- Name: FKI_finance_company_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_finance_company_id" ON payment USING btree (finance_company_id);


--
-- TOC entry 2184 (class 1259 OID 137616)
-- Name: FKI_fuel_type_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_fuel_type_id" ON vehicle_model USING btree (fuel_type_id);


--
-- TOC entry 2170 (class 1259 OID 137812)
-- Name: FKI_image_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_image_id" ON vehicle_fault USING btree (image_id);


--
-- TOC entry 2197 (class 1259 OID 137814)
-- Name: FKI_image_id_vehicle; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_image_id_vehicle" ON vehicle USING btree (image_id);


--
-- TOC entry 2179 (class 1259 OID 137813)
-- Name: FKI_image_id_vehicle_image; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_image_id_vehicle_image" ON vehicle_image USING btree (image_id);


--
-- TOC entry 2228 (class 1259 OID 137617)
-- Name: FKI_insurance_company_id_insurance_policy; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_insurance_company_id_insurance_policy" ON insurance_policy USING btree (insurance_company_id);


--
-- TOC entry 2192 (class 1259 OID 137859)
-- Name: FKI_logo_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_logo_id" ON vehicle_review USING btree (logo_id);


--
-- TOC entry 2198 (class 1259 OID 137618)
-- Name: FKI_owner_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_owner_id" ON vehicle USING btree (owner_id);


--
-- TOC entry 2206 (class 1259 OID 137619)
-- Name: FKI_payment_status_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_payment_status_id" ON payment USING btree (payment_status_id);


--
-- TOC entry 2207 (class 1259 OID 137620)
-- Name: FKI_payment_type_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_payment_type_id" ON payment USING btree (payment_type_id);


--
-- TOC entry 2185 (class 1259 OID 137621)
-- Name: FKI_transmission_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_transmission_id" ON vehicle_model USING btree (transmission_id);


--
-- TOC entry 2234 (class 1259 OID 137622)
-- Name: FKI_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_user_id" ON user_authority USING btree (user_id);


--
-- TOC entry 2251 (class 1259 OID 137923)
-- Name: FKI_user_id_subscription; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_user_id_subscription" ON subscription USING btree (user_id);


--
-- TOC entry 2186 (class 1259 OID 137623)
-- Name: FKI_vehicle_body_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_body_id" ON vehicle_model USING btree (vehicle_body_id);


--
-- TOC entry 2166 (class 1259 OID 137780)
-- Name: FKI_vehicle_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id" ON vehicle_description USING btree (vehicle_id);


--
-- TOC entry 2174 (class 1259 OID 137625)
-- Name: FKI_vehicle_id_car_feature; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id_car_feature" ON vehicle_feature USING btree (vehicle_id);


--
-- TOC entry 2180 (class 1259 OID 137626)
-- Name: FKI_vehicle_id_car_image; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id_car_image" ON vehicle_image USING btree (vehicle_id);


--
-- TOC entry 2245 (class 1259 OID 137858)
-- Name: FKI_vehicle_id_car_report; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id_car_report" ON vehicle_report_category USING btree (vehicle_id);


--
-- TOC entry 2193 (class 1259 OID 137628)
-- Name: FKI_vehicle_id_car_review; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id_car_review" ON vehicle_review USING btree (vehicle_id);


--
-- TOC entry 2208 (class 1259 OID 137629)
-- Name: FKI_vehicle_id_car_sold; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id_car_sold" ON payment USING btree (vehicle_id);


--
-- TOC entry 2187 (class 1259 OID 137630)
-- Name: FKI_vehicle_manufacturer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_manufacturer_id" ON vehicle_model USING btree (vehicle_manufacturer_id);


--
-- TOC entry 2199 (class 1259 OID 137631)
-- Name: FKI_vehicle_model_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_model_id" ON vehicle USING btree (vehicle_model_id);


--
-- TOC entry 2248 (class 1259 OID 137861)
-- Name: FKI_vehicle_report_category_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_report_category_id" ON vehicle_report_category_item USING btree (vehicle_report_category_id);


--
-- TOC entry 2194 (class 1259 OID 137860)
-- Name: FKI_video_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_video_id" ON vehicle_review USING btree (video_id);


--
-- TOC entry 2212 (class 1259 OID 137632)
-- Name: FK_modifier_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FK_modifier_user_id" ON classification USING btree (modifier_user_id);


--
-- TOC entry 2218 (class 1259 OID 137633)
-- Name: I_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "I_name" ON classification_type USING btree (name);


--
-- TOC entry 2217 (class 1259 OID 137634)
-- Name: classification_value_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX classification_value_idx ON classification USING hash (value);


--
-- TOC entry 2159 (class 1259 OID 137422)
-- Name: schema_version_s_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX schema_version_s_idx ON schema_version USING btree (success);


--
-- TOC entry 2280 (class 2606 OID 137635)
-- Name: FK_authority_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_authority
    ADD CONSTRAINT "FK_authority_id" FOREIGN KEY (authority_id) REFERENCES authority(id);


--
-- TOC entry 2278 (class 2606 OID 137640)
-- Name: FK_car_sold_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_policy
    ADD CONSTRAINT "FK_car_sold_id" FOREIGN KEY (car_sold_id) REFERENCES payment(id);


--
-- TOC entry 2277 (class 2606 OID 137645)
-- Name: FK_classification_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification
    ADD CONSTRAINT "FK_classification_type_id" FOREIGN KEY (classification_type_id) REFERENCES classification_type(id);


--
-- TOC entry 2276 (class 2606 OID 137761)
-- Name: FK_customer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "FK_customer_id" FOREIGN KEY (customer_id) REFERENCES users(id);


--
-- TOC entry 2263 (class 2606 OID 137655)
-- Name: FK_drivetrain_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "FK_drivetrain_id" FOREIGN KEY (drivetrain_id) REFERENCES classification(id);


--
-- TOC entry 2261 (class 2606 OID 137962)
-- Name: FK_feature_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_feature
    ADD CONSTRAINT "FK_feature_id" FOREIGN KEY (feature_id) REFERENCES feature(id);


--
-- TOC entry 2273 (class 2606 OID 137660)
-- Name: FK_finance_company_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "FK_finance_company_id" FOREIGN KEY (finance_company_id) REFERENCES finance_company(id);


--
-- TOC entry 2264 (class 2606 OID 137665)
-- Name: FK_fuel_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "FK_fuel_type_id" FOREIGN KEY (fuel_type_id) REFERENCES classification(id);


--
-- TOC entry 2258 (class 2606 OID 137797)
-- Name: FK_image_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_fault
    ADD CONSTRAINT "FK_image_id" FOREIGN KEY (image_id) REFERENCES image(id);


--
-- TOC entry 2262 (class 2606 OID 137802)
-- Name: FK_image_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_image
    ADD CONSTRAINT "FK_image_id" FOREIGN KEY (image_id) REFERENCES image(id);


--
-- TOC entry 2272 (class 2606 OID 137807)
-- Name: FK_image_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle
    ADD CONSTRAINT "FK_image_id" FOREIGN KEY (image_id) REFERENCES image(id);


--
-- TOC entry 2279 (class 2606 OID 137670)
-- Name: FK_insurance_company_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_policy
    ADD CONSTRAINT "FK_insurance_company_id" FOREIGN KEY (insurance_company_id) REFERENCES insurance_company(id);


--
-- TOC entry 2268 (class 2606 OID 137843)
-- Name: FK_logo_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_review
    ADD CONSTRAINT "FK_logo_id" FOREIGN KEY (logo_id) REFERENCES image(id);


--
-- TOC entry 2271 (class 2606 OID 137756)
-- Name: FK_owner_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle
    ADD CONSTRAINT "FK_owner_id" FOREIGN KEY (owner_id) REFERENCES users(id);


--
-- TOC entry 2274 (class 2606 OID 137680)
-- Name: FK_payment_status_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "FK_payment_status_id" FOREIGN KEY (payment_status_id) REFERENCES classification(id);


--
-- TOC entry 2275 (class 2606 OID 137685)
-- Name: FK_payment_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "FK_payment_type_id" FOREIGN KEY (payment_type_id) REFERENCES classification(id);


--
-- TOC entry 2259 (class 2606 OID 137939)
-- Name: FK_report_category_id_fault; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_fault
    ADD CONSTRAINT "FK_report_category_id_fault" FOREIGN KEY (vehicle_report_category_id) REFERENCES vehicle_report_category(id);


--
-- TOC entry 2265 (class 2606 OID 137690)
-- Name: FK_transmission_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "FK_transmission_id" FOREIGN KEY (transmission_id) REFERENCES classification(id);


--
-- TOC entry 2281 (class 2606 OID 137766)
-- Name: FK_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_authority
    ADD CONSTRAINT "FK_user_id" FOREIGN KEY (user_id) REFERENCES users(id);


--
-- TOC entry 2283 (class 2606 OID 137918)
-- Name: FK_user_id_subscription; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subscription
    ADD CONSTRAINT "FK_user_id_subscription" FOREIGN KEY (user_id) REFERENCES users(id);


--
-- TOC entry 2266 (class 2606 OID 137700)
-- Name: FK_vehicle_body_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "FK_vehicle_body_id" FOREIGN KEY (vehicle_body_id) REFERENCES classification(id);


--
-- TOC entry 2260 (class 2606 OID 137873)
-- Name: FK_vehicle_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_feature
    ADD CONSTRAINT "FK_vehicle_id" FOREIGN KEY (vehicle_id) REFERENCES vehicle(id);


--
-- TOC entry 2267 (class 2606 OID 137735)
-- Name: FK_vehicle_manufacturer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "FK_vehicle_manufacturer_id" FOREIGN KEY (vehicle_manufacturer_id) REFERENCES classification(id);


--
-- TOC entry 2270 (class 2606 OID 137740)
-- Name: FK_vehicle_model_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle
    ADD CONSTRAINT "FK_vehicle_model_id" FOREIGN KEY (vehicle_model_id) REFERENCES vehicle_model(id);


--
-- TOC entry 2282 (class 2606 OID 137853)
-- Name: FK_vehicle_report_category_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_report_category_item
    ADD CONSTRAINT "FK_vehicle_report_category_id" FOREIGN KEY (vehicle_report_category_id) REFERENCES vehicle_report_category(id);


--
-- TOC entry 2269 (class 2606 OID 137848)
-- Name: FK_video_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_review
    ADD CONSTRAINT "FK_video_id" FOREIGN KEY (video_id) REFERENCES image(id);


--
-- TOC entry 2404 (class 0 OID 0)
-- Dependencies: 7
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2017-02-18 15:18:47

--
-- PostgreSQL database dump complete
--

