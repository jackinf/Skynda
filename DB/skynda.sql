--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

-- Started on 2016-11-03 18:07:10

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
-- TOC entry 2281 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 197 (class 1259 OID 90734)
-- Name: addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE addresses (
    address_id integer NOT NULL,
    linn character varying(100) NOT NULL,
    maakond character varying(100),
    vald character varying(100),
    street character varying(100) NOT NULL,
    house_number_name character varying(100) NOT NULL,
    apartment_nr character varying(50) NOT NULL,
    postal_code character varying(50)
);


ALTER TABLE addresses OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 90732)
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
-- TOC entry 2282 (class 0 OID 0)
-- Dependencies: 196
-- Name: addresses_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE addresses_address_id_seq OWNED BY addresses.address_id;


--
-- TOC entry 213 (class 1259 OID 90935)
-- Name: car_fault; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE car_fault (
    id integer NOT NULL,
    image_url character varying(100),
    text character varying(100),
    cars_for_sale_id integer
);


ALTER TABLE car_fault OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 90933)
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
-- TOC entry 2283 (class 0 OID 0)
-- Dependencies: 212
-- Name: car_fault_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_fault_id_seq OWNED BY car_fault.id;


--
-- TOC entry 211 (class 1259 OID 90924)
-- Name: car_feature; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE car_feature (
    id integer NOT NULL,
    text character varying(100),
    cars_for_sale_id integer
);


ALTER TABLE car_feature OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 90922)
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
-- TOC entry 2284 (class 0 OID 0)
-- Dependencies: 210
-- Name: car_feature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_feature_id_seq OWNED BY car_feature.id;


--
-- TOC entry 203 (class 1259 OID 90761)
-- Name: car_for_sale; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE car_for_sale (
    id integer NOT NULL,
    model_code character varying(100) NOT NULL,
    report_id integer,
    review_id integer,
    vin_code character varying(100) NOT NULL,
    price numeric(10,2) NOT NULL,
    created timestamp without time zone NOT NULL,
    customer_id integer,
    registration_number character varying(100) NOT NULL,
    mileage numeric(18,2) NOT NULL,
    color_outside character varying(100) NOT NULL,
    color_inside character varying(100) NOT NULL,
    is_sold boolean,
    fuel_city character varying(100),
    fuel_highway character varying(100),
    problems character varying(255),
    compression_ratio integer,
    compression_type character varying(50),
    configuration character varying(50),
    cylinders character varying(50),
    displacement character varying(50),
    fuel_type character varying(50),
    size integer,
    torque integer,
    total_valves integer,
    power_train character varying(50),
    safety_stars integer
);


ALTER TABLE car_for_sale OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 90913)
-- Name: car_image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE car_image (
    id integer NOT NULL,
    image_url character varying(100),
    cars_for_sale_id integer
);


ALTER TABLE car_image OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 90911)
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
-- TOC entry 2285 (class 0 OID 0)
-- Dependencies: 208
-- Name: car_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_image_id_seq OWNED BY car_image.id;


--
-- TOC entry 189 (class 1259 OID 90710)
-- Name: car_loans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE car_loans (
    loan_id integer NOT NULL,
    car_sold_id integer,
    repayment_start_date timestamp without time zone,
    repayment_end_date timestamp without time zone,
    monthly_repayments numeric(10,2),
    finance_company_id integer
);


ALTER TABLE car_loans OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 90708)
-- Name: car_loans_loan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE car_loans_loan_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE car_loans_loan_id_seq OWNER TO postgres;

--
-- TOC entry 2286 (class 0 OID 0)
-- Dependencies: 188
-- Name: car_loans_loan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_loans_loan_id_seq OWNED BY car_loans.loan_id;


--
-- TOC entry 200 (class 1259 OID 90747)
-- Name: car_manufacturer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE car_manufacturer (
    manufacturer_code character varying(100) NOT NULL,
    title character varying(255),
    description text
);


