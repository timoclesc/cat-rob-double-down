-- Migration for Supabase
-- Enable Row Level Security (RLS) on all tables

CREATE TABLE public.users_sessions (
	_order integer NOT NULL,
	_parent_id integer NOT NULL,
	id varchar PRIMARY KEY NOT NULL,
	created_at timestamp(3) with time zone,
	expires_at timestamp(3) with time zone NOT NULL
);

CREATE TABLE public.users (
	id serial PRIMARY KEY NOT NULL,
	name varchar,
	updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
	created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
	email varchar NOT NULL,
	reset_password_token varchar,
	reset_password_expiration timestamp(3) with time zone,
	salt varchar,
	hash varchar,
	login_attempts numeric DEFAULT 0,
	lock_until timestamp(3) with time zone
);

CREATE TABLE public.hero (
	id serial PRIMARY KEY NOT NULL,
	title varchar NOT NULL,
	subtitle varchar NOT NULL,
	cta_text varchar NOT NULL,
	background_image_id integer,
	updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
	created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.story (
	id serial PRIMARY KEY NOT NULL,
	section_title varchar NOT NULL,
	section_subtitle varchar,
	story_title varchar NOT NULL,
	story_content jsonb NOT NULL,
	twist_title varchar NOT NULL,
	twist_content jsonb NOT NULL,
	event_name varchar NOT NULL,
	event_date varchar NOT NULL,
	event_distance varchar NOT NULL,
	event_location varchar NOT NULL,
	updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
	created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.updates (
	id serial PRIMARY KEY NOT NULL,
	title varchar NOT NULL,
	content varchar NOT NULL,
	date timestamp(3) with time zone NOT NULL,
	updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
	created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.media (
	id serial PRIMARY KEY NOT NULL,
	alt varchar,
	updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
	created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
	url varchar,
	thumbnail_u_r_l varchar,
	filename varchar,
	mime_type varchar,
	filesize numeric,
	width numeric,
	height numeric,
	focal_x numeric,
	focal_y numeric,
	sizes_thumbnail_url varchar,
	sizes_thumbnail_width numeric,
	sizes_thumbnail_height numeric,
	sizes_thumbnail_mime_type varchar,
	sizes_thumbnail_filesize numeric,
	sizes_thumbnail_filename varchar,
	sizes_card_url varchar,
	sizes_card_width numeric,
	sizes_card_height numeric,
	sizes_card_mime_type varchar,
	sizes_card_filesize numeric,
	sizes_card_filename varchar,
	sizes_tablet_url varchar,
	sizes_tablet_width numeric,
	sizes_tablet_height numeric,
	sizes_tablet_mime_type varchar,
	sizes_tablet_filesize numeric,
	sizes_tablet_filename varchar
);

CREATE TABLE public.payload_locked_documents (
	id serial PRIMARY KEY NOT NULL,
	global_slug varchar,
	updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
	created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.payload_locked_documents_rels (
	id serial PRIMARY KEY NOT NULL,
	order integer,
	parent_id integer NOT NULL,
	path varchar NOT NULL,
	users_id integer,
	hero_id integer,
	story_id integer,
	updates_id integer,
	media_id integer
);

CREATE TABLE public.payload_preferences (
	id serial PRIMARY KEY NOT NULL,
	key varchar,
	value jsonb,
	updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
	created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.payload_preferences_rels (
	id serial PRIMARY KEY NOT NULL,
	order integer,
	parent_id integer NOT NULL,
	path varchar NOT NULL,
	users_id integer
);

CREATE TABLE public.payload_migrations (
	id serial PRIMARY KEY NOT NULL,
	name varchar,
	batch numeric,
	updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
	created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

-- Foreign keys
ALTER TABLE public.users_sessions ADD CONSTRAINT users_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE public.hero ADD CONSTRAINT hero_background_image_id_media_id_fk FOREIGN KEY (background_image_id) REFERENCES public.media(id) ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE public.payload_locked_documents_rels ADD CONSTRAINT payload_locked_documents_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE public.payload_locked_documents_rels ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE public.payload_locked_documents_rels ADD CONSTRAINT payload_locked_documents_rels_hero_fk FOREIGN KEY (hero_id) REFERENCES public.hero(id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE public.payload_locked_documents_rels ADD CONSTRAINT payload_locked_documents_rels_story_fk FOREIGN KEY (story_id) REFERENCES public.story(id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE public.payload_locked_documents_rels ADD CONSTRAINT payload_locked_documents_rels_updates_fk FOREIGN KEY (updates_id) REFERENCES public.updates(id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE public.payload_locked_documents_rels ADD CONSTRAINT payload_locked_documents_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE public.payload_preferences_rels ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE public.payload_preferences_rels ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE NO ACTION;

-- Indexes
CREATE INDEX users_sessions_order_idx ON public.users_sessions USING btree (_order);
CREATE INDEX users_sessions_parent_id_idx ON public.users_sessions USING btree (_parent_id);
CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);
CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);
CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);
CREATE INDEX hero_background_image_idx ON public.hero USING btree (background_image_id);
CREATE INDEX hero_updated_at_idx ON public.hero USING btree (updated_at);
CREATE INDEX hero_created_at_idx ON public.hero USING btree (created_at);
CREATE INDEX story_updated_at_idx ON public.story USING btree (updated_at);
CREATE INDEX story_created_at_idx ON public.story USING btree (created_at);
CREATE INDEX updates_updated_at_idx ON public.updates USING btree (updated_at);
CREATE INDEX updates_created_at_idx ON public.updates USING btree (created_at);
CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);
CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);
CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);
CREATE INDEX media_sizes_thumbnail_sizes_thumbnail_filename_idx ON public.media USING btree (sizes_thumbnail_filename);
CREATE INDEX media_sizes_card_sizes_card_filename_idx ON public.media USING btree (sizes_card_filename);
CREATE INDEX media_sizes_tablet_sizes_tablet_filename_idx ON public.media USING btree (sizes_tablet_filename);
CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);
CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);
CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);
CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree (order);
CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);
CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);
CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);
CREATE INDEX payload_locked_documents_rels_hero_id_idx ON public.payload_locked_documents_rels USING btree (hero_id);
CREATE INDEX payload_locked_documents_rels_story_id_idx ON public.payload_locked_documents_rels USING btree (story_id);
CREATE INDEX payload_locked_documents_rels_updates_id_idx ON public.payload_locked_documents_rels USING btree (updates_id);
CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);
CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);
CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);
CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);
CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree (order);
CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);
CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);
CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);
CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);
CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payload_locked_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payload_locked_documents_rels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payload_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payload_preferences_rels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payload_migrations ENABLE ROW LEVEL SECURITY;

-- You must define RLS policies for each table as needed.
-- Example policy for users table:
-- CREATE POLICY "Allow all" ON public.users FOR SELECT USING (true);