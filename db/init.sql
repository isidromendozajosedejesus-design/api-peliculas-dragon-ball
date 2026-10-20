CREATE TABLE IF NOT EXISTS peliculas (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  titulo TEXT NOT NULL,
  titulo_original TEXT UNIQUE NOT NULL,
  anio SMALLINT NOT NULL CHECK (anio BETWEEN 1980 AND 2100),
  saga TEXT NOT NULL
);

INSERT INTO peliculas (titulo, titulo_original, anio, saga) VALUES
  ('La leyenda de Shenlong', 'Dragon Ball: Curse of the Blood Rubies', 1986, 'Dragon Ball'),
  ('La bella durmiente en el castillo del mal', 'Dragon Ball: Sleeping Princess in Devil''s Castle', 1987, 'Dragon Ball'),
  ('Aventura mística', 'Dragon Ball: Mystical Adventure', 1988, 'Dragon Ball'),
  ('Dead Zone', 'Dragon Ball Z: Dead Zone', 1989, 'Dragon Ball Z'),
  ('El más fuerte del mundo', 'Dragon Ball Z: The World''s Strongest', 1990, 'Dragon Ball Z'),
  ('La super batalla', 'Dragon Ball Z: The Tree of Might', 1990, 'Dragon Ball Z'),
  ('Goku es un supersaiyajin', 'Dragon Ball Z: Lord Slug', 1991, 'Dragon Ball Z'),
  ('Los mejores rivales', 'Dragon Ball Z: Cooler''s Revenge', 1991, 'Dragon Ball Z'),
  ('El regreso de Cooler', 'Dragon Ball Z: The Return of Cooler', 1992, 'Dragon Ball Z'),
  ('La pelea de los tres Saiyajin', 'Dragon Ball Z: Super Android 13!', 1992, 'Dragon Ball Z'),
  ('El poder invencible', 'Dragon Ball Z: Broly – The Legendary Super Saiyan', 1993, 'Dragon Ball Z'),
  ('Los guerreros de fuerza ilimitada', 'Dragon Ball Z: Bojack Unbound', 1993, 'Dragon Ball Z'),
  ('El regreso del guerrero legendario', 'Dragon Ball Z: Broly – Second Coming', 1994, 'Dragon Ball Z'),
  ('Bio-Broly', 'Dragon Ball Z: Bio-Broly', 1994, 'Dragon Ball Z'),
  ('La fusión de Goku y Vegeta', 'Dragon Ball Z: Fusion Reborn', 1995, 'Dragon Ball Z'),
  ('El ataque del dragón', 'Dragon Ball Z: Wrath of the Dragon', 1995, 'Dragon Ball Z'),
  ('La batalla de los dioses', 'Dragon Ball Z: Battle of Gods', 2013, 'Dragon Ball Z'),
  ('La resurrección de Freezer', 'Dragon Ball Z: Resurrection ''F''', 2015, 'Dragon Ball Z'),
  ('Dragon Ball Super: Broly', 'Dragon Ball Super: Broly', 2018, 'Dragon Ball Super'),
  ('Dragon Ball Super: Super Hero', 'Dragon Ball Super: Super Hero', 2022, 'Dragon Ball Super')
ON CONFLICT (titulo_original) DO NOTHING;