ALTER TABLE car_manufacturer OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 90753)
-- Name: car_models; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE car_models (
    model_code character varying(100) NOT NULL,
    manufacturer_code character varying(100) NOT NULL,
    description text,
    title character varying(255),
    transmission character varying(50) NOT NULL,
    engine character varying(100) NOT NULL,
    horse_power integer,
    drive character varying(255) NOT NULL,
    doors integer NOT NULL,
    seats character varying(50) NOT NULL,
    year integer NOT NULL,
    body_type character varying(100) NOT NULL
);


ALTER TABLE car_models OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 90770)
-- Name: car_report; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE car_report (
    report_id integer NOT NULL,
    cars_for_sale_id integer,
    title character varying(50),
    is_pass boolean,
    points_text text,
    faults_text text,
    fauls_img text
);


ALTER TABLE car_report OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 90768)
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
-- TOC entry 2287 (class 0 OID 0)
-- Dependencies: 204
-- Name: car_report_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_report_report_id_seq OWNED BY car_report.report_id;


--
-- TOC entry 207 (class 1259 OID 90779)
-- Name: car_review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE car_review (
    review_id integer NOT NULL,
    cars_for_sale_id integer,
    logo_url character varying(255),
    video_url character varying(255),
    text text,
    rating integer
);


ALTER TABLE car_review OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 90777)
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
-- TOC entry 2288 (class 0 OID 0)
-- Dependencies: 206
-- Name: car_review_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_review_review_id_seq OWNED BY car_review.review_id;


--
-- TOC entry 202 (class 1259 OID 90759)
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
-- TOC entry 2289 (class 0 OID 0)
-- Dependencies: 202
-- Name: cars_for_sale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE cars_for_sale_id_seq OWNED BY car_for_sale.id;


--
-- TOC entry 193 (class 1259 OID 90722)
-- Name: cars_sold; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE cars_sold (
    car_sold_id integer NOT NULL,
    cars_for_sale_id integer,
    agreed_price numeric(10,2),
    customer_id integer,
    date_sold timestamp without time zone,
    monthly_payment_amount numeric(10,2),
    monthly_payment_date timestamp without time zone
);


ALTER TABLE cars_sold OWNER TO postgres;

--
-- TOC entry 192 (class 1259 OID 90720)
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
-- TOC entry 2290 (class 0 OID 0)
-- Dependencies: 192
-- Name: cars_sold_car_sold_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE cars_sold_car_sold_id_seq OWNED BY cars_sold.car_sold_id;


--
-- TOC entry 199 (class 1259 OID 90743)
-- Name: customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE customer (
    customer_id integer NOT NULL,
    phone character varying(50),
    firstname character varying(100) NOT NULL,
    lastname character varying(100) NOT NULL,
    email character varying(100),
    address_id integer
);


ALTER TABLE customer OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 90741)
-- Name: customer_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE customer_customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE customer_customer_id_seq OWNER TO postgres;

--
-- TOC entry 2291 (class 0 OID 0)
-- Dependencies: 198
-- Name: customer_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE customer_customer_id_seq OWNED BY customer.customer_id;


--
-- TOC entry 195 (class 1259 OID 90728)
-- Name: customer_payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE customer_payments (
    customer_payment_id integer NOT NULL,
    customer_id integer,
    payment_status_code integer,
    car_sold_id integer,
    customer_payment_date_due timestamp without time zone,
    customer_payment_date_made timestamp without time zone,
    actual_payment_amount numeric(10,2) NOT NULL
);


ALTER TABLE customer_payments OWNER TO postgres;

--
-- TOC entry 194 (class 1259 OID 90726)
-- Name: customer_payments_customer_payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE customer_payments_customer_payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE customer_payments_customer_payment_id_seq OWNER TO postgres;

--
-- TOC entry 2292 (class 0 OID 0)
-- Dependencies: 194
-- Name: customer_payments_customer_payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE customer_payments_customer_payment_id_seq OWNED BY customer_payments.customer_payment_id;


--
-- TOC entry 185 (class 1259 OID 90698)
-- Name: finance_companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE finance_companies (
    finance_company_id integer NOT NULL,
    finance_company_name character varying(100)
);


ALTER TABLE finance_companies OWNER TO postgres;

