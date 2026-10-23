-- شغّله في Supabase > SQL Editor

create table categories (
  slug text primary key,
  name text not null,
  seats int not null default 5,
  bags int not null default 2,
  image text not null default '',
  sort_order int not null default 0
);

create table cars (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null references categories(slug) on update cascade on delete restrict,
  seats int not null default 5,
  transmission text not null default 'أوتوماتيك',
  price_per_day int not null,
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

-- بيانات البداية (بنفس مسارات الصور الحالية)
insert into categories (slug, name, seats, bags, image, sort_order) values
  ('family',  'سيارات عائلية',        7, 4, '/images/categories/family.jpg',  1),
  ('economy', 'سيارات اقتصادية',      5, 2, '/images/categories/economy.jpg', 2),
  ('luxury',  'سيارات فاخرة',         5, 3, '/images/categories/luxury.jpg',  3),
  ('offroad', 'سيارات الدفع الرباعي', 7, 5, '/images/categories/offroad.jpg', 4);

insert into cars (name, category, seats, transmission, price_per_day, image) values
  ('كيا كارنز', 'family', 7, 'أوتوماتيك', 1500, '/images/cars/kia-carens.jpg'),
  ('تويوتا إنوفا', 'family', 7, 'أوتوماتيك', 1800, '/images/cars/toyota-innova.jpg'),
  ('هيونداي أكسنت', 'economy', 5, 'أوتوماتيك', 900, '/images/cars/hyundai-accent.jpg'),
  ('تويوتا كورولا', 'economy', 5, 'أوتوماتيك', 1100, '/images/cars/toyota-corolla.jpg'),
  ('مرسيدس E-Class', 'luxury', 5, 'أوتوماتيك', 3500, '/images/cars/mercedes-e.jpg'),
  ('بي إم دبليو الفئة الخامسة', 'luxury', 5, 'أوتوماتيك', 3200, '/images/cars/bmw-5.jpg'),
  ('تويوتا لاند كروزر', 'offroad', 7, 'أوتوماتيك', 4200, '/images/cars/land-cruiser.jpg'),
  ('تويوتا فورتشنر', 'offroad', 7, 'أوتوماتيك', 2800, '/images/cars/toyota-fortuner.jpg');
