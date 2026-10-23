-- شغّله في Supabase > SQL Editor

create table categories (
  slug text primary key,
  name text not null,
  name_en text,
  seats int not null default 5,
  bags int not null default 2,
  image text not null default '',
  sort_order int not null default 0
);

create table cars (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_en text,
  category text not null references categories(slug) on update cascade on delete restrict,
  seats int not null default 5,
  transmission text not null default 'أوتوماتيك',
  image text not null default '',
  year int,
  fuel text,
  features text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table categories enable row level security;
alter table cars enable row level security;

create policy "public read categories" on categories for select using (true);
create policy "public read cars" on cars for select using (true);
create policy "admin write categories" on categories for all to authenticated using (true) with check (true);
create policy "admin write cars" on cars for all to authenticated using (true) with check (true);

-- Storage للصور
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict do nothing;
create policy "public read media" on storage.objects for select using (bucket_id = 'media');
create policy "admin insert media" on storage.objects for insert to authenticated with check (bucket_id = 'media');
create policy "admin update media" on storage.objects for update to authenticated using (bucket_id = 'media');
create policy "admin delete media" on storage.objects for delete to authenticated using (bucket_id = 'media');

-- بيانات البداية
insert into categories (slug, name, name_en, seats, bags, image, sort_order) values
  ('family',  'سيارات عائلية',        'Family cars',  7, 4, '/images/categories/family.jpg',  1),
  ('economy', 'سيارات اقتصادية',      'Economy cars', 5, 2, '/images/categories/economy.jpg', 2),
  ('luxury',  'سيارات فاخرة',         'Luxury cars',  5, 3, '/images/categories/luxury.jpg',  3),
  ('offroad', 'سيارات الدفع الرباعي', '4x4 cars',     7, 5, '/images/categories/offroad.jpg', 4);

insert into cars (name, name_en, category, seats, transmission, year, image) values
  ('كيا كارنز', 'Kia Carens', 'family', 7, 'أوتوماتيك', 2023, '/images/cars/kia-carens.jpg'),
  ('تويوتا إنوفا', 'Toyota Innova', 'family', 7, 'أوتوماتيك', 2024, '/images/cars/toyota-innova.jpg'),
  ('هيونداي أكسنت', 'Hyundai Accent', 'economy', 5, 'أوتوماتيك', 2022, '/images/cars/hyundai-accent.jpg'),
  ('تويوتا كورولا', 'Toyota Corolla', 'economy', 5, 'أوتوماتيك', 2024, '/images/cars/toyota-corolla.jpg'),
  ('مرسيدس E-Class', 'Mercedes E-Class', 'luxury', 5, 'أوتوماتيك', 2024, '/images/cars/mercedes-e.jpg'),
  ('بي إم دبليو الفئة الخامسة', 'BMW 5 Series', 'luxury', 5, 'أوتوماتيك', 2023, '/images/cars/bmw-5.jpg'),
  ('تويوتا لاند كروزر', 'Toyota Land Cruiser', 'offroad', 7, 'أوتوماتيك', 2024, '/images/cars/land-cruiser.jpg'),
  ('تويوتا فورتشنر', 'Toyota Fortuner', 'offroad', 7, 'أوتوماتيك', 2023, '/images/cars/toyota-fortuner.jpg');