--
-- TOC entry 184 (class 1259 OID 90696)
-- Name: finance_companies_finance_company_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE finance_companies_finance_company_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE finance_companies_finance_company_id_seq OWNER TO postgres;

--
-- TOC entry 2293 (class 0 OID 0)
-- Dependencies: 184
-- Name: finance_companies_finance_company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE finance_companies_finance_company_id_seq OWNED BY finance_companies.finance_company_id;


--
-- TOC entry 183 (class 1259 OID 90692)
-- Name: insurance_companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE insurance_companies (
    insurance_company_id integer NOT NULL,
    insurance_company_name character varying(100)
);


ALTER TABLE insurance_companies OWNER TO postgres;

--
-- TOC entry 182 (class 1259 OID 90690)
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
-- TOC entry 2294 (class 0 OID 0)
-- Dependencies: 182
-- Name: insurance_companies_insurance_company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE insurance_companies_insurance_company_id_seq OWNED BY insurance_companies.insurance_company_id;


--
-- TOC entry 187 (class 1259 OID 90704)
-- Name: insurance_policies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE insurance_policies (
    policy_id integer NOT NULL,
    car_sold_id integer,
    policy_start_date timestamp without time zone,
    policy_renewal_date timestamp without time zone,
    monthly_payments numeric(10,2),
    insurance_company_id integer
);


ALTER TABLE insurance_policies OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 90702)
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
-- TOC entry 2295 (class 0 OID 0)
-- Dependencies: 186
-- Name: insurance_policies_policy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE insurance_policies_policy_id_seq OWNED BY insurance_policies.policy_id;


--
-- TOC entry 191 (class 1259 OID 90716)
-- Name: payment_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE payment_status (
    payment_status_code integer NOT NULL,
    payment_status_description character varying(500)
);


ALTER TABLE payment_status OWNER TO postgres;

--
-- TOC entry 190 (class 1259 OID 90714)
-- Name: payment_status_payment_status_code_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE payment_status_payment_status_code_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payment_status_payment_status_code_seq OWNER TO postgres;

--
-- TOC entry 2296 (class 0 OID 0)
-- Dependencies: 190
-- Name: payment_status_payment_status_code_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE payment_status_payment_status_code_seq OWNED BY payment_status.payment_status_code;


--
-- TOC entry 181 (class 1259 OID 90680)
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
-- TOC entry 2092 (class 2604 OID 90737)
-- Name: address_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY addresses ALTER COLUMN address_id SET DEFAULT nextval('addresses_address_id_seq'::regclass);


--
-- TOC entry 2099 (class 2604 OID 90938)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_fault ALTER COLUMN id SET DEFAULT nextval('car_fault_id_seq'::regclass);


--
-- TOC entry 2098 (class 2604 OID 90927)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_feature ALTER COLUMN id SET DEFAULT nextval('car_feature_id_seq'::regclass);


--
-- TOC entry 2094 (class 2604 OID 90764)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_for_sale ALTER COLUMN id SET DEFAULT nextval('cars_for_sale_id_seq'::regclass);


--
-- TOC entry 2097 (class 2604 OID 90916)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_image ALTER COLUMN id SET DEFAULT nextval('car_image_id_seq'::regclass);


--
-- TOC entry 2088 (class 2604 OID 90713)
-- Name: loan_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_loans ALTER COLUMN loan_id SET DEFAULT nextval('car_loans_loan_id_seq'::regclass);


--
-- TOC entry 2095 (class 2604 OID 90773)
-- Name: report_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_report ALTER COLUMN report_id SET DEFAULT nextval('car_report_report_id_seq'::regclass);


--
-- TOC entry 2096 (class 2604 OID 90782)
-- Name: review_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_review ALTER COLUMN review_id SET DEFAULT nextval('car_review_review_id_seq'::regclass);


--
-- TOC entry 2090 (class 2604 OID 90725)
-- Name: car_sold_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY cars_sold ALTER COLUMN car_sold_id SET DEFAULT nextval('cars_sold_car_sold_id_seq'::regclass);


--
-- TOC entry 2093 (class 2604 OID 90746)
-- Name: customer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY customer ALTER COLUMN customer_id SET DEFAULT nextval('customer_customer_id_seq'::regclass);


--
-- TOC entry 2091 (class 2604 OID 90731)
-- Name: customer_payment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY customer_payments ALTER COLUMN customer_payment_id SET DEFAULT nextval('customer_payments_customer_payment_id_seq'::regclass);


--
-- TOC entry 2086 (class 2604 OID 90701)
-- Name: finance_company_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY finance_companies ALTER COLUMN finance_company_id SET DEFAULT nextval('finance_companies_finance_company_id_seq'::regclass);


--
-- TOC entry 2085 (class 2604 OID 90695)
-- Name: insurance_company_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_companies ALTER COLUMN insurance_company_id SET DEFAULT nextval('insurance_companies_insurance_company_id_seq'::regclass);


--
-- TOC entry 2087 (class 2604 OID 90707)
-- Name: policy_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_policies ALTER COLUMN policy_id SET DEFAULT nextval('insurance_policies_policy_id_seq'::regclass);


--
-- TOC entry 2089 (class 2604 OID 90719)
-- Name: payment_status_code; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment_status ALTER COLUMN payment_status_code SET DEFAULT nextval('payment_status_payment_status_code_seq'::regclass);


--
-- TOC entry 2139 (class 2606 OID 90822)
-- Name: PK_Car; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_for_sale
    ADD CONSTRAINT "PK_Car" PRIMARY KEY (id);


--
-- TOC entry 2127 (class 2606 OID 90810)
-- Name: PK_addresses; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY addresses
    ADD CONSTRAINT "PK_addresses" PRIMARY KEY (address_id);


--
-- TOC entry 2114 (class 2606 OID 90797)
-- Name: PK_car_loans; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_loans
    ADD CONSTRAINT "PK_car_loans" PRIMARY KEY (loan_id);


--
-- TOC entry 2132 (class 2606 OID 90815)
-- Name: PK_car_manufacturer; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_manufacturer
    ADD CONSTRAINT "PK_car_manufacturer" PRIMARY KEY (manufacturer_code);


--
-- TOC entry 2135 (class 2606 OID 90818)
-- Name: PK_car_models; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_models
    ADD CONSTRAINT "PK_car_models" PRIMARY KEY (model_code);


--
-- TOC entry 2120 (class 2606 OID 90803)
-- Name: PK_cars_sold; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY cars_sold
    ADD CONSTRAINT "PK_cars_sold" PRIMARY KEY (car_sold_id);


--
-- TOC entry 2130 (class 2606 OID 90813)
-- Name: PK_customer; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY customer
    ADD CONSTRAINT "PK_customer" PRIMARY KEY (customer_id);


--
-- TOC entry 2125 (class 2606 OID 90808)
-- Name: PK_customer_payments; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY customer_payments
    ADD CONSTRAINT "PK_customer_payments" PRIMARY KEY (customer_payment_id);


--
-- TOC entry 2106 (class 2606 OID 90789)
-- Name: PK_finance_companies; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY finance_companies
    ADD CONSTRAINT "PK_finance_companies" PRIMARY KEY (finance_company_id);


--
-- TOC entry 2104 (class 2606 OID 90787)
-- Name: PK_insurance_companies; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_companies
    ADD CONSTRAINT "PK_insurance_companies" PRIMARY KEY (insurance_company_id);


--
-- TOC entry 2110 (class 2606 OID 90793)
-- Name: PK_insurance_policies; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_policies
    ADD CONSTRAINT "PK_insurance_policies" PRIMARY KEY (policy_id);


--
-- TOC entry 2116 (class 2606 OID 90799)
-- Name: PK_payment_status; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment_status
    ADD CONSTRAINT "PK_payment_status" PRIMARY KEY (payment_status_code);


--
-- TOC entry 2141 (class 2606 OID 90945)
-- Name: car_image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_image
    ADD CONSTRAINT car_image_pkey PRIMARY KEY (id);


--
-- TOC entry 2101 (class 2606 OID 90688)
-- Name: schema_version_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY schema_version
    ADD CONSTRAINT schema_version_pk PRIMARY KEY (installed_rank);


--
-- TOC entry 2111 (class 1259 OID 90794)
-- Name: IXFK_car_loans_cars_sold; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IXFK_car_loans_cars_sold" ON car_loans USING btree (car_sold_id);


--
-- TOC entry 2112 (class 1259 OID 90795)
-- Name: IXFK_car_loans_finance_companies; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IXFK_car_loans_finance_companies" ON car_loans USING btree (finance_company_id);


--
-- TOC entry 2133 (class 1259 OID 90816)
-- Name: IXFK_car_models_car_manufacturer; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IXFK_car_models_car_manufacturer" ON car_models USING btree (manufacturer_code);


--
-- TOC entry 2136 (class 1259 OID 90819)
-- Name: IXFK_cars_for_sale_car_models; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IXFK_cars_for_sale_car_models" ON car_for_sale USING btree (model_code);


--
-- TOC entry 2137 (class 1259 OID 90820)
-- Name: IXFK_cars_for_sale_customer; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IXFK_cars_for_sale_customer" ON car_for_sale USING btree (customer_id);


--
-- TOC entry 2117 (class 1259 OID 90800)
-- Name: IXFK_cars_sold_cars_for_sale; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IXFK_cars_sold_cars_for_sale" ON cars_sold USING btree (cars_for_sale_id);


--
-- TOC entry 2118 (class 1259 OID 90801)
-- Name: IXFK_cars_sold_customer; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IXFK_cars_sold_customer" ON cars_sold USING btree (customer_id);


--
-- TOC entry 2128 (class 1259 OID 90811)
-- Name: IXFK_customer_addresses; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IXFK_customer_addresses" ON customer USING btree (address_id);


--
-- TOC entry 2121 (class 1259 OID 90804)
-- Name: IXFK_customer_payments_cars_sold; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IXFK_customer_payments_cars_sold" ON customer_payments USING btree (car_sold_id);


--
-- TOC entry 2122 (class 1259 OID 90805)
-- Name: IXFK_customer_payments_customer; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IXFK_customer_payments_customer" ON customer_payments USING btree (customer_id);


--
-- TOC entry 2123 (class 1259 OID 90806)
-- Name: IXFK_customer_payments_payment_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IXFK_customer_payments_payment_status" ON customer_payments USING btree (payment_status_code);


--
-- TOC entry 2107 (class 1259 OID 90790)
-- Name: IXFK_insurance_policies_cars_sold; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IXFK_insurance_policies_cars_sold" ON insurance_policies USING btree (car_sold_id);


--
-- TOC entry 2108 (class 1259 OID 90791)
-- Name: IXFK_insurance_policies_insurance_companies; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IXFK_insurance_policies_insurance_companies" ON insurance_policies USING btree (insurance_company_id);


--
-- TOC entry 2102 (class 1259 OID 90689)
-- Name: schema_version_s_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX schema_version_s_idx ON schema_version USING btree (success);


--
-- TOC entry 2144 (class 2606 OID 90833)
-- Name: FK_car_loans_cars_sold; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_loans
    ADD CONSTRAINT "FK_car_loans_cars_sold" FOREIGN KEY (car_sold_id) REFERENCES cars_sold(car_sold_id);


--
-- TOC entry 2145 (class 2606 OID 90838)
-- Name: FK_car_loans_finance_companies; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_loans
    ADD CONSTRAINT "FK_car_loans_finance_companies" FOREIGN KEY (finance_company_id) REFERENCES finance_companies(finance_company_id);


--
-- TOC entry 2152 (class 2606 OID 90873)
-- Name: FK_car_models_car_manufacturer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_models
    ADD CONSTRAINT "FK_car_models_car_manufacturer" FOREIGN KEY (manufacturer_code) REFERENCES car_manufacturer(manufacturer_code);


--
-- TOC entry 2155 (class 2606 OID 90888)
-- Name: FK_car_report_cars_for_sale; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_report
    ADD CONSTRAINT "FK_car_report_cars_for_sale" FOREIGN KEY (cars_for_sale_id) REFERENCES car_for_sale(id);


--
-- TOC entry 2156 (class 2606 OID 90893)
-- Name: FK_car_review_cars_for_sale; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_review
    ADD CONSTRAINT "FK_car_review_cars_for_sale" FOREIGN KEY (cars_for_sale_id) REFERENCES car_for_sale(id);


--
-- TOC entry 2153 (class 2606 OID 90878)
-- Name: FK_cars_for_sale_car_models; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_for_sale
    ADD CONSTRAINT "FK_cars_for_sale_car_models" FOREIGN KEY (model_code) REFERENCES car_models(model_code);


--
-- TOC entry 2154 (class 2606 OID 90883)
-- Name: FK_cars_for_sale_customer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_for_sale
    ADD CONSTRAINT "FK_cars_for_sale_customer" FOREIGN KEY (customer_id) REFERENCES customer(customer_id);


--
-- TOC entry 2146 (class 2606 OID 90843)
-- Name: FK_cars_sold_cars_for_sale; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY cars_sold
    ADD CONSTRAINT "FK_cars_sold_cars_for_sale" FOREIGN KEY (cars_for_sale_id) REFERENCES car_for_sale(id);


--
-- TOC entry 2147 (class 2606 OID 90848)
-- Name: FK_cars_sold_customer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY cars_sold
    ADD CONSTRAINT "FK_cars_sold_customer" FOREIGN KEY (customer_id) REFERENCES customer(customer_id);


--
-- TOC entry 2151 (class 2606 OID 90868)
-- Name: FK_customer_addresses; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY customer
    ADD CONSTRAINT "FK_customer_addresses" FOREIGN KEY (address_id) REFERENCES addresses(address_id);


--
-- TOC entry 2148 (class 2606 OID 90853)
-- Name: FK_customer_payments_cars_sold; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY customer_payments
    ADD CONSTRAINT "FK_customer_payments_cars_sold" FOREIGN KEY (car_sold_id) REFERENCES cars_sold(car_sold_id);


--
-- TOC entry 2149 (class 2606 OID 90858)
-- Name: FK_customer_payments_customer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY customer_payments
    ADD CONSTRAINT "FK_customer_payments_customer" FOREIGN KEY (customer_id) REFERENCES customer(customer_id);


--
-- TOC entry 2150 (class 2606 OID 90863)
-- Name: FK_customer_payments_payment_status; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY customer_payments
    ADD CONSTRAINT "FK_customer_payments_payment_status" FOREIGN KEY (payment_status_code) REFERENCES payment_status(payment_status_code);


--
-- TOC entry 2142 (class 2606 OID 90823)
-- Name: FK_insurance_policies_cars_sold; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_policies
    ADD CONSTRAINT "FK_insurance_policies_cars_sold" FOREIGN KEY (car_sold_id) REFERENCES cars_sold(car_sold_id);


--
-- TOC entry 2143 (class 2606 OID 90828)
-- Name: FK_insurance_policies_insurance_companies; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_policies
    ADD CONSTRAINT "FK_insurance_policies_insurance_companies" FOREIGN KEY (insurance_company_id) REFERENCES insurance_companies(insurance_company_id);


--
-- TOC entry 2159 (class 2606 OID 90939)
-- Name: car_fault_cars_for_sale_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_fault
    ADD CONSTRAINT car_fault_cars_for_sale_id_fkey FOREIGN KEY (cars_for_sale_id) REFERENCES car_for_sale(id);


--
-- TOC entry 2158 (class 2606 OID 90928)
-- Name: car_feature_cars_for_sale_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_feature
    ADD CONSTRAINT car_feature_cars_for_sale_id_fkey FOREIGN KEY (cars_for_sale_id) REFERENCES car_for_sale(id);


--
-- TOC entry 2157 (class 2606 OID 90917)
-- Name: car_image_cars_for_sale_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_image
    ADD CONSTRAINT car_image_cars_for_sale_id_fkey FOREIGN KEY (cars_for_sale_id) REFERENCES car_for_sale(id);


--
-- TOC entry 2280 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2016-11-03 18:07:10

--
-- PostgreSQL database dump complete
--

